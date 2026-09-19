import { useState } from 'react'

type StatusTone = 'live' | 'building' | 'experimental' | 'private' | 'dev'

type CaseStudy = {
  number: string
  project: string
  category: string
  status: string
  tone: StatusTone
  question: string
  outcome: string
  learned: string
  proof: string[]
  quote?: { text: string; source: string }
  stack: string[]
  demo?: string
  source?: string
  visual: string
  preview: 'marketplace' | 'archive' | 'flight' | 'vault' | 'terminal' | 'studio' | 'hierarchy'
}

const caseStudies: CaseStudy[] = [
  {
    number: '01',
    project: 'CheapFlix Nepal',
    category: 'WEB / BACKEND',
    status: 'BUILDING',
    tone: 'building',
    question: 'Can booking a plumber feel as easy as ordering food?',
    outcome: 'A live service marketplace serving Kathmandu, Pokhara & Lalitpur — search, compare profiles, book a time, chat live, pay and review.',
    learned: 'Marketplace trust is UI: clear pricing + real reviews + a 2-minute path from search to booking.',
    proof: ['2,400+ verified providers', '18,000+ jobs completed', '4.8★ average rating'],
    quote: { text: 'Got a repair technician at my door in under 45 minutes. Unbelievable service.', source: 'Priya K. — AC Repair, Kathmandu' },
    stack: ['Node.js', 'Express', 'MySQL', 'Prisma'],
    demo: 'https://cheapflixnepal.live/',
    visual: 'cheapflix',
    preview: 'marketplace',
  },
  {
    number: '03',
    project: 'Poetry Platform',
    category: 'CREATIVE / WEB',
    status: 'IN DEVELOPMENT',
    tone: 'dev',
    question: 'What if a website gave words room to breathe?',
    outcome: 'Diya Subedi’s bilingual home for poems in Nepali and English — searchable by language, mood and year, with reading videos and a 23-moment visual diary.',
    learned: 'Restraint is a feature. The best publishing interface gets out of the poem’s way.',
    proof: ['EN + NE bilingual archive', 'Search by mood / year', '23-moment gallery'],
    quote: { text: 'My words were never meant to impress. They were meant to find someone who needed them.', source: 'Diya Subedi — diyasubedi.com.np' },
    stack: ['Web', 'Publishing', 'Design'],
    demo: 'https://diyasubedi.com.np/',
    visual: 'poetry',
    preview: 'archive',
  },
  {
    number: '07',
    project: 'Ironman Vision Suite',
    category: 'PYTHON / VISION',
    status: 'IN DEVELOPMENT',
    tone: 'dev',
    question: 'What if one webcam became twenty instruments?',
    outcome: 'A modular Python 3.12 app: OpenCV + MediaPipe hand-tracking driving 20 gesture modes — air painter, virtual mouse, RPS vs AI, volume / brightness by finger, face filters, HUD telemetry and more.',
    learned: 'One solid tracking pipeline beats twenty demos. Build the pipeline, the playground follows.',
    proof: ['20 gesture modes', '★ 2 on GitHub', 'Keys 1–0 · F1–F10 · S capture'],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Tkinter'],
    source: 'https://github.com/arpan085/ironman',
    visual: 'ironman',
    preview: 'terminal',
  },
  {
    number: '08',
    project: 'NEPSE AI Analyzer',
    category: 'AI / FINANCE',
    status: 'IN DEVELOPMENT',
    tone: 'experimental',
    question: 'Can NEPSE research stop living in spreadsheets and rumors?',
    outcome: 'An enterprise-style quant + ML + multi-AI stack for the Nepal Stock Exchange — backend, frontend and docker-compose, designed around real investment workflows.',
    learned: 'Good finance tooling combines three things: data, analysis, and a next action.',
    proof: ['Quant + ML + multi-AI', 'Backend + frontend + Docker', 'NEPSE-native workflows'],
    stack: ['Python', 'Machine learning', 'Quant'],
    source: 'https://github.com/arpan085/NEPSE',
    visual: 'nepse',
    preview: 'terminal',
  },
  {
    number: '04',
    project: 'How Aeroplane Works',
    category: 'WEB / EDUCATION',
    status: 'LIVE',
    tone: 'live',
    question: 'How do you teach a machine with 6 million parts?',
    outcome: 'An interactive explainer that breaks flight into clear visual moments you explore at your own pace — curiosity first, textbook second.',
    learned: 'Complex machines need moments, not manuals.',
    proof: ['Self-paced chapters', 'Animation-led', 'Live on Vercel'],
    stack: ['Interactive UI', 'Animation', 'Education'],
    demo: 'https://aeroplane-blond.vercel.app/',
    visual: 'aeroplane',
    preview: 'flight',
  },
  {
    number: '02',
    project: 'Nepal Admin Intelligence',
    category: 'PYTHON / DATA',
    status: 'EXPERIMENTAL',
    tone: 'experimental',
    question: 'Who governs where — and can an API just answer it?',
    outcome: 'A data-oriented API over Nepal’s province → district → municipality hierarchy, with pipelines that keep structure and access from drifting apart.',
    learned: 'Structure first, interface second. If the hierarchy is clean, every UI gets easier.',
    proof: ['Province → district → local', 'REST + pipelines', 'Live on Netlify'],
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    demo: 'https://nepalinfo.netlify.app/',
    visual: 'nepal-info',
    preview: 'hierarchy',
  },
  {
    number: '05',
    project: 'Private Couple Gallery',
    category: 'FULL STACK / PRIVATE',
    status: 'PRIVATE',
    tone: 'private',
    question: 'Where do memories live when they must never leak?',
    outcome: 'An authenticated archive for exactly two people — server-side auth, private media delivery, albums, stories, search and recovery controls. The repo itself 404s: that’s the point.',
    learned: 'Privacy is architecture, not a toggle. Frontend-only protection is theater.',
    proof: ['2 authorized users', 'Server-side auth', 'Albums · stories · recovery'],
    stack: ['React', 'FastAPI', 'PostgreSQL'],
    visual: 'gallery',
    preview: 'vault',
  },
  {
    number: '06',
    project: 'Kynvera',
    category: 'WEB / STUDIO',
    status: 'LIVE',
    tone: 'live',
    question: 'Can a studio site grow up in public?',
    outcome: 'This site — a project-led index of 8 builds, a brand system, and working notes. Shipped early, revised in the open.',
    learned: 'Ship the index before it’s finished. A living site beats a perfect launch.',
    proof: ['8 projects indexed', 'Brand + tokens shipped', 'Notes in public'],
    stack: ['React', 'TypeScript', 'Vite'],
    demo: 'https://kynvera.vercel.app/',
    visual: 'kynvera',
    preview: 'studio',
  },
]

