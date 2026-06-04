import { useEffect, useState } from "react";
import api from "../api/api";

export default function Ranking() {

  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchRanking = async () => {

      try {

        const res = await api.get("/leaderboard");

        setRanking(
          res.data.leaderboard.leaderboard
        );

      } catch (error) {

        console.error("ERROR RANKING:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchRanking();

  }, []);

  if (loading) {
    return (
      <h2 style={{ marginTop: "40px" }}>
        Cargando ranking...
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🏆 Ranking Oficial
      </h1>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >

        {ranking.map((entry, index) => (

          <div
            key={index}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "16px",
              padding: "18px",
              background: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >

            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                minWidth: "60px",
              }}
            >
              #{entry.position}
            </div>

            <div
              style={{
                flex: 1,
                textAlign: "left",
                paddingLeft: "20px",
              }}
            >
              {entry.email}
            </div>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {entry.score} pts
            </div>

          </div>

        ))}

      </div>
    </div>
  );
}