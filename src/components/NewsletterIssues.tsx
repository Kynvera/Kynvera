import { useState } from 'react'

type NewsletterIssue = {
  number: string
  title: string
  summary: string
  sections: string[]
}

const issues: NewsletterIssue[] = [
  { number: '001', title: 'An idea needs a next version', summary: 'An introduction to Kynvera and the practice behind the work.', sections: ['Why Kynvera exists', 'The IDEA / EXPLORE / BUILD / TEST / RELEASE loop', 'A look at the current project index'] },
  { number: '002', title: 'Questions made concrete', summary: 'A dispatch about turning service booking, administrative data, and creative publishing into working directions.', sections: ['CheapFlix Nepal and the path from discovery to request', 'The Nepal administrative hierarchy as an API question', 'Why a poetry platform should give words room'] },
]

export default function NewsletterIssues() {
  const [openIssue, setOpenIssue] = useState<string | null>(null)

  return (
    <section className="newsletter-issues section-wrap" id="dispatches">
      <div className="section-heading" data-reveal><div><div className="section-label"><span>16</span>THE DISPATCH</div><h2>Two notes to begin.</h2></div><p>These are prepared issue outlines, not published claims. The newsletter becomes live when a publication destination is configured.</p></div>
      <div className="newsletter-issue-list">{issues.map((issue) => <article className={`newsletter-issue ${openIssue === issue.number ? 'open' : ''}`} key={issue.number} data-reveal>
        <button type="button" onClick={() => setOpenIssue(openIssue === issue.number ? null : issue.number)} aria-expanded={openIssue === issue.number}><span>ISSUE / {issue.number}</span><strong>{issue.title}</strong><small>{issue.summary}</small><em>{openIssue === issue.number ? 'CLOSE' : 'READ OUTLINE'} <b aria-hidden="true">↗</b></em></button>
        {openIssue === issue.number && <div className="newsletter-issue-detail"><span>DRAFT OUTLINE</span><ul>{issue.sections.map((section) => <li key={section}>{section}</li>)}</ul></div>}
      </article>)}</div>
    </section>
  )
}
