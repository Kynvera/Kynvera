type RelatedProject = {
  index: string
  name: string
  category: string
  description: string
}

export default function RelatedProjects({ current, projects, onSelect }: { current: RelatedProject; projects: RelatedProject[]; onSelect: (project: RelatedProject) => void }) {
  const related = projects.filter((project) => project.index !== current.index)
  return <div className="related-projects"><span className="modal-label">CONTINUE EXPLORING</span><div className="related-project-list">{related.map((project) => <button type="button" key={project.index} onClick={() => onSelect(project)}><span>{project.index} / {project.category}</span><strong>{project.name}</strong><small>{project.description}</small><b aria-hidden="true">↗</b></button>)}</div></div>
}
