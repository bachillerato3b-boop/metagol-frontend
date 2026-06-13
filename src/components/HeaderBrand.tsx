export default function HeaderBrand() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
       marginBottom: "14px",
        padding: "4px 12px",
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
       flexDirection: "row",
flexWrap: "nowrap",
      }}
    >

      {/* META GOL */}
      <div
        style={{
          flex: 1,
          minWidth: "110px",
          textAlign: "center",
        }}
      >
        <img
          src="/logos/metagol.jpeg"
          alt="MetaGol"
          style={{
            maxWidth: "100px",
            width: "100%",
            borderRadius: "12px",
          }}
        />
      </div>

     {/* CENTRO */}
<div
  style={{
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    }}
  >
    <div
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        color: "#cbd5e1",
      }}
    >
      Hasta alcanzar las estrellas
    </div>

    <div
      style={{
        fontSize: "34px",
        color: "#38bdf8",
        fontWeight: "bold",
        lineHeight: 1,
      }}
    >
      ⟶
    </div>

    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#ffffff",
      }}
    >
      ⚽ MUNDIAL 2026
    </div>

    <div
      style={{
        fontSize: "13px",
        color: "#cbd5e1",
      }}
    >
      FASE 1
    </div>
  </div>
</div>

      {/* LOGOS DERECHA */}
      <div
        style={{
          flex: 1,
          minWidth: "110px",
          display: "flex",
          flexDirection: "row",
flexWrap: "nowrap",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <img
          src="/logos/udla.png"
          alt="UDLA"
          style={{
            maxWidth: "95px",
            width: "100%",
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
          }}
        />

        <img
          src="/logos/cosmos.png"
          alt="Cosmos"
          style={{
            maxWidth: "95px",
            width: "100%",
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
          }}
        />
      </div>

    </div>
  );
}