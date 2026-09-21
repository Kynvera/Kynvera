import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useTypewriter } from './hooks/useTypewriter'
import { useVideoScrub } from './hooks/useVideoScrub'
import { useHeroCursor } from './hooks/useHeroCursor'
import ContactForm from './components/ContactForm'
import NewsletterSignup from './components/NewsletterSignup'
import ServicesSection from './components/ServicesSection'
import Search from './components/Search'
import CaseStudiesSection from './components/CaseStudiesSection'
import BlogSection, { articles } from './components/BlogSection'
import ProcessSection, { process } from './components/ProcessSection'
import { loadAnalytics, trackEvent } from './lib/analytics'

/* ============================================================
   DATA
   ============================================================ */

type Project = {
  index: string
  name: string
  category: string
  description: string
  technologies: string[]
  problem: string
  solution: string
  status: string
  source?: string
  demo?: string
  featured?: boolean
  visual: string
}

type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

type TeamMember = {
  name: string
  slug: string
  initials: string
  photo: string
  role: string
  focus: string
  summary: string
  skills: string[]
  link?: { label: string; href: string }
}

const projects: Project[] = [
  {
    index: '001',
    name: 'CheapFlix Nepal',
    category: 'WEB / BACKEND',
    description: 'A service-booking platform built with a modern backend architecture.',
    technologies: ['Node.js', 'Express', 'MySQL', 'Prisma'],
    problem: 'Service booking needs a clear, dependable path from discovery to request.',
    solution: 'A structured web platform that keeps service information, requests, and backend logic in one place.',
    status: 'BUILDING',
    featured: true,
    demo: 'https://cheapflixnepal.live/',
    visual: 'cheapflix',
  },
  {
    index: '002',
    name: 'Nepal Administrative Intelligence System',
    category: 'PYTHON / DATA / API',
    description: "A structured system for exploring Nepal's administrative hierarchy through APIs and data pipelines.",
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy'],
    problem: 'Administrative data becomes difficult to explore when structure and access are disconnected.',
    solution: 'A data-oriented API surface designed to make a complex hierarchy easier to work with.',
    status: 'EXPERIMENTAL',
    featured: true,
    demo: 'https://nepalinfo.netlify.app/',
    visual: 'nepal-info',
  },
  {
    index: '003',
    name: 'Creative / Poetry Platform',
    category: 'CREATIVE / WEB',
    description: 'A digital platform for presenting and publishing original poetry and creative work.',
    technologies: ['Web', 'Publishing', 'Design'],
    problem: 'Creative work deserves a digital home that gives the words room to breathe.',
    solution: 'A calm publishing experience centered on reading, presentation, and the personality of the work.',
    status: 'IN DEVELOPMENT',
    featured: true,
    demo: 'https://diyasubedi.com.np/',
    visual: 'poetry',
  },
  {
    index: '004', name: 'How Aeroplane Works', category: 'WEB / EDUCATION', description: 'An interactive explainer that turns a complex machine into an approachable learning experience.', technologies: ['Interactive UI', 'Education', 'Animation'], problem: 'Technical ideas are easier to understand when people can explore them at their own pace.', solution: 'An approachable visual experience that breaks the fundamentals of flight into clear moments.', status: 'LIVE', demo: 'https://aeroplane-blond.vercel.app/', visual: 'aeroplane',
  },
  {
    index: '005', name: 'Private Couple Gallery', category: 'PRIVATE / FULL STACK', description: 'A privacy-first shared personal archive for two authorized users and their memories.', technologies: ['React', 'FastAPI', 'PostgreSQL', 'Private storage'], problem: 'Personal memories need the care of a private product, not public links or frontend-only protection.', solution: 'An authenticated archive with server-side authorization, private media delivery, albums, stories, search, and recovery controls.', status: 'PRIVATE', source: 'https://github.com/arpan085/PRIVATE-GALLERY', visual: 'gallery',
  },
  {
    index: '006', name: 'Kynvera', category: 'WEB / STUDIO', description: 'The evolving home for Kynvera’s projects, practice, and public experiments.', technologies: ['React', 'TypeScript', 'Vite', 'Design system'], problem: 'A studio needs a living index for work in progress as much as finished work.', solution: 'A project-led digital studio site designed to evolve alongside the work itself.', status: 'LIVE', demo: 'https://kynvera.vercel.app/', visual: 'kynvera',
  },
  {
    index: '007', name: 'Ironman Gesture Vision Suite', category: 'PYTHON / COMPUTER VISION', description: 'A modular gesture-controlled computer-vision suite built for demos, reels, and playful utility.', technologies: ['Python', 'OpenCV', 'MediaPipe', 'Tkinter'], problem: 'Hand-tracking demos often stop at one feature instead of becoming a flexible, testable system.', solution: 'Twenty gesture-controlled modes—drawing, games, controls, filters, effects, recording, and HUD utilities—inside one modular application.', status: 'IN DEVELOPMENT', source: 'https://github.com/arpan085/ironman', visual: 'ironman',
  },
  {
    index: '008', name: 'NEPSE AI Analyzer', category: 'AI / FINANCE', description: 'A quantitative, machine-learning, and multi-AI research platform for Nepal Stock Exchange intelligence.', technologies: ['Python', 'Machine learning', 'Quantitative analysis', 'AI'], problem: 'Market research needs a more structured way to combine data, analysis, and practical decision support.', solution: 'An evolving intelligence platform designed specifically around NEPSE research workflows.', status: 'IN DEVELOPMENT', source: 'https://github.com/arpan085/NEPSE', visual: 'nepse',
  },
]

