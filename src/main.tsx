import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { controleerVersie } from './versie'
import './ui/thema.css'

// Eerst kijken of we niet een oude versie draaien; daarna pas tekenen.
void controleerVersie()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
