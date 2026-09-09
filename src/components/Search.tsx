import { useEffect, useMemo, useState } from 'react'
import lunr from 'lunr'

type SearchItem = {
  id: string
  name: string
  description: string
  type: string
  href: string
  tags?: string
}

export default function Search({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const index = useMemo(() => lunr(function () {
    this.ref('id')
    this.field('name')
    this.field('description')
    this.field('tags')
    items.forEach((item) => this.add(item))
  }), [items])

  const results = useMemo(() => {
    const normalized = query.trim()
    if (!normalized) return items.slice(0, 6)
    try {
      const terms = normalized.split(/\s+/).map((term) => `${term}*`).join(' ')
      const matches = index.search(terms).map((match) => items.find((item) => item.id === match.ref)).filter((item): item is SearchItem => Boolean(item))
      return matches.length > 0 ? matches : items.filter((item) => `${item.name} ${item.description} ${item.tags ?? ''}`.toLowerCase().includes(normalized.toLowerCase())).slice(0, 8)
    } catch {
      return []
    }
  }, [index, items, query])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => setActiveIndex(0), [query])

  const selectResult = (item: SearchItem) => {
    setOpen(false)
    setQuery('')
    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0)))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
    }
    if (event.key === 'Enter' && results[activeIndex]) selectResult(results[activeIndex])
  }

  return (
    <>
      <button className="search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Search the site"><span aria-hidden="true">⌕</span><span>Search</span><kbd>⌘K</kbd></button>
      {open && <div className="search-backdrop" role="presentation" onClick={() => setOpen(false)}><section className="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title" onClick={(event) => event.stopPropagation()}>
        <div className="search-heading"><span id="search-title">SEARCH / KYNVERA</span><button type="button" onClick={() => setOpen(false)} aria-label="Close search">ESC</button></div>
        <input className="search-input" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown} placeholder="Projects, capabilities, lab..." aria-label="Search projects, capabilities, and lab entries" />
        <div className="search-results" role="listbox" aria-label="Search results">{results.length > 0 ? results.map((item, index) => <button className={`search-result ${index === activeIndex ? 'active' : ''}`} type="button" key={item.id} onClick={() => selectResult(item)} role="option" aria-selected={index === activeIndex}><span className="search-result-type">{item.type}</span><span><strong>{item.name}</strong><small>{item.description}</small></span><span aria-hidden="true">↗</span></button>) : <p className="search-empty">No matching work found.</p>}</div>
        <div className="search-footer"><span>↑↓ navigate</span><span>ENTER select</span><span>ESC close</span></div>
      </section></div>}
    </>
  )
}