const capabilities = [
  { number: '01', title: 'Websites', text: 'Fast, expressive websites with a clear point of view and a useful job to do.', tags: ['React', 'UI / UX', 'SEO', 'Performance'] },
  { number: '02', title: 'Applications', text: 'Product interfaces and web applications built around the flow people actually need.', tags: ['Product', 'Frontend', 'Systems', 'Interaction'] },
  { number: '03', title: 'Software', text: 'Dependable software for real operational problems, from the API to the database.', tags: ['Python', 'Node.js', 'APIs', 'Databases'] },
  { number: '04', title: 'Creative Technology', text: 'Digital experiences where code, storytelling, visual design, and curiosity meet.', tags: ['Writing', 'Visuals', 'Publishing', 'Experiments'] },
  { number: '05', title: 'Open Source', text: 'Useful tools, learnings, and experiments shared openly with the wider community.', tags: ['Public', 'Useful', 'Learning', 'Release'] },
]

const teamMembers: TeamMember[] = [
  { name: 'Arpan Baral', slug: 'arpan', initials: 'AB', photo: '/assets/team/arpan.png', role: 'Backend Developer · Project Manager', focus: 'The foundation', summary: 'Arpan shapes the systems behind the experience—from APIs and databases to delivery plans that keep a project moving.', skills: ['Backend systems', 'APIs', 'Databases', 'SEO', 'Project management'], link: { label: 'arpan-baral.com.np', href: 'https://arpan-baral.com.np' } },
  { name: 'Diya Subedi', slug: 'diya', initials: 'DS', photo: '/assets/team/diya.png', role: 'Frontend Developer · Designer · Writer', focus: 'The experience', summary: 'Diya brings interfaces, visual identity, writing, and search thinking together so a product feels considered from its first interaction.', skills: ['Frontend development', 'Website design', 'Creative writing', 'SEO', 'Visual storytelling'], link: { label: 'diyasubedi.com.np', href: 'https://diyasubedi.com.np' } },
]

const labs = [
  ['EXPERIMENT / 001', 'Small systems, careful questions.', 'ACTIVE'],
  ['EXPERIMENT / 002', 'Prototypes that teach us something.', 'EXPERIMENTAL'],
  ['PROTOTYPE / 003', 'Ideas waiting for a clearer shape.', 'ARCHIVED'],
]

const searchItems = [
  ...projects.map((project) => ({ id: `project-${project.index}`, name: project.name, description: project.description, type: 'PROJECT', href: '#projects', tags: project.technologies.join(' ') })),
  ...capabilities.map((capability) => ({ id: `capability-${capability.number}`, name: capability.title, description: capability.text, type: 'CAPABILITY', href: '#build', tags: capability.tags.join(' ') })),
  ...labs.map(([label, text, status]) => ({ id: label, name: text, description: status, type: 'LAB', href: '#lab', tags: status })),
  ...process.map(([number, title, text]) => ({ id: `process-${number}`, name: title, description: text, type: 'PROCESS', href: '#process' })),
  ...articles.map((article) => ({ id: `article-${article.id}`, name: article.title, description: article.summary, type: 'NOTE', href: '#notes', tags: article.category })),
]

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'
const PROJECT_VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'

/* ============================================================
   APP
   ============================================================ */

function Arrow() {
  return <span className="inline-block text-[16px] leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
}

