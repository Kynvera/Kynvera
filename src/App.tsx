import { useEffect, useRef, useState, type CSSProperties } from 'react'
import ContactForm from './components/ContactForm'
import NewsletterSignup from './components/NewsletterSignup'
import ServicesSection from './components/ServicesSection'
import Search from './components/Search'
import CaseStudiesSection from './components/CaseStudiesSection'
import BlogSection, { articles } from './components/BlogSection'
import ProcessSection, { process } from './components/ProcessSection'
import NewsletterIssues from './components/NewsletterIssues'
import ResourceGuide from './components/ResourceGuide'
import RelatedProjects from './components/RelatedProjects'
import { loadAnalytics, trackEvent } from './lib/analytics'

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
  },
]

const capabilities = [
  { number: '01', title: 'Software', text: 'Practical software designed to solve real problems.', tags: ['Python', 'Node.js', 'APIs', 'Databases', 'Automation'] },
  { number: '02', title: 'AI & ML', text: 'Experiments and applications exploring intelligent software.', tags: ['Models', 'Data', 'Evaluation', 'Research'] },
  { number: '03', title: 'Web', text: 'Fast, modern websites and digital experiences.', tags: ['React', 'Interfaces', 'Systems', 'Interaction'] },
  { number: '04', title: 'Creative Technology', text: 'Technology combined with storytelling, writing, design, and digital publishing.', tags: ['Writing', 'Publishing', 'Visuals', 'Ideas'] },
  { number: '05', title: 'Open Source', text: 'Tools and projects shared with the wider developer community.', tags: ['Public', 'Useful', 'Learning', 'Release'] },
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

function SectionLabel({ children, number }: { children: string; number?: string }) {
  return <div className="section-label"><span>{number ?? '//'}</span>{children}</div>
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectFilter, setProjectFilter] = useState('ALL')
  const [comparison, setComparison] = useState<string[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [githubState, setGithubState] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const analyticsSiteId = import.meta.env.VITE_FATHOM_SITE_ID
    const removeAnalytics = analyticsSiteId ? loadAnalytics(analyticsSiteId) : () => undefined
    const savedTheme = window.localStorage.getItem('kynvera-theme') as 'dark' | 'light' | null
    if (savedTheme) setTheme(savedTheme)

    const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    revealElements.forEach((element) => observer.observe(element))

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

    return () => { observer.disconnect(); controller.abort(); document.removeEventListener('click', trackGithubClick); removeAnalytics() }
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('kynvera-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    if (selectedProject) window.requestAnimationFrame(() => document.querySelector<HTMLElement>('.project-modal button, .project-modal a[href]')?.focus())
    if (!selectedProject) openerRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (!selectedProject) return
      if (event.key === 'Escape') setSelectedProject(null)
      if (event.key === 'Tab') {
        const dialog = document.querySelector<HTMLElement>('.project-modal')
        const focusable = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) : []
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape) }
  }, [selectedProject])

  const closeMenu = () => setMenuOpen(false)
  const logo = theme === 'light' ? '/assets/logo/kynvera-monochrome.svg' : '/assets/logo/kynvera-primary.svg'
  const projectFilters = ['ALL', ...Array.from(new Set(projects.map((project) => project.category.split(' / ')[0])))]
  const filteredProjects = projectFilter === 'ALL' ? projects : projects.filter((project) => project.category.startsWith(projectFilter))
  const toggleComparison = (projectIndex: string) => setComparison((current) => current.includes(projectIndex) ? current.filter((index) => index !== projectIndex) : current.length < 2 ? [...current, projectIndex] : current)
  const comparedProjects = projects.filter((project) => comparison.includes(project.index))

  return (
    <div className="site-shell">
      <a className="skip-link" href="#top">Skip to main content</a>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="grid-field" aria-hidden="true" />
      <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
        <span className="scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` } as CSSProperties} aria-hidden="true" />
        <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label="Kynvera home">
          <img src={logo} alt="KYNVERA" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#notes">Notes</a>
          <a href="#build">What we build</a>
          <a href="#about">About</a>
          <a href="#github">GitHub</a>
        </nav>
        <div className="header-actions">
          <Search items={searchItems} />
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <span className="theme-orb" />
            <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
          <a className="header-cta" href="#projects">Explore projects <Arrow /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
            <span /><span />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="#projects" onClick={closeMenu}>Projects <Arrow /></a>
          <a href="#services" onClick={closeMenu}>Services <Arrow /></a>
          <a href="#notes" onClick={closeMenu}>Notes <Arrow /></a>
          <a href="#build" onClick={closeMenu}>What we build <Arrow /></a>
          <a href="#about" onClick={closeMenu}>About <Arrow /></a>
          <a href="#github" onClick={closeMenu}>GitHub <Arrow /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy" data-reveal>
            <div className="micro-row"><span>SYSTEM / KYNVERA</span><span>01 / INTRO</span></div>
            <p className="hero-kicker">INDEPENDENT TECHNOLOGY + CREATIVE STUDIO</p>
            <h1>Ideas into <em>digital reality.</em></h1>
            <p className="hero-description">Kynvera is an independent technology and creative studio building software, digital experiences, experiments, and open-source projects.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore projects <Arrow /></a>
              <a className="button button-quiet" href="https://github.com/arpan085" target="_blank" rel="noreferrer">Visit GitHub <Arrow /></a>
            </div>
          </div>
          <div className="hero-system" aria-label="A system diagram showing ideas becoming software" data-reveal>
            <div className="system-meta top-meta"><span>PROCESS / 004</span><span>STATUS / BUILDING</span></div>
            <div className="system-orbit orbit-a" /><div className="system-orbit orbit-b" />
            <div className="system-line line-a" /><div className="system-line line-b" /><div className="system-line line-c" />
            <div className="system-node node-a"><span>01</span><b>IDEA</b></div>
            <div className="system-node node-b"><span>02</span><b>BUILD</b></div>
            <div className="system-node node-c"><span>03</span><b>TEST</b></div>
            <div className="system-node node-d"><span>04</span><b>LAUNCH</b></div>
            <div className="system-core"><img src="/assets/logo/kynvera-symbol.svg" alt="" /></div>
            <div className="system-meta bottom-meta"><span>MODE / EXPERIMENTAL</span><span>LIVE / 2026</span></div>
          </div>
          <div className="hero-index">KYNVERA / 001 <span>SCROLL TO EXPLORE</span></div>
        </section>

        <section className="manifesto section-wrap" data-reveal>
          <SectionLabel number="02">THE STARTING POINT</SectionLabel>
          <div className="manifesto-grid">
            <h2>We build things<br /><em>that start as ideas.</em></h2>
            <div className="manifesto-copy"><p>Some begin as problems we want to solve. Some begin as experiments. Some begin as creative ideas.</p><p>Kynvera exists to turn those ideas into things people can actually use.</p></div>
          </div>
        </section>

        <section className="build-section section-wrap" id="build">
          <div className="section-heading" data-reveal><div><SectionLabel number="03">THE WORK</SectionLabel><h2>What we build</h2></div><p>Different tools. One shared habit: make the next version more useful.</p></div>
          <div className="capability-list">
            {capabilities.map((item) => <article className="capability-card" key={item.number} data-reveal><div className="card-top"><span className="index">{item.number}</span><span className="status-dot" /></div><h3>{item.title}</h3><p>{item.text}</p><div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Arrow /></article>)}
          </div>
        </section>

        <section className="projects-section section-wrap" id="projects">
          <div className="section-heading" data-reveal><div><SectionLabel number="04">THE INDEX</SectionLabel><h2>Things we've built</h2></div><p>Real work, in different stages of becoming.</p></div>
          <div className="project-tools" data-reveal><div className="project-filters" role="group" aria-label="Filter projects">{projectFilters.map((filter) => <button className={projectFilter === filter ? 'active' : ''} type="button" key={filter} onClick={() => setProjectFilter(filter)}>{filter}</button>)}</div><span className="project-tool-hint">Select up to two to compare</span></div>
          <div className="project-grid">{filteredProjects.map((project) => <div className={`project-card-wrap ${comparison.includes(project.index) ? 'is-compared' : ''}`} key={project.index} data-reveal><button className={`project-card ${project.featured ? 'featured' : ''}`} onClick={(event) => { openerRef.current = event.currentTarget; trackEvent('project_clicked'); setSelectedProject(project) }}><div className="project-card-head"><span>{project.index} / {project.category}</span><span className="project-status">{project.status}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><span className="project-link">View project <Arrow /></span></button><button className="compare-toggle" type="button" onClick={() => toggleComparison(project.index)} aria-pressed={comparison.includes(project.index)}>{comparison.includes(project.index) ? 'Compared' : 'Compare'}</button></div>)}</div>
          {comparedProjects.length > 0 && <div className="comparison-tray" data-reveal><div><span className="section-label"><span>COMPARE</span>SELECTED WORK</span><h3>{comparedProjects.length === 1 ? 'Choose one more project.' : 'Two directions, side by side.'}</h3></div><div className="comparison-items">{comparedProjects.map((project) => <div key={project.index}><span>{project.category}</span><strong>{project.name}</strong><small>{project.status} · {project.technologies.join(' · ')}</small></div>)}</div><button className="comparison-clear" type="button" onClick={() => setComparison([])}>Clear</button></div>}
        </section>

        <section className="related-project-section section-wrap" aria-label="Related projects"><RelatedProjects current={projects[0]} projects={projects} onSelect={(project) => setSelectedProject(projects.find((item) => item.index === project.index) ?? null)} /></section>

        <CaseStudiesSection />
        <BlogSection />

        <section className="github-section section-wrap" id="github">
          <div className="github-heading" data-reveal><SectionLabel number="05">THE PUBLIC LAYER</SectionLabel><h2>Built in public.</h2><p>Many of our experiments live openly on GitHub. Follow the work, explore the code, and see what we're building next.</p><a className="button button-primary" href="https://github.com/arpan085" target="_blank" rel="noreferrer">Explore GitHub <Arrow /></a></div>
          <div className="repo-panel" data-reveal><div className="repo-panel-top"><span>REPOSITORIES / LIVE DATA</span><span className="live-indicator"><i />{githubState === 'ready' ? 'LIVE' : githubState === 'loading' ? 'CONNECTING' : 'MEMBERS'}</span></div>{githubState === 'loading' ? <div className="repo-loading" aria-label="Loading repositories"><span /><span /><span /></div> : repos.length > 0 ? repos.map((repo) => <a className="repo-row" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}><div><h3>{repo.name}</h3><p>{repo.description ?? 'A Kynvera repository.'}</p></div><div className="repo-stats"><span>{repo.language ?? 'CODE'}</span><span>★ {repo.stargazers_count}</span><span>⑂ {repo.forks_count}</span></div></a>) : <div className="repo-fallback"><p>Explore the people behind the work while the organization feed connects.</p><div><a href="https://github.com/arpan085" target="_blank" rel="noreferrer">arpan085 <Arrow /></a><a href="https://github.com/26diyasubedi" target="_blank" rel="noreferrer">26diyasubedi <Arrow /></a></div></div>}</div>
        </section>

        <ProcessSection />

        <section className="about-section section-wrap" id="about">
          <div className="about-copy" data-reveal><SectionLabel number="07">THE REASON</SectionLabel><h2>Why Kynvera?</h2><p>Kynvera is a collaborative space for two people who enjoy building, experimenting, creating, and learning together.</p><p>We don't want to build things simply because they are technically possible. We want to build things that are useful, interesting, beautiful, or worth exploring.</p></div>
          <div className="duality" data-reveal><div className="duality-side tech"><span className="duality-label">TECHNOLOGY</span><strong>Systems<br />that work.</strong><ul><li>Python</li><li>Backend</li><li>AI / ML</li><li>Automation</li><li>Systems</li></ul></div><div className="duality-join"><img src="/assets/logo/kynvera-symbol.svg" alt="" /></div><div className="duality-side creative"><span className="duality-label">CREATIVE</span><strong>Ideas<br />with a voice.</strong><ul><li>Writing</li><li>Digital publishing</li><li>Visual storytelling</li><li>Web experiences</li><li>Ideas</li></ul></div></div>
          <div className="about-detail-grid" data-reveal><div><span className="duality-label">WHAT MATTERS</span><ul><li>Useful over merely possible.</li><li>Interesting enough to explore.</li><li>Beautiful enough to keep using.</li></ul></div><div><span className="duality-label">HOW WE MOVE</span><p>Discover the problem. Explore the shape. Build a version. Test what breaks. Release what is worth sharing.</p></div><div><span className="duality-label">THE POSTURE</span><p>Independent in direction, collaborative in practice, and curious about what the next version can teach us.</p></div></div>
        </section>

        <section className="founders-section section-wrap" data-reveal>
          <div className="section-heading"><div><SectionLabel number="08">THE PEOPLE</SectionLabel><h2>The people behind Kynvera</h2></div><p>Two people, sharing a practice of making and learning.</p></div>
          <div className="founder-grid"><article><span className="founder-index">FOUNDER / 01</span><h3>Arpan</h3><p className="founder-role">Developer</p><div className="founder-focus"><span>FOCUS</span><strong>Systems that work.</strong><p>Python, backend development, automation, and learning AI/ML through practical projects.</p></div><div className="founder-focus"><span>CONTRIBUTION</span><p>Turns complex technical questions into working software that can be tested, improved, and shared.</p></div><a href="https://github.com/arpan085" target="_blank" rel="noreferrer">github.com/arpan085 <Arrow /></a></article><article><span className="founder-index">FOUNDER / 02</span><h3>Diya</h3><p className="founder-role">Writer &amp; Creative Contributor</p><div className="founder-focus"><span>FOCUS</span><strong>Ideas with a voice.</strong><p>Poetry, writing, creative expression, and digital publishing.</p></div><div className="founder-focus"><span>CONTRIBUTION</span><p>Shapes the creative direction and helps give digital work a clear point of view.</p></div><a href="https://github.com/26diyasubedi" target="_blank" rel="noreferrer">github.com/26diyasubedi <Arrow /></a></article></div>
        </section>

        <section className="lab-section section-wrap" id="lab" data-reveal><div className="section-heading"><div><SectionLabel number="09">THE LAB</SectionLabel><h2>Not everything becomes a product.</h2></div><p>Some ideas exist simply because we wanted to know whether we could build them.</p></div><div className="lab-grid">{labs.map(([label, text, status]) => <details className="lab-card" key={label}><summary><div><span>{label}</span><i /></div><h3>{text}</h3><p>{status}</p></summary><div className="lab-context"><span>WHY IT EXISTS</span><p>{status === 'ACTIVE' ? 'A live question being explored through a small system and careful iteration.' : status === 'EXPERIMENTAL' ? 'A prototype used to learn what the idea can become before it earns a larger shape.' : 'An archived direction kept as reference for what the work taught us.'}</p></div></details>)}</div></section>

        <section className="philosophy-section" data-reveal><div className="section-wrap"><SectionLabel number="10">THE LOOP</SectionLabel><h2>Build. Break.<br /><em>Learn. Build again.</em></h2><p>There is no straight line from an idea to something real. That is part of the work.</p></div></section>

        <ServicesSection />
        <section className="contact-section section-wrap" id="contact" data-reveal><div className="contact-intro"><SectionLabel number="11">THE NEXT IDEA</SectionLabel><h2>Have an idea?</h2><p>We enjoy interesting problems, unusual ideas, and things worth building.</p><div className="contact-actions"><a className="button button-outline" href="https://github.com/arpan085" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></div><ContactForm /></section>
        <NewsletterIssues />
        <ResourceGuide />
        <NewsletterSignup />
      </main>

      <footer className="site-footer section-wrap"><div className="footer-brand"><img src={theme === 'light' ? '/assets/logo/kynvera-monochrome.svg' : '/assets/logo/kynvera-reverse.svg'} alt="KYNVERA" /><p>Ideas into digital reality.</p></div><div className="footer-links"><a href="#projects">Projects</a><a href="#about">About</a><a href="#github">GitHub</a><a href="#contact">Contact</a></div><div className="footer-meta"><span>© 2026 Kynvera</span><span>INDEPENDENT / COLLABORATIVE / CURIOUS</span></div></footer>

      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button><div className="project-card-head"><span>{selectedProject.index} / {selectedProject.category}</span><span className="project-status">{selectedProject.status}</span></div><h2 id="project-title">{selectedProject.name}</h2><p className="modal-description">{selectedProject.description}</p><div className="modal-columns"><div><span className="modal-label">THE PROBLEM</span><p>{selectedProject.problem}</p></div><div><span className="modal-label">THE DIRECTION</span><p>{selectedProject.solution}</p></div></div><div className="tag-list">{selectedProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="modal-actions">{selectedProject.source ? <a className="button button-primary" href={selectedProject.source} target="_blank" rel="noreferrer">View source <Arrow /></a> : <span className="button button-disabled">Source link pending</span>}{selectedProject.demo ? <a className="button button-outline" href={selectedProject.demo} target="_blank" rel="noreferrer">Live demo <Arrow /></a> : <span className="button button-disabled">Demo link pending</span>}</div></article></div>}
    </div>
  )
}

export default App