function Preview({ study }: { study: CaseStudy }) {
  if (study.preview === 'marketplace') {
    return (
      <div className="cs-browser" aria-hidden="true">
        <div className="cs-chrome"><i /><i /><i /><span>cheapflixnepal.live</span><b>LIVE ●</b></div>
        <div className="cs-mkt-hero"><strong>Find trusted professionals near you, fast</strong><span>Electrician · Plumber · Tutor · Developer</span></div>
        <div className="cs-mkt-stats">{study.proof.map((p) => <span key={p}>{p}</span>)}</div>
        <div className="cs-mkt-steps"><span>Search</span><span>Choose</span><span>Book</span><span>Connect</span><span>Review</span></div>
      </div>
    )
  }
  if (study.preview === 'archive') {
    return (
      <div className="cs-browser" aria-hidden="true">
        <div className="cs-chrome"><i /><i /><i /><span>diyasubedi.com.np</span><b>LIVE ●</b></div>
        <div className="cs-quote">“My words were never meant to impress.”</div>
        <div className="cs-pills"><span>ENGLISH</span><span>नेपाली</span><span>BY MOOD</span><span>BY YEAR</span></div>
        <div className="cs-shelf">{[1, 2, 3, 4].map((n) => <span key={n} />)}</div>
      </div>
    )
  }
  if (study.preview === 'flight') {
    return (
      <div className="cs-browser cs-flight" aria-hidden="true">
        <div className="cs-chrome"><i /><i /><i /><span>aeroplane-blond.vercel.app</span><b>LIVE ●</b></div>
        <svg viewBox="0 0 400 130" className="cs-path">
          <path d="M10 110 Q 130 20 210 70 T 390 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
          <circle cx="10" cy="110" r="4" fill="currentColor" />
          <circle cx="210" cy="70" r="4" fill="currentColor" />
          <circle cx="390" cy="40" r="4" fill="currentColor" />
        </svg>
        <div className="cs-mkt-steps"><span>LIFT</span><span>THRUST</span><span>DRAG</span><span>CONTROL</span></div>
      </div>
    )
  }
  if (study.preview === 'vault') {
    return (
      <div className="cs-browser cs-vault" aria-hidden="true">
        <div className="cs-chrome"><i /><i /><i /><span>private · 404 on purpose</span><b>🔒</b></div>
        <div className="cs-rings"><span /><span /><b>2</b></div>
        <div className="cs-checks"><span>✓ server-side auth</span><span>✓ private media</span><span>✓ recovery controls</span></div>
      </div>
    )
  }
  if (study.preview === 'hierarchy') {
    return (
      <div className="cs-browser cs-term" aria-hidden="true">
        <div className="cs-chrome"><i /><i /><i /><span>nepalinfo.netlify.app</span><b>LIVE ●</b></div>
        <pre>{`GET /api/v1/provinces        → 7\nGET /api/v1/districts        → 77\nGET /api/v1/municipalities   → 753\n$ psql ▸ structure ✓ access ✓`}</pre>
      </div>
    )
  }
  if (study.preview === 'studio') {
    return (
      <div className="cs-browser" aria-hidden="true">
        <div className="cs-chrome"><i /><i /><i /><span>kynvera.vercel.app</span><b>LIVE ●</b></div>
        <div className="cs-index">
          <span><b>001</b> CheapFlix — marketplace</span>
          <span><b>007</b> Ironman — 20 vision modes</span>
          <span><b>008</b> NEPSE — quant + AI</span>
        </div>
      </div>
    )
  }
  // terminal (ironman / nepse)
  const isIron = study.visual === 'ironman'
  return (
    <div className="cs-browser cs-term" aria-hidden="true">
      <div className="cs-chrome"><i /><i /><i /><span>{isIron ? 'gesture_vision · main.py' : 'nepse · docker-compose'}</span><b>{isIron ? '★ 2' : '★ 1'}</b></div>
      <pre>{isIron
        ? `$ python3 -m gesture_vision.main\n✓ hand tracker … 60 fps\n✓ 20 modes loaded\n  air_painter · rps_ai · hud\n  virtual_mouse · face_filter\nkeys 1–0 · F1–F10 · S ⏺`
        : `$ docker compose up\n✓ backend   :8000\n✓ frontend  :3000\n✓ quant + ml + multi-ai\n  NEPSE-native workflows`}</pre>
    </div>
  )
}

