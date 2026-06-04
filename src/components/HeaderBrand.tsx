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
    flex: 1.4,
    minWidth: "180px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  }}
>

  <div
    style={{
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "8px",
      letterSpacing: "1px",
    }}
  >
    ⚽ MUNDIAL 2026
  </div>

  <div
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    }}
  >

    <div
      style={{
        height: "3px",
        background: "#38bdf8",
        flex: 1,
        borderRadius: "999px",
      }}
    />

    <div
      style={{
        whiteSpace: "nowrap",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#e2e8f0",
      }}
    >
      Hasta alcanzar las estrellas
    </div>

    <div
      style={{
        fontSize: "28px",
        color: "#38bdf8",
        fontWeight: "bold",
      }}
    >
      ⟶
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