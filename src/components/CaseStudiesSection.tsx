import { useState, type CSSProperties } from 'react'

type CaseStudy = {
  number: string
  project: string
  category: string
  question: string
  direction: string
  currentState: string
  technologies: string[]
}

const caseStudies: CaseStudy[] = [
  { number: '01', project: 'CheapFlix Nepal', category: 'WEB / BACKEND', question: 'How can service booking feel clear from discovery to request?', direction: 'A structured platform keeps service information, requests, and backend logic in one place.', currentState: 'Building', technologies: ['Node.js', 'Express', 'MySQL', 'Prisma'] },
  { number: '02', project: 'Nepal Administrative Intelligence System', category: 'PYTHON / DATA / API', question: 'How can a complex administrative hierarchy become easier to explore?', direction: 'A data-oriented API gives the hierarchy a clearer structure and a more useful access layer.', currentState: 'Experimental', technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy'] },
  { number: '03', project: 'Creative / Poetry Platform', category: 'CREATIVE / WEB', question: 'How can digital publishing give creative work room to breathe?', direction: 'A calm publishing experience centers reading, presentation, and the personality of the work.', currentState: 'In development', technologies: ['Web', 'Publishing', 'Design'] },
  { number: '04', project: 'How Aeroplane Works', category: 'WEB / EDUCATION', question: 'How can a complex machine become something people can explore with curiosity?', direction: 'An interactive learning experience that breaks the fundamentals of flight into clear visual moments.', currentState: 'Live', technologies: ['Interactive UI', 'Education', 'Animation'] },
  { number: '05', project: 'Private Couple Gallery', category: 'PRIVATE / FULL STACK', question: 'How can personal memories stay genuinely private while still feeling easy to revisit?', direction: 'A protected shared archive with authenticated access, private media delivery, albums, stories, and recovery controls.', currentState: 'Private', technologies: ['React', 'FastAPI', 'PostgreSQL', 'Private storage'] },
  { number: '06', project: 'Kynvera', category: 'WEB / STUDIO', question: 'How can a studio site evolve alongside the work it is trying to share?', direction: 'A project-led home that makes the process, people, and experiments visible as they develop.', currentState: 'Live', technologies: ['React', 'TypeScript', 'Vite'] },
  { number: '07', project: 'Ironman Gesture Vision Suite', category: 'PYTHON / COMPUTER VISION', question: 'How can hand tracking become a flexible creative system instead of a single demo?', direction: 'A modular suite of gesture-controlled modes for drawing, games, controls, filters, effects, recording, and HUD utilities.', currentState: 'In development', technologies: ['Python', 'OpenCV', 'MediaPipe', 'Tkinter'] },
  { number: '08', project: 'NEPSE AI Analyzer', category: 'AI / FINANCE', question: 'How can Nepal Stock Exchange research become more structured and useful?', direction: 'An evolving quantitative and multi-AI research platform designed around NEPSE intelligence workflows.', currentState: 'In development', technologies: ['Python', 'Machine learning', 'Quantitative analysis'] },
]

export default function CaseStudiesSection() {
  const [selected, setSelected] = useState(0)
  const study = caseStudies[selected]

  return (
    <section className="py-20 sm:py-28" id="case-studies">
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12" data-reveal>
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] text-neutral-400 tracking-wide mb-3">
              <span className="w-5 h-[1.5px] bg-neutral-400 block" />CASE STUDIES
            </span>
            <h2 className="text-[clamp(28px,4vw,48px)] leading-none tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Why these things exist</h2>
          </div>
          <p className="max-w-xs text-neutral-500 text-[15px] leading-relaxed">Projects are not just outputs. They are questions made concrete.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] border border-neutral-800 rounded-xl overflow-hidden" data-reveal>
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-r border-neutral-800 bg-neutral-950" aria-label="Case studies">
            {caseStudies.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={`text-left p-5 min-w-[200px] lg:min-w-0 border-r lg:border-r-0 lg:border-b border-neutral-800 last:border-r-0 last:border-b-0 transition-colors ${selected === index ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50'}`}
                onClick={() => setSelected(index)}
              >
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider">{item.number}</span>
                <strong className="block text-[15px] mt-1 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{item.project}</strong>
                <small className="block text-[11px] font-mono text-neutral-600 tracking-wider mt-1">{item.category}</small>
              </button>
            ))}
          </nav>
          <article className="p-6 sm:p-10 bg-[#0a0a0a]" aria-live="polite">
            <div className="flex justify-between gap-4 text-[10px] font-mono text-neutral-500 tracking-wider">
              <span>{study.category}</span>
              <span>{study.currentState}</span>
            </div>
            <h3 className="text-[clamp(24px,3vw,40px)] leading-tight tracking-tight mt-10 mb-8 max-w-[500px]" style={{ fontFamily: 'var(--font-heading)' }}>{study.question}</h3>
            <div className="border-t border-neutral-800 pt-4 max-w-md">
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider">THE DIRECTION</span>
              <p className="text-neutral-500 text-[15px] leading-relaxed mt-2">{study.direction}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-6">
              {study.technologies.map((tech) => (
                <span key={tech} className="px-2.5 py-1 border border-neutral-800 rounded-md text-[11px] text-neutral-500">{tech}</span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-12 relative" aria-label="Project progress stages">
              <div className="absolute left-0 right-0 top-[2px] h-[2px] bg-neutral-800 rounded">
                <span className="absolute top-[-3px] left-0 w-2 h-2 bg-white rounded-full" />
                <i className="absolute top-[-3px] w-2 h-2 bg-white rounded-full transition-[left] duration-700" style={{ left: `${(selected + 1) * 25}%` } as CSSProperties} />
              </div>
              {['IDEA', 'BUILD', 'TEST', 'RELEASE'].map((stage, index) => (
                <span key={stage} className={`pt-4 text-[10px] font-mono tracking-wider ${index <= selected ? 'text-white' : 'text-neutral-600'}`}>
                  <span className={`block w-1.5 h-1.5 rounded-full mb-2 ${index <= selected ? 'bg-white' : 'bg-neutral-700'}`} />
                  {stage}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
