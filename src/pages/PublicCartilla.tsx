import { useEffect, useState } from "react";
import { teams } from "../shared/data/teams";

interface Cartilla {
  _id: string;
  name?: string;
  email?: string;
  groups?: any;
  bestThirds?: any;
  createdAt?: string;
}

export default function PublicCartilla() {
  const id = window.location.pathname.split("/cartilla/")[1];

  const [cartilla, setCartilla] = useState<Cartilla | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartilla = async () => {
      try {
        const response = await fetch(
          `https://metagol-production.up.railway.app/api/cartillas/public/${id}`
        );

        if (!response.ok) {
          throw new Error("Cartilla no encontrada");
        }

        const data = await response.json();

        setCartilla(data);
      } catch (err) {
        setError("No se pudo cargar la cartilla");
      } finally {
        setLoading(false);
      }
    };

    fetchCartilla();
  }, [id]);

  if (loading) {
    return (
  <div
   style={{
  padding: "0px 16px 24px 16px",
  maxWidth: "1200px",
  margin: "0 auto",
 textAlign: "left",
alignItems: "flex-start",
  position: "relative",
  top: "-18px",
}}
  >
        Cargando cartilla...
      </div>
    );
  }

  if (error || !cartilla) {
    return (
<div
  style={{
    padding: "12px 20px",
    maxWidth: "1100px",
    margin: "0 auto",
    textAlign: "left",
  }}
>        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1
  style={{
    fontSize: "28px",
    marginTop: "0px",
    marginBottom: "10px",
    textAlign: "left",
  }}
>
  Cartilla Mundial 2026
</h1>

      <p>
        <strong>ID:</strong> {cartilla._id}
      </p>

      {cartilla.name && (
        <p>
          <strong>Nombre:</strong> {cartilla.name}
        </p>
      )}

      {cartilla.email && (
        <p>
          <strong>Email:</strong> {cartilla.email}
        </p>
      )}

      <div style={{ marginTop: "30px" }}>
  <h2>Grupos</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
      marginTop: "16px",
    }}
  >
    {cartilla?.groups?.map((g: any) => (
      <div
        key={g.groupId}
        style={{
          background: "#ffffff",
          border: "2px solid #cbd5e1",
          borderRadius: "14px",
          padding: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <strong>Grupo {g.groupId}</strong>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "10px",
            marginBottom: 0,
          }}
        >
          {g.positions.map((teamId: string, i: number) => (
            <li key={i}>
              {i + 1}° -{" "}
              {teams.find((t) => t.id === teamId)?.name}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  <h2 style={{ marginTop: "30px" }}>
    Mejores terceros
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "12px",
      marginTop: "16px",
    }}
  >
    {cartilla?.bestThirds?.map(
      (teamId: string, i: number) => (
        <div
          key={i}
          style={{
            border: "2px solid #cbd5e1",
            borderRadius: "12px",
            padding: "10px",
            background: "#f8fafc",
            fontWeight: "600",
          }}
        >
          {i + 1}° -{" "}
          {teams.find((t) => t.id === teamId)?.name}
        </div>
      )
    )}
  </div>
</div>
      
    </div>
  );
}