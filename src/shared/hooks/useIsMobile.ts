import { useState, useEffect } from "react"

/**
 * Hook que determina si el viewport es considerado móvil.
 * - Usa un breakpoint configurable (por defecto: 768px).
 * - Escucha eventos de resize y actualiza el estado.
 *
 * @param breakpoint Ancho en px a partir del cual se considera "móvil"
 * @returns `true` si el ancho actual de ventana es menor que el breakpoint
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [breakpoint])
  return isMobile
}
