import { useEffect, useState } from "react";

/**
 * ============================================================
 * CountdownBanner – Producción
 * ============================================================
 */
export default function CountdownBanner() {
  const WORLD_CUP_START = new Date("2026-06-11T00:00:00Z");

  const [label, setLabel] = useState("");

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff =
        WORLD_CUP_START.getTime() - now;

      if (diff <= 0) {
        setLabel("⚽ El Mundial 2026 ya está en juego");
        return;
      }

      const days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      );
      const minutes = Math.floor(
        (diff / (1000 * 60)) % 60
      );

      setLabel(
  `⏳ PLAZO PARA PARTICIPAR: ${days}d ${hours}h ${minutes}m`
);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div
    style={{
      width: "100%",
      background:
        "linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)",
      color: "#fff",
      textAlign: "center",
      padding: "16px 14px",
      fontWeight: "bold",
      fontSize: "22px",
      letterSpacing: "0.8px",
      borderRadius: "14px",
      marginTop: "10px",
      boxShadow: "0 4px 16px rgba(220,38,38,0.35)",
      border: "2px solid rgba(255,255,255,0.12)",
      position: "relative",
      overflow: "hidden",
    }}
  >

    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        transform: "translateX(-100%)",
      }}
    />

    <div
      style={{
        position: "relative",
        zIndex: 2,
      }}
    >
      🚨 {label}
    </div>

  </div>
);
}
