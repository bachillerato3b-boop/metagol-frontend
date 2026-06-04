import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

/**
 * ============================================================
 * Tipo EventStatus (🔥 DEFINIDO LOCALMENTE)
 * ============================================================
 *
 * Se define aquí para evitar dependencias rotas.
 * Debe coincidir con el backend.
 */
export type EventStatus =
  | "OPEN"
  | "CLOSED"
  | "RESULTS_PUBLISHED";

/**
 * ============================================================
 * EventStatusContext
 * ============================================================
 *
 * RESPONSABILIDAD:
 * ----------------
 * - Consultar el estado del evento al backend
 * - Exponer ese estado a toda la aplicación
 *
 * IMPORTANTE:
 * -----------
 * - El frontend NO interpreta reglas de negocio
 * - Solo consume el estado y reacciona
 */
interface EventStatusContextValue {
  status: EventStatus | null;
  refresh: () => void;
}

/**
 * Contexto principal
 */
const EventStatusContext = createContext<EventStatusContextValue>(
  {} as EventStatusContextValue
);

/**
 * ============================================================
 * EventStatusProvider
 * ============================================================
 *
 * Debe envolver toda la aplicación.
 * Permite que cualquier componente acceda al estado del evento.
 */
export const EventStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * Estado interno
   */

  // 🔥 FIX 1: estado inicial OPEN (evita bloqueo)
  const [status, setStatus] = useState<EventStatus | null>("OPEN");

  /**
   * ============================================================
   * fetchStatus
   * ============================================================
   *
   * Consulta el backend:
   * GET /event/status
   *
   * RESPUESTA ESPERADA:
   * {
   *   status: "OPEN" | "CLOSED" | "RESULTS_PUBLISHED",
   *   ...
   * }
   */
  const fetchStatus = async () => {
    try {
      const response = await api.get("/event/status");

      /**
       * Solo extraemos el campo necesario
       */
      setStatus(response.data.status);

    } catch (error) {
      console.error("Error obteniendo estado del evento:", error);

      /**
       * 🔥 FIX 2: fallback seguro
       * Si backend falla → NO bloqueamos app
       */
      setStatus("OPEN");
    }
  };

  /**
   * ============================================================
   * Carga inicial
   * ============================================================
   */
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <EventStatusContext.Provider
      value={{
        status,
        refresh: fetchStatus,
      }}
    >
      {children}
    </EventStatusContext.Provider>
  );
};

/**
 * ============================================================
 * useEventStatus (Hook)
 * ============================================================
 *
 * Permite acceder fácilmente al contexto desde cualquier componente.
 */
export const useEventStatus = () => {
  return useContext(EventStatusContext);
};