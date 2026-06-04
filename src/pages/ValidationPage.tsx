import { useEffect, useState } from "react";

export default function ValidationPage() {
  const [loading, setLoading] = useState(true);

  const [cartillaId, setCartillaId] = useState("");

  useEffect(() => {
    const parts = window.location.pathname.split("/");
    const id = parts[2];

    setCartillaId(id);

    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Cargando validación...</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "60px auto",
        padding: "32px",
        border: "2px solid #cbd5e1",
        borderRadius: "20px",
        background: "#ffffff",
        textAlign: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        ✅ Cartilla registrada
      </h1>

      <div
        style={{
          fontSize: "16px",
          color: "#475569",
          marginBottom: "24px",
        }}
      >
        Participación validada correctamente
      </div>

      <div
        style={{
          background: "#f8fafc",
          borderRadius: "12px",
          padding: "16px",
          border: "1px solid #cbd5e1",
        }}
      >
        <strong>ID Oficial:</strong>

        <div
          style={{
            marginTop: "8px",
            wordBreak: "break-word",
            fontSize: "14px",
          }}
        >
          {cartillaId}
        </div>
      </div>
    </div>
  );
}