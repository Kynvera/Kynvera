import { useCallback, useState, type KeyboardEvent, type ReactNode } from 'react'

/* Kept stable — App.tsx builds the search index from these tuples. */
export const process = [
  ['01', 'Discover', 'Find the problem.', 'Start with the question before choosing the tool.'],
  ['02', 'Explore', 'Research possible solutions.', 'Make the possible directions visible and test their shape.'],
  ['03', 'Build', 'Turn the idea into a working system.', 'Choose a useful first version and give it structure.'],
  ['04', 'Test', 'Break it, improve it, repeat.', 'Look closely at what fails, then let that change the next version.'],
  ['05', 'Release', 'Share the result.', 'Put the work where it can be used, read, or learned from.'],
] as const

type Stage = {
  time: string
  delivers: string
  doneWhen: string
  proof: { label: string; href?: string }
  icon: 'compass' | 'routes' | 'layers' | 'flask' | 'signal'
}

const stages: Stage[] = [
  {
    time: 'Days 1–3',
    delivers: 'A one-page brief: the problem, who it’s for, and how we’ll know it worked.',
    doneWhen: 'We can say what we won’t build.',
    proof: { label: 'Seen in: CheapFlix Nepal — a booking path, not a feature list', href: 'https://cheapflixnepal.live/' },
    icon: 'compass',
  },
  {
    time: 'Week 1–2',
    delivers: 'Two or three directions as a clickable prototype or a technical spike.',
    doneWhen: 'One direction survives contact with reality.',
    proof: { label: 'Seen in: Nepal Admin Intelligence — structure before interface', href: 'https://nepalinfo.netlify.app/' },
    icon: 'routes',
  },
  {
    time: 'Weeks 2–6',
    delivers: 'A useful first version on staging, demoed weekly — never a slide deck.',
    doneWhen: 'Someone outside the studio can use it end to end.',
    proof: { label: 'Seen in: Poetry Platform — reading first, chrome second', href: 'https://diyasubedi.com.np/' },
    icon: 'layers',
  },
  {
    time: 'Ongoing',
    delivers: 'A friction log: what broke, what we changed, and the capture to prove it.',
    doneWhen: 'Failures visibly change the next version.',
    proof: { label: 'Seen in: Ironman Suite — 20 modes, one pipeline', href: 'https://github.com/arpan085/ironman' },
    icon: 'flask',
  },
  {
    time: 'Week 1 + handover',
    delivers: 'A live URL, a handover note, and public notes your team can read alone.',
    doneWhen: 'Strangers can use it without us in the room.',
    proof: { label: 'Seen in: Kynvera — shipped early, revised in the open', href: 'https://kynvera.vercel.app/' },
    icon: 'signal',
  },
]

const ICONS: Record<Stage['icon'], ReactNode> = {
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  routes: <><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h3.8" /></>,
  layers: <><path d="m12 3.5 8.5 4.5L12 12.5 3.5 8Z" /><path d="m3.5 12 8.5 4.5L20.5 12" /><path d="m3.5 16 8.5 4.5 8.5-4.5" /></>,
  flask: <><path d="M9.5 3h5" /><path d="M10 3v5.2L4.8 17a2.4 2.4 0 0 0 2.1 3.5h10.2a2.4 2.4 0 0 0 2.1-3.5L14 8.2V3" /><path d="M7.5 14.5h9" /></>,
  signal: <><circle cx="12" cy="12" r="1.6" /><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8" /></>,
}

