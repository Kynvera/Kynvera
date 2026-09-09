export function trackEvent(name: string) {
  window.fathom?.trackEvent(name)
}

export function loadAnalytics(siteId: string) {
  if (document.querySelector('script[data-kynvera-analytics]')) return () => undefined

  const script = document.createElement('script')
  script.src = 'https://cdn.usefathom.com/script.js'
  script.defer = true
  script.dataset.site = siteId
  script.dataset.kynveraAnalytics = 'true'
  document.head.appendChild(script)

  return () => script.remove()
}