export default function CaseStudiesSection() {
  const [active, setActive] = useState(0)
  const study = caseStudies[active]

  return (
    <section className="py-20 sm:py-28" id="case-studies">
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10" data-reveal>
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
              <span className="w-5 h-[1.5px] bg-neutral-400 block" />CASE STUDIES
            </span>
            <h2 className="cs-title">Field notes,<br />not brochures.</h2>
          </div>
          <p className="max-w-xs text-neutral-500 text-[15px] leading-relaxed">
            Eight builds, each with a real artifact. Pick one — the preview is drawn from the actual site, repo, or terminal.
          </p>
        </div>

        <div className="cs-rail" role="tablist" aria-label="Case studies" data-reveal>
          {caseStudies.map((item, index) => (
            <button
              key={item.number}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`cs-tab ${active === index ? 'is-active' : ''}`}
            >
              <span className="cs-tab-num">{item.number}</span>
              <span className="cs-tab-name">{item.project}</span>
              <span className={`cs-dot cs-dot-${item.tone}`} />
            </button>
          ))}
        </div>

        <article className="cs-card" data-reveal key={study.number} aria-live="polite">
          <div className="cs-preview">
            <Preview study={study} />
            <img className="cs-seal" src={`/assets/projects/${study.visual === 'cheapflix' ? 'cheapflix.png' : `${study.visual}.svg`}`} alt="" aria-hidden="true" />
          </div>
          <div className="cs-body">
            <div className="cs-meta"><span>{study.number} / {study.category}</span><span className={`cs-status cs-status-${study.tone}`}>{study.status}</span></div>
            <h3>{study.question}</h3>
            <p className="cs-outcome">{study.outcome}</p>
            <div className="cs-proof">{study.proof.map((p) => <span key={p}>{p}</span>)}</div>
            {study.quote && <blockquote className="cs-quote-block">“{study.quote.text}”<cite>— {study.quote.source}</cite></blockquote>}
            <p className="cs-learned"><b>What it taught us — </b>{study.learned}</p>
            <div className="cs-tags">{study.stack.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="cs-links">
              {study.demo && <a href={study.demo} target="_blank" rel="noreferrer">Open live site ↗</a>}
              {study.source && <a href={study.source} target="_blank" rel="noreferrer">View source ↗</a>}
              {!study.demo && !study.source && <span className="cs-private-note">Private by design — no public link.</span>}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