/* Orbit geometry: 5 nodes around a 320-viewBox ring, starting at top. */
const CENTER = 160
const RADIUS = 116
const NODES = process.map((_, i) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
})
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ProcessSection() {
  const [selected, setSelected] = useState(2)
  const [number, title, essence, detail] = process[selected]
  const stage = stages[selected]

  const step = useCallback(
    (direction: 1 | -1) => setSelected((current) => (current + direction + process.length) % process.length),
    [],
  )

  const onOrbitKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); step(1) }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); step(-1) }
  }

  return (
    <section className="process-section section-wrap" id="process" data-reveal>
      <div className="section-label"><span>06</span>THE METHOD</div>
      <div className="method-intro">
        <h2>The loop,<br />kept visible.</h2>
        <div>
          <p>Progress rarely happens in a straight line. Every engagement runs the same five stages — and any stage can send the work back a step. That’s not failure. That’s the method.</p>
          <p className="method-honest">Two people, honest ranges, tangible exits. No black box, no “trust the process” hand-waving.</p>
        </div>
      </div>

      <div className="method-grid">
        {/* ── Orbit ── */}
        <div className="method-orbit" onKeyDown={onOrbitKey} role="group" aria-label="Kynvera process loop. Use arrow keys to move between stages.">
          <svg viewBox="0 0 320 320" className="method-ring" aria-hidden="true">
            <circle cx={CENTER} cy={CENTER} r={RADIUS} className="method-track" />
            <circle
              cx={CENTER} cy={CENTER} r={RADIUS} className="method-arc"
              strokeDasharray={`${((selected + 1) / process.length) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            />
          </svg>
          {process.map(([n, t], i) => (
            <button
              key={n}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              aria-label={`Stage ${n}: ${t}`}
              className={`method-node ${selected === i ? 'is-active' : ''} ${i < selected ? 'is-done' : ''}`}
              style={{ left: `${(NODES[i].x / 320) * 100}%`, top: `${(NODES[i].y / 320) * 100}%` }}
            >
              <span className="method-node-num">{n}</span>
            </button>
          ))}
          <div className="method-core" aria-hidden="true">
            <span>KYNVERA LOOP</span>
            <strong>{number}</strong>
            <em>{title}</em>
          </div>
        </div>

        {/* ── Detail ── */}
        <article className="method-detail" aria-live="polite" aria-label={`Stage ${number}: ${title}`}>
          <div className="method-detail-top">
            <span>{number} / {title.toUpperCase()}</span>
            <span className="method-step-count">{selected + 1} OF 5</span>
          </div>
          <h3>{essence}</h3>
          <p className="method-detail-copy">{detail}</p>

          <dl className="method-facts">
            <div><dt>TIME</dt><dd>{stage.time}</dd></div>
            <div><dt>YOU RECEIVE</dt><dd>{stage.delivers}</dd></div>
            <div><dt>DONE WHEN</dt><dd>{stage.doneWhen}</dd></div>
          </dl>

          <div className="method-proof">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[stage.icon]}
            </svg>
            {stage.proof.href ? <a href={stage.proof.href} target="_blank" rel="noreferrer">{stage.proof.label} ↗</a> : <span>{stage.proof.label}</span>}
          </div>

          <div className="method-nav">
            <button type="button" onClick={() => step(-1)} aria-label="Previous stage">← <span>Prev</span></button>
            <div className="method-dots" role="presentation">
              {process.map(([n], i) => <i key={n} className={i === selected ? 'is-on' : i < selected ? 'is-past' : ''} />)}
            </div>
            <button type="button" onClick={() => step(1)} aria-label="Next stage"><span>Next</span> →</button>
          </div>
        </article>
      </div>

      {/* ── Strip: all five at a glance ── */}
      <ol className="method-strip">
        {process.map(([n, t, e], i) => (
          <li key={n}>
            <button type="button" onClick={() => setSelected(i)} className={selected === i ? 'is-active' : ''} aria-current={selected === i ? 'true' : undefined}>
              <span>{n}</span><strong>{t}</strong><small>{e}</small>
            </button>
          </li>
        ))}
      </ol>

      <div className="method-cta" data-reveal>
        <p>If the loop fits your problem, the next step is a conversation — not a proposal.</p>
        <a href="#contact">Start a conversation ↗</a>
      </div>
    </section>
  )
}
