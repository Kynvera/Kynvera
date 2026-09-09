import { useState, type CSSProperties } from 'react'

export const process = [
  ['01', 'Discover', 'Find the problem.', 'Start with the question before choosing the tool.'],
  ['02', 'Explore', 'Research possible solutions.', 'Make the possible directions visible and test their shape.'],
  ['03', 'Build', 'Turn the idea into a working system.', 'Choose a useful first version and give it structure.'],
  ['04', 'Test', 'Break it, improve it, repeat.', 'Look closely at what fails, then let that change the next version.'],
  ['05', 'Release', 'Share the result.', 'Put the work where it can be used, read, or learned from.'],
] as const

export default function ProcessSection() {
  const [selected, setSelected] = useState(0)
  const [number, title, text, detail] = process[selected]

  return (
    <section className="process-section section-wrap" id="process" data-reveal>
      <div className="section-label"><span>06</span>THE METHOD</div>
      <div className="process-intro"><h2>How we work</h2><p>Progress rarely happens in a straight line. We keep the loop visible.</p></div>
      <div className="interactive-process">
        <div className="process-track" role="tablist" aria-label="Kynvera process stages">{process.map(([stepNumber, stepTitle], index) => <button className={`process-step ${selected === index ? 'selected' : ''}`} type="button" role="tab" aria-selected={selected === index} key={stepNumber} onClick={() => setSelected(index)}><span>{stepNumber}</span><div><h3>{stepTitle}</h3><p>{process[index][2]}</p></div></button>)}</div>
        <article className="process-detail" role="tabpanel"><span>{number} / {title}</span><h3>{text}</h3><p>{detail}</p><div className="process-detail-marker" style={{ '--process-position': `${selected * 25}%` } as CSSProperties} /></article>
      </div>
    </section>
  )
}
