/**
 * ============================================================
 * AccumulatedBanner.tsx (PRODUCCIÓN)
 * ============================================================
 */

import { useEffect, useState } from "react";

const API_URL = "https://metagol-production.up.railway.app";

type AccumulatedResponse = {
  accumulated: number;
  formatted: string;
};

export default function AccumulatedBanner() {

  const [value, setValue] = useState<string>("$0");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {

    let interval: any;
    let mounted = true;

    const fetchAccumulated = async () => {
      try {
        setError(false);

        const res = await fetch(`${API_URL}/api/accumulated`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: AccumulatedResponse = await res.json();

        if (!mounted) return;

        // usamos directamente el backend (fuente de verdad)
        setValue(data.formatted || `$${data.accumulated}`);

        setLoading(false);

      } catch (err) {
        console.error("Error loading accumulated:", err);

        if (!mounted) return;

        setError(true);
        setLoading(false);
      }
    };

    // carga inicial
    fetchAccumulated();

    // polling controlado
    interval = setInterval(fetchAccumulated, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };

  }, []);

  return (
  <div
    style={{
      width: "100%",
      background: error
        ? "#dc2626"
        : "linear-gradient(135deg, #facc15 0%, #fde047 50%, #eab308 100%)",
      color: error ? "#fff" : "#111827",
      textAlign: "center",
      padding: "16px 14px",
      marginTop: "10px",
      borderRadius: "14px",
      fontWeight: "bold",
      fontSize: "22px",
      letterSpacing: "0.8px",
      boxShadow: error
        ? "0 2px 8px rgba(0,0,0,0.20)"
        : "0 4px 18px rgba(234,179,8,0.35)",
      transition: "all 0.3s ease",
      border: error
        ? "none"
        : "2px solid rgba(255,255,255,0.35)",
    }}
  >
    {loading
      ? "⏳ CARGANDO ACUMULADO..."
      : error
      ? "⚠️ ERROR AL CONECTAR CON SERVIDOR"
      : `🏆 BOLSA ACUMULADA OFICIAL: ${value}`}
  </div>
);
}