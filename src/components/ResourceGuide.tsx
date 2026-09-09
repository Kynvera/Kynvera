import { useState } from 'react'

export default function ResourceGuide() {
  const [shareStatus, setShareStatus] = useState('')

  const shareGuide = async () => {
    const shareData = { title: 'Kynvera Field Guide', text: 'Ideas into digital reality.', url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareStatus('Shared')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareStatus('Link copied')
      }
    } catch {
      setShareStatus('Share cancelled')
    }
    window.setTimeout(() => setShareStatus(''), 2200)
  }

  return (
    <section className="resource-guide section-wrap" id="guide" data-reveal>
      <div className="resource-guide-header"><div><div className="section-label"><span>17</span>THE FIELD GUIDE</div><h2>Ideas into<br /><em>digital reality.</em></h2></div><div className="resource-actions"><button className="button button-outline" type="button" onClick={shareGuide}>Share guide <span className="arrow" aria-hidden="true">↗</span></button><button className="button button-outline resource-print" type="button" onClick={() => window.print()}>Print / save as PDF <span className="arrow" aria-hidden="true">↗</span></button><span className="resource-share-status" role="status" aria-live="polite">{shareStatus}</span></div></div>
      <div className="resource-guide-body"><p className="resource-lede">A compact guide to the Kynvera way of working: start with a question, build a useful version, and keep learning visible.</p><div className="resource-columns"><div><span>01 / START</span><h3>Find the problem.</h3><p>Ideas begin incomplete. Name the question before choosing the tool.</p></div><div><span>02 / SHAPE</span><h3>Explore the direction.</h3><p>Research possible solutions and make the tradeoffs visible.</p></div><div><span>03 / MAKE</span><h3>Build a version.</h3><p>Turn the idea into a working system that can be tested in the real world.</p></div><div><span>04 / LEARN</span><h3>Break and improve.</h3><p>Use what fails to decide what the next version should become.</p></div></div><div className="resource-footer"><span>KYNVERA / 2026</span><span>COMPLEX IDEAS. SIMPLE INTERFACES.</span></div></div>
    </section>
  )
}