function LabSection() {
  return <section className="py-16 sm:py-24" id="lab">
    <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
      <div className="lab-heading" data-reveal>
        <div><span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3"><span className="w-5 h-[1.5px] bg-neutral-400 block" />THE LAB</span><h2 className="leading-none tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Not everything becomes a product. <em>Some ideas exist because we wanted to know if we could build them.</em></h2></div>
        <span className="lab-count">03 OPEN THREADS</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-neutral-800 rounded-xl overflow-hidden border border-neutral-800">
        {labs.map(([label, text, status]) => <details className="bg-neutral-950 p-6 min-h-[180px] hover:bg-neutral-900 transition-colors group" key={label}><summary className="list-none cursor-pointer outline-none [&::-webkit-details-marker]:hidden"><div className="flex justify-between text-[10px] font-mono text-neutral-500 tracking-wider"><span>{label}</span><span className="w-1.5 h-1.5 bg-neutral-600 rounded-full group-open:bg-white transition-colors" /></div><h3 className="text-[17px] tracking-tight mt-10 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{text}</h3><p className="text-[11px] font-mono text-neutral-500 tracking-wider">{status}</p></summary><div className="border-t border-neutral-800 pt-4 mt-4"><span className="text-[10px] font-mono text-neutral-500 tracking-wider">WHY IT EXISTS</span><p className="text-neutral-500 text-[14px] leading-relaxed mt-2">{status === 'ACTIVE' ? 'A live question being explored through a small system and careful iteration.' : status === 'EXPERIMENTAL' ? 'A prototype used to learn what the idea can become before it earns a larger shape.' : 'An archived direction kept as reference for what the work taught us.'}</p></div></details>)}
      </div>
    </div>
  </section>
}

function CapabilityIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    Websites: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M8 13l-2 2 2 2m8-4 2 2-2 2" /></>,
    Applications: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 6h6M9 18h6" /></>,
    Software: <><path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" /><path d="m8.5 10 2 2-2 2m5-4-2 2 2 2" /></>,
    'Creative Technology': <><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="4" /><path d="m5.6 5.6 12.8 12.8M18.4 5.6 5.6 18.4" /></>,
    'Open Source': <><path d="M12 3a5 5 0 0 0-2 9.6V15H7v3h3v3h4v-3h3v-3h-3v-2.4A5 5 0 0 0 12 3Z" /><path d="M7 8H5a2 2 0 0 0-2 2v3h3" /></>,
  }
  return <svg className="capability-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function ProjectMark({ visual }: { visual: string }) {
  const marks: Record<string, ReactNode> = {
    cheapflix: <><circle cx="12" cy="12" r="8.5" strokeWidth="1.1" opacity=".7" /><path d="M7 9.5h10v7H7z" /><path d="M10 9.5v7M14 9.5v7" strokeWidth="1.1" /></>,
    'nepal-info': <><circle cx="12" cy="12" r="8.5" strokeWidth="1.1" opacity=".7" /><path d="M7.5 15.5 10 10.5l1.6 2.2 1.8-3.2 3.1 6Z" strokeWidth="1.2" /><circle cx="12" cy="7.4" r=".9" fill="currentColor" stroke="none" /></>,
    poetry: <><circle cx="12" cy="12" r="8.5" strokeWidth="1.1" opacity=".7" /><path d="M14.8 6.5c-1.4 2.8-3 5-5.2 6.8-.9.8-1.9 1.3-2.8 1.5 1.2.2 2.6-.3 3.8-1.4 1.8-1.7 3.1-4 4.2-6.9Z" strokeWidth="1.2" /><path d="M9.6 13.8 7.5 16.5" strokeWidth="1.1" /></>,
    aeroplane: <><circle cx="12" cy="12" r="8.5" strokeWidth="1.1" opacity=".7" /><path d="M6 14.2 12 10.8l-.3 1.9 5-1-4 1.9-.4 1.6-1 1.6-2.6-1.1-1.6 1.2.2-1.7L6 14.2Z" strokeWidth="1.15" strokeLinejoin="round" /></>,
    gallery: <><rect x="5" y="7" width="14" height="11" rx="1.5" strokeWidth="1.1" opacity=".8" /><path d="M5 7 12 4.5 19 7" strokeWidth="1.1" /><circle cx="10" cy="12.5" r="2" strokeWidth="1.1" /><circle cx="14.5" cy="12.5" r="2" strokeWidth="1.1" /><path d="M12 10.8v3.4" strokeWidth="1" opacity=".8" /></>,
    kynvera: <><circle cx="12" cy="12" r="8.5" strokeWidth="1.1" opacity=".7" /><path d="M9.5 7.5v9M9.5 12l2.6-4.5-1 4.5 1.2 4.5L9.5 12Z" strokeWidth="1.2" /><path d="M14.5 7.5v9M14.5 12l2.5-4.5M14.5 12l2.5 4.5" strokeWidth="1.2" /></>,
    ironman: <><path d="M12 3.8 18.5 7.5v7L12 20.2 5.5 14.5v-7Z" strokeWidth="1.15" /><circle cx="12" cy="11.8" r="3.2" strokeWidth="1.2" /><circle cx="12" cy="11.8" r="1" fill="currentColor" stroke="none" /><path d="M12 5.8v1.6M12 16.2v1.6M7.2 11.8h1.6M15.2 11.8h1.6" strokeWidth="1" opacity=".8" /></>,
    nepse: <><circle cx="12" cy="12" r="8.5" strokeWidth="1.1" opacity=".7" /><path d="M7.5 15.5 10 12.5l1.8 1.2 2.4-2.6 2.3-2" strokeWidth="1.25" /><path d="M14.2 9.1h2v2" strokeWidth="1.15" /><path d="M7.5 15.5H16.5" strokeWidth="1" opacity=".7" /></>,
  }
  return <svg className="project-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{marks[visual]}</svg>
}

const projectImages: Record<string, string> = {
  cheapflix: '/assets/projects/cheapflix.png',
  'nepal-info': '/assets/projects/nepal-info.svg',
  poetry: '/assets/projects/poetry.svg',
  aeroplane: '/assets/projects/aeroplane.svg',
  gallery: '/assets/projects/gallery.svg',
  kynvera: '/assets/projects/kynvera.svg',
  ironman: '/assets/projects/ironman.svg',
  nepse: '/assets/projects/nepse.svg',
}

