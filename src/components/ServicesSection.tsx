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
  { number: '01', name: 'Custom Software Development', description: 'Purpose-built systems for real operational problems.', price: 'NPR 80,000 - 3,00,000', timeline: '4 - 12 weeks', includes: ['Discovery and technical direction', 'Interface and system design', 'Implementation and testing', 'Deployment guidance'], example: 'CheapFlix Nepal' },
  { number: '02', name: 'AI / ML Consulting & Development', description: 'Practical experiments and intelligent tools grounded in useful data.', price: 'NPR 35,000 - 1,25,000', timeline: '1 - 4 weeks', includes: ['Problem and data analysis', 'Prototype or model evaluation', 'Recommendations and documentation', 'Next-step roadmap'], example: 'Predictive models or NLP systems' },
  { number: '03', name: 'Front-End / UI Development', description: 'Fast, responsive interfaces that give complex products a clear shape.', price: 'NPR 45,000 - 1,75,000', timeline: '2 - 6 weeks', includes: ['Responsive implementation', 'Component and interaction work', 'Accessibility-minded structure', 'Browser and device testing'], example: 'Web apps and dashboards' },
  { number: '04', name: 'Workshops & Training', description: 'Hands-on sessions that turn concepts into working confidence.', price: 'NPR 12,000 - 40,000', timeline: '1 - 2 days', includes: ['Session planning', 'Live hands-on teaching', 'Practical exercises and materials', 'Follow-up support'], example: 'React or Python automation' },
  { number: '05', name: 'Code Audit & Optimization', description: 'A clear view of technical debt, performance, and the next useful improvements.', price: 'NPR 25,000 - 75,000', timeline: '1 - 2 weeks', includes: ['Codebase and architecture review', 'Performance investigation', 'Prioritized recommendations', 'Refactoring direction'], example: 'Performance and tech debt review' },
  { number: '06', name: 'Open-Source Support', description: 'Ongoing technical attention for projects built in public.', price: 'NPR 10,000 - 45,000 / year', timeline: 'Ongoing', includes: ['Priority issue review', 'Feature prioritization', 'Bug-fix support', 'Release and maintenance guidance'], example: 'Library support and bug fixes' },
]

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>('01')

  const chooseService = (serviceName: string) => {
    window.dispatchEvent(new CustomEvent('kynvera-service-select', { detail: serviceName }))
  }

  return (
    <section className="services-section section-wrap" id="services">
      <div className="collaboration-heading" data-reveal><div><div className="section-label"><span>12</span>THE COLLABORATION</div><h2>How we work<br /><em>together.</em></h2></div><div><p>Bring a clear problem, a half-formed idea, or a system that needs attention. We will find the useful next version with you.</p><a href="#contact">Start a conversation ↗</a></div></div>
      <div className="service-list" data-reveal>
        {services.map((service) => <article className={`service-row ${expanded === service.number ? 'is-open' : ''}`} key={service.number}>
          <button className="service-row-trigger" type="button" onClick={() => setExpanded(expanded === service.number ? null : service.number)} aria-expanded={expanded === service.number}>
            <span className="service-row-number">{service.number}</span><span className="service-row-name">{service.name}</span><span className="service-row-time">{service.timeline}</span><span className="service-row-toggle" aria-hidden="true">{expanded === service.number ? '−' : '+'}</span>
          </button>
          <div className="service-row-detail">
            <p>{service.description}</p>
            <div><span>WHAT'S INCLUDED</span><ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><span>STARTING RANGE</span><strong>{service.price}</strong><small>Example: {service.example}</small></div>
            <a href="#contact" onClick={() => chooseService(service.name)}>Discuss this <span aria-hidden="true">↗</span></a>
          </div>
        </article>)}
      </div>
      <div className="collaboration-note" data-reveal><span>13 / A SHARED PROCESS</span><p>Clear scope. Honest feedback. Work released when it is genuinely ready—not merely when it is finished.</p></div>
    </section>
  )
}
