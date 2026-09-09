/// <reference types="vite/client" />

interface Window {
	fathom?: {
		trackEvent: (name: string) => void
	}
}