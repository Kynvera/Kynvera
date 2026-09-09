import { useState } from 'react'

export type Article = {
  id: string
  number: string
  title: string
  summary: string
  category: string
  status: string
  body: string
}

export const articles: Article[] = [
  { id: 'ideas-into-reality', number: '01', title: 'From an idea to a useful first version', summary: 'A working note on giving an incomplete idea enough structure to build.', category: 'METHOD', status: 'DRAFT NOTE', body: 'An idea does not need a perfect brief before it can become an experiment. The useful first move is to name the problem, choose a small direction, and make the next version visible.' },
  { id: 'administrative-data', number: '02', title: 'Making a hierarchy easier to explore', summary: 'Questions behind the Nepal administrative intelligence system.', category: 'DATA / API', status: 'DRAFT NOTE', body: 'Administrative information becomes difficult when structure and access drift apart. This project explores a data-oriented API for making a complex hierarchy easier to work with.' },
  { id: 'service-booking', number: '03', title: 'Designing a clearer path to a service request', summary: 'The product question inside CheapFlix Nepal.', category: 'WEB / BACKEND', status: 'DRAFT NOTE', body: 'A service-booking experience has one essential responsibility: help someone move from discovery to a confident request. The platform is being shaped around that path.' },
  { id: 'creative-systems', number: '04', title: 'When a publishing system should make room', summary: 'Notes on building a digital home for poetry and creative work.', category: 'CREATIVE / WEB', status: 'DRAFT NOTE', body: 'Creative work does not always need more interface. A publishing system can be useful by giving the words room to breathe and keeping presentation close to the personality of the work.' },
  { id: 'the-visible-loop', number: '05', title: 'Build, break, learn, build again', summary: 'Why the process stays visible at Kynvera.', category: 'PROCESS', status: 'DRAFT NOTE', body: 'There is no straight line from an idea to something real. Discover, explore, build, test, and release is a loop for learning, not a promise that every experiment becomes a product.' },
]

export default function BlogSection() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="blog-section section-wrap" id="notes">
      <div className="section-heading" data-reveal><div><div className="section-label"><span>15</span>THE NOTES</div><h2>Thinking in public.</h2></div><p>Short working notes from the questions, systems, and experiments behind the work.</p></div>
      <div className="blog-list">{articles.map((article) => <article className={`blog-entry ${selected === article.id ? 'expanded' : ''}`} key={article.id} data-reveal>
        <button type="button" onClick={() => setSelected(selected === article.id ? null : article.id)} aria-expanded={selected === article.id}>
          <span className="blog-entry-number">{article.number}</span><span className="blog-entry-main"><strong>{article.title}</strong><small>{article.summary}</small></span><span className="blog-entry-meta"><span>{article.category}</span><span>{selected === article.id ? 'CLOSE' : 'OPEN'}</span></span>
        </button>
        {selected === article.id && <div className="blog-entry-body"><span>{article.status}</span><p>{article.body}</p></div>}
      </article>)}</div>
    </section>
  )
}