function ProjectVisual({ visual }: { visual: string }) {
  const image = projectImages[visual]
  return image ? <img className="project-logo-image" src={image} alt="" loading="lazy" decoding="async" /> : <ProjectMark visual={visual} />
}

function ProjectDetailPage({ project, onBack }: { project: Project; onBack: () => void }) {
  const handleBrandClick = (event: React.MouseEvent) => {
    event.preventDefault()
    onBack()
  }
  return (
    <main className="project-page min-h-screen bg-black text-white">
      <video className="project-page-video" autoPlay muted loop playsInline preload="metadata">
        <source src={PROJECT_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="project-page-overlay" aria-hidden="true" />
      <nav className="project-page-nav">
        <button type="button" onClick={onBack} className="project-back"><span aria-hidden="true">←</span> All projects</button>
        <a href="#projects" onClick={handleBrandClick} className="project-page-brand"><img src="/assets/logo/kynvera-symbol.svg" alt="" />Kynvera</a>
        <span className="project-page-status">{project.status}</span>
      </nav>
      <section className="project-page-hero">
        <div className="project-page-intro">
          <span>{project.index} / {project.category}</span>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <div className="project-page-actions">
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Visit live site <Arrow /></a>}
            {project.source && <a href={project.source} target="_blank" rel="noreferrer">View source <Arrow /></a>}
          </div>
        </div>
        <div className={`project-page-signal ${project.visual} ${projectImages[project.visual] ? 'with-image' : ''}`} aria-hidden="true"><span>{project.index}</span><ProjectVisual visual={project.visual} /><b>{project.category.split(' / ')[0]}</b></div>
      </section>
      <section className="project-page-details">
        <article><span>THE QUESTION</span><p>{project.problem}</p></article>
        <article><span>THE DIRECTION</span><p>{project.solution}</p></article>
        <aside><span>BUILT WITH</span><div>{project.technologies.map((technology) => <b key={technology}>{technology}</b>)}</div></aside>
      </section>
    </main>
  )
}

