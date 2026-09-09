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
]

export default function CaseStudiesSection() {
  const [selected, setSelected] = useState(0)
  const study = caseStudies[selected]

  return (
    <section className="case-studies-section section-wrap" id="case-studies">
      <div className="section-heading" data-reveal><div><div className="section-label"><span>14</span>THE WORK IN CONTEXT</div><h2>Why these things exist</h2></div><p>Projects are not just outputs. They are questions made concrete, one version at a time.</p></div>
      <div className="case-study-layout" data-reveal>
        <nav className="case-study-nav" aria-label="Case studies">{caseStudies.map((item, index) => <button className={selected === index ? 'selected' : ''} type="button" key={item.number} onClick={() => setSelected(index)}><span>{item.number}</span><strong>{item.project}</strong><small>{item.category}</small></button>)}</nav>
        <article className="case-study-detail" aria-live="polite">
          <div className="case-study-meta"><span>{study.category}</span><span>{study.currentState}</span></div>
          <h3>{study.question}</h3>
          <div className="case-study-direction"><span>THE DIRECTION</span><p>{study.direction}</p></div>
          <div className="case-study-tags">{study.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="case-study-rail" aria-label="Project progress stages"><span className="rail-line"><i style={{ '--rail-progress': `${(selected + 1) * 25}%` } as CSSProperties} /></span>{['IDEA', 'BUILD', 'TEST', 'RELEASE'].map((stage, index) => <span className={index <= selected ? 'reached' : ''} key={stage}>{stage}</span>)}</div>
        </article>
      </div>
    </section>
  )
}
