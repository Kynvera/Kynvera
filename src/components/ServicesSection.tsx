import { useState } from 'react'

type Service = {
  number: string
  name: string
  description: string
  price: string
  timeline: string
  includes: string[]
  example: string
}

const services: Service[] = [
  { number: '01', name: 'Custom Software Development', description: 'Purpose-built systems for real operational problems.', price: '$5,000 - $15,000', timeline: '4 - 12 weeks', includes: ['Discovery and technical direction', 'Interface and system design', 'Implementation and testing', 'Deployment guidance'], example: 'CheapFlix Nepal' },
  { number: '02', name: 'AI / ML Consulting & Development', description: 'Practical experiments and intelligent tools grounded in useful data.', price: '$2,000 - $5,000', timeline: '1 - 4 weeks', includes: ['Problem and data analysis', 'Prototype or model evaluation', 'Recommendations and documentation', 'Next-step roadmap'], example: 'Predictive models or NLP systems' },
  { number: '03', name: 'Front-End / UI Development', description: 'Fast, responsive interfaces that give complex products a clear shape.', price: '$3,000 - $8,000', timeline: '2 - 6 weeks', includes: ['Responsive implementation', 'Component and interaction work', 'Accessibility-minded structure', 'Browser and device testing'], example: 'Web apps and dashboards' },
  { number: '04', name: 'Workshops & Training', description: 'Hands-on sessions that turn concepts into working confidence.', price: '$1,000 - $3,000', timeline: '1 - 2 days', includes: ['Session planning', 'Live hands-on teaching', 'Practical exercises and materials', 'Follow-up support'], example: 'React or Python automation' },
  { number: '05', name: 'Code Audit & Optimization', description: 'A clear view of technical debt, performance, and the next useful improvements.', price: '$1,500 - $3,000', timeline: '1 - 2 weeks', includes: ['Codebase and architecture review', 'Performance investigation', 'Prioritized recommendations', 'Refactoring direction'], example: 'Performance and tech debt review' },
  { number: '06', name: 'Open-Source Support', description: 'Ongoing technical attention for projects built in public.', price: '$500 - $2,000 / year', timeline: 'Ongoing', includes: ['Priority issue review', 'Feature prioritization', 'Bug-fix support', 'Release and maintenance guidance'], example: 'Library support and bug fixes' },
]

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const chooseService = (serviceName: string) => {
    window.dispatchEvent(new CustomEvent('kynvera-service-select', { detail: serviceName }))
  }

  return (
    <section className="services-section section-wrap" id="services">
      <div className="section-heading" data-reveal><div><div className="section-label"><span>12</span>THE COLLABORATION</div><h2>How we work together</h2></div><p>Different starting points. A clear path from the first conversation to something useful.</p></div>
      <div className="service-grid">
        {services.map((service) => <article className="service-card" key={service.number} data-reveal>
          <div className="service-card-top"><span>{service.number}</span><span>{service.timeline}</span></div>
          <h3>{service.name}</h3>
          <p className="service-description">{service.description}</p>
          <div className="service-price"><span>STARTING RANGE</span><strong>{service.price}</strong></div>
          <button className="service-details" type="button" onClick={() => setExpanded(expanded === service.number ? null : service.number)} aria-expanded={expanded === service.number}>{expanded === service.number ? 'Hide details' : 'View details'} <span aria-hidden="true">{expanded === service.number ? '−' : '+'}</span></button>
          {expanded === service.number && <div className="service-expanded"><span>INCLUDES</span><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul><span>EXAMPLE</span><p>{service.example}</p></div>}
          <a className="service-cta" href="#contact" onClick={() => chooseService(service.name)}>Discuss this service <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
      <div className="pricing-note" data-reveal><div><span className="section-label"><span>13</span>THE APPROACH</span><h3>Every project is specific.</h3></div><p>These ranges create a useful starting point, not a promise made without context. We scope around the problem, the people using the system, and the version worth building first.</p><a className="button button-primary" href="#contact">Get a quote <span className="arrow" aria-hidden="true">↗</span></a></div>
    </section>
  )
}
