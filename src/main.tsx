/**
 * ============================================================
 * Archivo: main.tsx
 * Proyecto: MetaGol 2026 – Frontend
 * ============================================================
 *
 * RESPONSABILIDAD:
 * ----------------
 * - Punto de entrada de la aplicación React
 * - Renderizar App en el DOM
 * - Envolver la app con providers globales
 *
 * IMPORTANTE:
 * -----------
 * - Aquí se conectan los contextos globales
 * - Si un provider no está aquí → NO funciona en la app
 *
 * ============================================================
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

/**
 * ============================================================
 * CONTEXTOS GLOBALES (🔥 CLAVE)
 * ============================================================
 *
 * EventStatusProvider:
 * - Permite a TODA la app conocer el estado del evento
 * - Sin esto → status = null
 * - Resultado: UI incorrecta (evento siempre cerrado)
 */
import { EventStatusProvider } from './contexts/EventStatusContext'

/**
 * ============================================================
 * Render principal
 * ============================================================
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>

   <BrowserRouter>
  <EventStatusProvider>
    <App />
  </EventStatusProvider>
</BrowserRouter>

  </StrictMode>,
)