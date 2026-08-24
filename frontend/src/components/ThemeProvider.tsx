import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full glass hover:glow-electric transition-all"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      {children}
    </div>
  )
}