function PersonDetailPage({ person, onBack }: { person: TeamMember; onBack: () => void }) {
  const handleBrandClick = (event: React.MouseEvent) => {
    event.preventDefault()
    onBack()
  }
  return (
    <main className={`person-page person-${person.slug} min-h-screen text-white`}>
      <nav className="person-page-nav">
        <button type="button" onClick={onBack} className="project-back"><span aria-hidden="true">←</span> The people</button>
        <a href="#about" onClick={handleBrandClick} className="project-page-brand"><img src="/assets/logo/kynvera-symbol.svg" alt="" />Kynvera</a>
        <span className="project-page-status">FOUNDER / KYNVERA</span>
      </nav>
      <section className="person-page-hero">
        <div className="person-page-photo"><img src={person.photo} alt={person.name} decoding="async" /></div>
        <div className="person-page-copy">
          <span>{person.role}</span>
          <h1>{person.name}</h1>
          <p>{person.summary}</p>
          <a href={person.link?.href} target="_blank" rel="noreferrer">Visit portfolio <Arrow /></a>
        </div>
      </section>
      <section className="person-page-detail">
        <article><span>IN THE STUDIO</span><h2>{person.focus}</h2><p>Working from the belief that an idea becomes stronger when its structure and its story are designed together.</p></article>
        <article><span>FOCUS AREAS</span><div>{person.skills.map((skill) => <b key={skill}>{skill}</b>)}</div></article>
      </section>
    </main>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('ALL')
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [githubState, setGithubState] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const [pillsVisible, setPillsVisible] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [detailHash, setDetailHash] = useState(() => window.location.hash)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollMeterRef = useRef<HTMLSpanElement>(null)
  const showTopRef = useRef(false)

  useVideoScrub(videoRef)
  useHeroCursor()

  const { displayed, done } = useTypewriter(
    'Ideas into digital reality.',
    52,
    600,
  )

  const selectedProjectPage = useMemo(
    () => projects.find((project) => detailHash === `#project-${project.index}`),
    [detailHash],
  )
  const selectedPersonPage = useMemo(
    () => teamMembers.find((person) => detailHash === `#person-${person.slug}`),
    [detailHash],
  )
  const isDetailPage = Boolean(selectedProjectPage ?? selectedPersonPage)

  // Show pills after 400ms
  useEffect(() => {
    const timer = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // Scroll progress meter — updates the DOM directly and only re-renders
  // when the back-to-top visibility actually flips (was re-rendering App
  // on every scroll frame before).
  useEffect(() => {
    let ticking = false
    const updateScrollMeter = () => {
      ticking = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      if (scrollMeterRef.current) scrollMeterRef.current.style.transform = `scaleX(${ratio})`
      const shouldShow = ratio > 0.12
      if (shouldShow !== showTopRef.current) {
        showTopRef.current = shouldShow
        setShowTop(shouldShow)
      }
    }
    const requestMeter = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(updateScrollMeter) }
    }
    updateScrollMeter()
    window.addEventListener('scroll', requestMeter, { passive: true })
    window.addEventListener('resize', requestMeter)
    return () => { window.removeEventListener('scroll', requestMeter); window.removeEventListener('resize', requestMeter) }
  }, [])

  useEffect(() => {
    const syncProjectPage = () => setDetailHash(window.location.hash)
    window.addEventListener('hashchange', syncProjectPage)
    return () => window.removeEventListener('hashchange', syncProjectPage)
  }, [])

  // Scroll to top whenever a detail page opens; when returning to the
  // main page via back navigation, jump to the relevant section.
  const navigatingBackRef = useRef<string | null>(null)
  useEffect(() => {
    if (isDetailPage) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    } else if (navigatingBackRef.current) {
      const target = navigatingBackRef.current
      navigatingBackRef.current = null
      requestAnimationFrame(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
      })
    }
  }, [isDetailPage])

  // Analytics + GitHub fetch (runs once — independent of page switching)
  useEffect(() => {
    const analyticsSiteId = import.meta.env.VITE_FATHOM_SITE_ID
    const removeAnalytics = analyticsSiteId ? loadAnalytics(analyticsSiteId) : () => undefined

    const controller = new AbortController()
    const trackGithubClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('a[href*="github.com"]')) trackEvent('github_click')
    }
    document.addEventListener('click', trackGithubClick)
    fetch('https://api.github.com/orgs/Kynvera/repos?sort=updated&per_page=4', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => response.ok ? response.json() as Promise<GithubRepo[]> : Promise.reject(new Error('GitHub unavailable')))
      .then((data) => { setRepos(data); setGithubState('ready') })
      .catch(() => setGithubState('fallback'))

    return () => { controller.abort(); document.removeEventListener('click', trackGithubClick); removeAnalytics() }
  }, [])

  // Scroll reveals — MUST re-run every time we switch between the main
  // page and a detail page. The old code ran once (deps []) against DOM
  // nodes that get unmounted on navigation, so returning back left every
  // [data-reveal] at opacity:0 (blank page).
  useEffect(() => {
    if (isDetailPage) return
    let observer: IntersectionObserver | undefined
    const frame = requestAnimationFrame(() => {
      const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
      if (revealElements.length === 0) return
      // If IntersectionObserver is unavailable, show everything.
      if (typeof IntersectionObserver === 'undefined') {
        revealElements.forEach((element) => element.classList.add('is-visible'))
        return
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
      revealElements.forEach((element) => observer?.observe(element))
    })
    return () => { cancelAnimationFrame(frame); observer?.disconnect() }
  }, [isDetailPage, detailHash, projectFilter])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const projectFilters = useMemo(
    () => ['ALL', ...Array.from(new Set(projects.map((project) => project.category.split(' / ')[0])))],
    [],
  )
  const filteredProjects = useMemo(
    () => projectFilter === 'ALL' ? projects : projects.filter((project) => project.category.startsWith(projectFilter)),
    [projectFilter],
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@kynvera.com')
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2000)
    } catch { /* clipboard unavailable — address is visible next to the button */ }
  }

  const openProjectPage = useCallback((project: Project) => {
    trackEvent('project_clicked')
    window.location.hash = `#project-${project.index}`
  }, [])

  const openPersonPage = useCallback((person: TeamMember) => {
    window.location.hash = `#person-${person.slug}`
  }, [])

  const goBackToProjects = useCallback(() => {
    navigatingBackRef.current = '#projects'
    window.location.hash = '#projects'
    // If hash was already #projects (no hashchange fires), force the sync.
    setDetailHash('#projects')
  }, [])

  const goBackToAbout = useCallback(() => {
    navigatingBackRef.current = '#about'
    window.location.hash = '#about'
    setDetailHash('#about')
  }, [])

  if (selectedProjectPage) return <ProjectDetailPage project={selectedProjectPage} onBack={goBackToProjects} />
  if (selectedPersonPage) return <PersonDetailPage person={selectedPersonPage} onBack={goBackToAbout} />

  return (
    <div className="min-h-screen relative bg-black text-white">
      <a className="fixed left-4 top-3 z-50 px-4 py-2 bg-white text-black text-sm rounded-lg -translate-y-[200%] focus:translate-y-0 transition-transform" href="#main">Skip to main content</a>

      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        className="hero-film fixed inset-0 z-0 w-full h-full object-cover"
        style={{ objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Animated atmosphere over the video */}
      <div className="site-video-overlay fixed inset-0 z-[1] pointer-events-none" aria-hidden="true" />

      {/* Soft gold glow that trails the cursor across the hero */}
      <div className="hero-cursor-glow fixed inset-0 z-[1] pointer-events-none" aria-hidden="true" />

      {/* ── Navbar ── */}
      <header className="studio-nav fixed top-4 left-4 right-4 sm:left-8 sm:right-8 z-10 flex items-center justify-between px-4 sm:px-5 py-3">
        <div className="flex items-center gap-3">
          <a href="#main" onClick={closeMenu} aria-label="Kynvera home" className="flex items-center gap-3">
            <img src="/assets/logo/kynvera-symbol.svg" alt="" className="w-6 h-6 studio-mark" />
            <span className="text-[18px] sm:text-[20px] tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>Kynvera</span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-[13px] text-neutral-300" aria-label="Primary navigation">
          <a href="#projects" className="studio-nav-link">Projects</a>
          <a href="#build" className="studio-nav-link">Studio</a>
          <a href="#about" className="studio-nav-link">People</a>
          <a href="#services" className="studio-nav-link">Services</a>
          <a href="#notes" className="studio-nav-link">Notes</a>
        </nav>

        {/* Desktop CTA + Search */}
        <div className="hidden md:flex items-center gap-3">
          <Search items={searchItems} />
          <a href="#contact" className="studio-contact">Start a project <Arrow /></a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] w-7 p-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          <span className="block w-6 h-[2px] bg-white transition-transform duration-300" style={menuOpen ? { transform: 'rotate(45deg) translate(3px, 4px)' } : {}} />
          <span className="block w-6 h-[2px] bg-white transition-opacity duration-300" style={menuOpen ? { opacity: 0 } : {}} />
          <span className="block w-6 h-[2px] bg-white transition-transform duration-300" style={menuOpen ? { transform: 'rotate(-45deg) translate(3px, -4px)' } : {}} />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-9 bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 md:hidden transition-opacity duration-300"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <a href="#projects" onClick={closeMenu} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Projects</a>
        <a href="#build" onClick={closeMenu} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Studio</a>
        <a href="#about" onClick={closeMenu} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">People</a>
        <a href="#notes" onClick={closeMenu} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Notes</a>
        <a href="#services" onClick={closeMenu} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Services</a>
        <a href="#contact" onClick={closeMenu} className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity">Get in touch</a>
        <div className="mt-4"><Search items={searchItems} /></div>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative z-[2] h-screen min-h-[680px] flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden" id="main">
        <div className="max-w-4xl relative z-10 hero-copy">
          {/* Blurred intro label */}
          <div className="hero-kicker pointer-events-none select-none mb-5 sm:mb-6">
            <span className="hero-signal" />01 Studio <i>·</i> Kynvera
          </div>

          {/* Typewriter text */}
          <h1 className="hero-title text-white mb-5 sm:mb-7">
            {displayed}
            {!done && <span className="inline-block w-[3px] h-[.78em] bg-[#d8b270] align-middle ml-[6px] cursor-blink" />}
          </h1>
          <p className="hero-description">Two people in Kathmandu, building software, AI experiments, and thoughtful digital experiences — one useful version at a time.</p>

          {/* Action pill buttons */}
          <div
            className="flex flex-wrap gap-y-1 transition-all duration-[400ms] ease-out"
            style={{ opacity: pillsVisible ? 1 : 0, transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)' }}
          >
            <a href="#projects" className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
              See our work
            </a>
            <a href="#build" className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
              What we build
            </a>
            <a href="#contact" className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
              Send a brief hello
            </a>
            <a href="#services" className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
              See how we operate
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
              aria-live="polite"
            >
              <span>{emailCopied ? 'Copied ✓ — talk soon.' : <>Reach us: <span className="underline underline-offset-1">hello@kynvera.com</span></>}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── Content sections below hero ── */}
      <div className="site-content relative z-[2]">
        <p className="now-strip" data-reveal>
          <span>NOW</span> Building CheapFlix · Probing NEPSE data · Writing notes in public
        </p>

        {/* ── Capabilities ── */}
        <section className="py-24 sm:py-32 lg:py-40" id="build">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12" data-reveal>
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
                  <span className="w-5 h-[1.5px] bg-neutral-400 block" />STUDIO
                </span>
                <h2 className="text-[clamp(32px,5vw,56px)] leading-none tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>What we build</h2>
              </div>
              <p className="max-w-xs text-neutral-500 text-[15px] leading-relaxed">Different tools. One shared habit: make the next version more useful.</p>
            </div>
            <div className="capability-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-neutral-800 rounded-xl overflow-hidden border border-neutral-800">
              {capabilities.map((item, index) => (
                <div className="capability-card bg-neutral-950 p-6 min-h-[280px] flex flex-col hover:bg-neutral-900 transition-colors group" key={item.number} data-reveal style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
                  <div className="flex items-start justify-between"><span className="text-[11px] font-mono text-neutral-500 tracking-wider">{item.number}</span><CapabilityIcon name={item.title} /></div>
                  <h3 className="text-[20px] mt-10 mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p className="text-neutral-500 text-[14px] leading-relaxed flex-1">{item.text}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 border border-neutral-800 rounded-md text-[11px] text-neutral-500 group-hover:border-neutral-700 transition-colors">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="py-24 sm:py-32 lg:py-40" id="projects">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="proj-heading" data-reveal>
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
                  <span className="w-5 h-[1.5px] bg-neutral-400 block" />PROJECTS
                </span>
                <h2 className="text-[clamp(32px,5vw,56px)] leading-none tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Things we've built <em>— eight so far, across software, design, data, and play.</em></h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8" data-reveal>
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`px-4 py-2 rounded-lg text-[13px] border transition-colors ${projectFilter === filter ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-300'}`}
                  onClick={() => setProjectFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="project-ledger">
              {filteredProjects.map((project, index) => (
                <article className="ledger-project" key={project.index} data-reveal style={{ '--reveal-delay': `${(index % 4) * 60}ms` } as CSSProperties}>
                  <div className={`ledger-art ${project.visual} ${projectImages[project.visual] ? 'with-image' : ''}`} aria-hidden="true"><span>{project.index}</span><ProjectVisual visual={project.visual} /><i>{project.category.split(' / ')[0]}</i><b>{project.status}</b></div>
                  <div className="ledger-copy">
                    <div className="ledger-meta"><span>{project.category}</span><span>PROJECT / {project.index}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="ledger-tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
                    <div className="ledger-actions">
                      <button type="button" onClick={() => openProjectPage(project)}>Project details <Arrow /></button>
                      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Visit live site <Arrow /></a>}
                      {project.source && <a href={project.source} target="_blank" rel="noreferrer">View source <Arrow /></a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CaseStudiesSection />

        {/* ── GitHub ── */}
        <section className="py-24 sm:py-32 lg:py-40" id="github">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
                <span className="w-5 h-[1.5px] bg-neutral-400 block" />OPEN SOURCE
              </span>
              <h2 className="text-[clamp(32px,5vw,56px)] leading-none tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Built in public.</h2>
              <p className="text-neutral-500 text-[16px] leading-relaxed max-w-sm mb-6">Many of our experiments live openly on GitHub. Follow the work, explore the code, and see what we're building next.</p>
              <a className="inline-flex items-center gap-2 bg-white text-black rounded-lg px-5 py-3 text-[14px] font-medium hover:bg-neutral-200 transition-colors group" href="https://github.com/arpan085" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a>
            </div>
            <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950" data-reveal>
              <div className="flex justify-between px-5 py-3 border-b border-neutral-800 text-[11px] font-mono text-neutral-500 tracking-wider">
                <span>REPOSITORIES</span>
                <span className="flex items-center gap-2 text-neutral-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${githubState === 'ready' ? 'bg-green-400' : 'bg-neutral-500'} animate-pulse`} />
                  {githubState === 'ready' ? 'LIVE' : githubState === 'loading' ? 'LOADING' : 'MEMBERS'}
                </span>
              </div>
              {githubState === 'loading' ? (
                <div className="grid gap-3 p-5">{[1,2,3].map((i) => <div key={i} className="h-3 bg-neutral-800 rounded animate-pulse" style={{ width: `${100 - i * 15}%` }} />)}</div>
              ) : repos.length > 0 ? repos.map((repo) => (
                <a className="flex justify-between items-start gap-5 px-5 py-4 border-b border-neutral-800 last:border-0 hover:bg-neutral-900 transition-colors" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
                  <div>
                    <h3 className="text-[15px] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{repo.name}</h3>
                    <p className="text-neutral-500 text-[13px] leading-snug max-w-[320px]">{repo.description ?? 'A Kynvera repository.'}</p>
                  </div>
                  <div className="flex gap-3 items-center text-[11px] font-mono text-neutral-500 shrink-0">
                    <span className="text-neutral-400">{repo.language ?? 'CODE'}</span>
                    <span>★ {repo.stargazers_count}</span>
                    <span>⑂ {repo.forks_count}</span>
                  </div>
                </a>
              )) : (
                <div className="p-5 text-neutral-500 text-[14px]">
                  <p>Explore the people behind the work while the organization feed connects.</p>
                  <div className="flex gap-5 mt-4">
                    <a href="https://github.com/arpan085" target="_blank" rel="noreferrer" className="text-neutral-300 text-[13px] hover:text-white transition-colors">arpan085 ↗</a>
                    <a href="https://github.com/26diyasubedi" target="_blank" rel="noreferrer" className="text-neutral-300 text-[13px] hover:text-white transition-colors">26diyasubedi ↗</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* ── About / Founders ── */}
        <section className="py-24 sm:py-32 lg:py-40" id="about">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start" data-reveal>
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
                  <span className="w-5 h-[1.5px] bg-[#d8b270] block" />THE PEOPLE
                </span>
                <h2 className="text-[clamp(32px,5vw,56px)] leading-none tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Two minds.<br />One useful direction.</h2>
                <p className="text-neutral-400 text-[17px] leading-relaxed max-w-md mb-4">Kynvera is a two-person studio managed by Arpan Baral and Diya Subedi—combining product thinking, engineering, design, and words from the start.</p>
                <p className="text-neutral-300 text-[17px] leading-relaxed max-w-md">We make things that need both a dependable foundation and a human-facing point of view.</p>
              </div>
              <div className="border border-neutral-800 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-[1fr_48px_1fr] bg-neutral-950">
                <div className="p-6">
                  <span className="text-[11px] font-mono text-neutral-500 tracking-wider">TECHNOLOGY</span>
                  <strong className="block text-[24px] mt-10 mb-8 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Systems<br />that work.</strong>
                  <ul className="text-neutral-500 text-[13px] space-y-1">{['Python', 'Backend', 'AI / ML', 'Automation', 'Systems'].map(s => <li key={s}><span className="text-neutral-400 mr-2">→</span>{s}</li>)}</ul>
                </div>
                <div className="hidden sm:grid place-items-center bg-neutral-900 border-x border-neutral-800">
                  <img src="/assets/logo/kynvera-symbol.svg" alt="" className="w-6 opacity-40 invert" />
                </div>
                <div className="p-6 border-t sm:border-t-0 border-neutral-800">
                  <span className="text-[11px] font-mono text-neutral-500 tracking-wider">CREATIVE</span>
                  <strong className="block text-[24px] mt-10 mb-8 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Ideas<br />with a voice.</strong>
                  <ul className="text-neutral-500 text-[13px] space-y-1">{['Writing', 'Digital publishing', 'Visual storytelling', 'Web experiences', 'Ideas'].map(s => <li key={s}><span className="text-neutral-400 mr-2">→</span>{s}</li>)}</ul>
                </div>
              </div>
            </div>

            {/* Founders — photo slots stay intentional until final portraits are supplied. */}
            <div className="team-grid mt-12">
              {teamMembers.map((member, index) => (
                <article className="team-card" key={member.name} style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties} data-reveal>
                  <div className={`team-portrait portrait-${index + 1}`}>
                    <img src={member.photo} alt={member.name} loading="lazy" decoding="async" />
                    <small>FOUNDER / 0{index + 1}</small>
                  </div>
                  <div className="team-copy">
                    <span className="text-[10px] font-mono text-neutral-500 tracking-wider">FOUNDER / 0{index + 1}</span>
                    <h3>{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-summary">{member.summary}</p>
                    <button className="team-more" type="button" onClick={() => openPersonPage(member)}>View full profile <Arrow /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BlogSection />
        <LabSection />

        {/* ── Philosophy banner ── */}
        <section className="philosophy-banner py-24 sm:py-32 text-white relative overflow-hidden" data-reveal>
          <div className="absolute right-[-3%] bottom-[-10%] text-[clamp(120px,20vw,300px)] font-extrabold tracking-tighter text-white/5 leading-none pointer-events-none select-none" style={{ fontFamily: 'var(--font-heading)' }}>KYNVERA</div>
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10">
            <span className="philosophy-label inline-flex items-center gap-2 text-[13px] tracking-wide mb-4">
              <span className="w-5 h-[1.5px] block" />THE LOOP
            </span>
            <h2 className="text-[clamp(44px,8vw,100px)] leading-[0.88] tracking-tighter mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Build. Break.<br /><em className="philosophy-em italic">Learn. Build again.</em></h2>
            <p className="philosophy-copy max-w-xs text-[15px] leading-relaxed">There is no straight line from an idea to something real. That is part of the work.</p>
          </div>
        </section>

        <ServicesSection />

        {/* ── Contact ── */}
        <section className="py-24 sm:py-32 lg:py-40" id="contact">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-12 lg:gap-20 items-start">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
                <span className="w-5 h-[1.5px] bg-neutral-400 block" />CONTACT
              </span>
              <h2 className="text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-tighter mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Have an idea?</h2>
              <p className="text-neutral-400 text-[16px] leading-relaxed mb-6">We enjoy interesting problems, unusual ideas, and things worth building.</p>
              <div className="flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 border border-neutral-700 rounded-lg px-5 py-3 text-[14px] text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors group" href="mailto:hello@kynvera.com">Email us <Arrow /></a>
                <a className="inline-flex items-center gap-2 border border-neutral-700 rounded-lg px-5 py-3 text-[14px] text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors group" href="https://github.com/arpan085" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              </div>
              <p className="contact-boundaries">No decks. No account managers.<br />No promises before discovery.</p>
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>

        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
          <NewsletterSignup />
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-neutral-800 py-8 mt-8">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <img src="/assets/logo/kynvera-reverse.svg" alt="KYNVERA" className="w-32 mb-3" />
              <p className="text-neutral-500 text-[13px]">Ideas into digital reality.</p>
            </div>
            <div className="flex gap-6">
              <a href="#projects" className="text-neutral-500 text-[13px] hover:text-white transition-colors">Projects</a>
              <a href="#about" className="text-neutral-500 text-[13px] hover:text-white transition-colors">About</a>
              <a href="#github" className="text-neutral-500 text-[13px] hover:text-white transition-colors">GitHub</a>
              <a href="#contact" className="text-neutral-500 text-[13px] hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-right text-neutral-600 text-[12px] space-y-1">
              <p>© 2026 Kynvera</p>
              <p>TENDED SEP 2026 · 27.71°N, 85.32°E</p>
              <p>INDEPENDENT / COLLABORATIVE / CURIOUS</p>
            </div>
          </div>
        </footer>
      </div>

      <div className="scroll-meter" aria-hidden="true"><span ref={scrollMeterRef} /></div>
      <button className={`back-to-top ${showTop ? 'is-visible' : ''}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑ <span>Top</span></button>
    </div>
  )
}

export default App
