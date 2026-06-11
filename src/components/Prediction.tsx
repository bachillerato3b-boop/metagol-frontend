// Prediction.tsx (v11.25 - FIX PAGO REAL SIN ROMPER FLUJO)

import { useState } from "react";

import { teams } from "../shared/data/teams";
import { useEventStatus } from "../contexts/EventStatusContext";
import type { PredictionPayload } from "../Types/prediction";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const GROUPS = Array.from({ length: 12 }).map((_, i) =>
  String.fromCharCode(65 + i)
);

  
/* ================= DRAG ================= */
function DraggableTeam({ id, name, selected }: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 10px",
        marginBottom: 4,
        border: "1px solid #ccc",
        background: selected ? "#ef4444" : "#fff",
        color: selected ? "#fff" : "#000",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        
userSelect: "none",

position: "relative",

zIndex: isDragging ? 999 : 1,
        
transform: transform
  ? `translate(${transform.x}px, ${transform.y}px)`
  : undefined,

        }}
    >
      {name}
    </div>
  );
}

/* ================= DROP ================= */
function DropZone({ id, children, filled }: any) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "7px 10px",
        marginBottom: 4,
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        background: filled ? "#22c55e" : isOver ? "#3b82f6" : "#f9f9f9",
        color: filled || isOver ? "#fff" : "#000",
        fontWeight: "bold",
              }}
    >
      {children}
    </div>
  );
}

/* ================= MAIN ================= */
export default function Prediction() {
  const { status } = useEventStatus();
const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  })
);


  const [groupIndex, setGroupIndex] = useState(0);
  const [step, setStep] = useState<
    "GROUPS" | "THIRDS" | "REVIEW" | "PAYMENT" | "RECEIPT"
  >("GROUPS");

  const [prediction, setPrediction] = useState<PredictionPayload>({
    groups: [],
    bestThirds: ["", "", "", "", "", "", "", ""],
  });

  const [predictionId, setPredictionId] = useState<string>("");
 

  if (status !== "OPEN") {
    return <h2 style={{ textAlign: "center" }}>Evento cerrado</h2>;
  }

  const getGroup = (groupId: string) => {
    return (
      prediction.groups.find((g) => g.groupId === groupId) || {
        groupId,
        positions: ["", "", "", ""],
      }
    );
  };

  /* ================= GROUP DRAG ================= */
  const handleGroupDragEnd = (event: any, groupId: string) => {
    const { active, over } = event;
    if (!over) return;

    const teamId = active.id;
    const position = parseInt(over.id);

    setPrediction((prev) => {
      const existing = prev.groups.find((g) => g.groupId === groupId);

      let positions = existing
        ? [...existing.positions]
        : ["", "", "", ""];

      const existingIndex = positions.indexOf(teamId);
      if (existingIndex !== -1) positions[existingIndex] = "";

      positions[position] = teamId;

      const newGroups = existing
        ? prev.groups.map((g) =>
            g.groupId === groupId
  ? {
      ...g,
      positions: positions as [string, string, string, string]
    }
  : g
          )
        : [
  ...prev.groups,
  {
    groupId,
    positions: positions as [string, string, string, string]
  }
];

      return { ...prev, groups: newGroups };
    });
  };

  /* ================= NEXT GROUP ================= */
  const nextGroup = () => {
    const groupId = GROUPS[groupIndex];

console.log("GROUP INDEX:", groupIndex);
console.log("GROUP ID:", GROUPS[groupIndex]);

    const group = getGroup(groupId);

    if (group.positions.filter((p) => p).length !== 4) {
      alert(`Grupo ${groupId} incompleto`);
      return;
    }

    if (groupIndex < GROUPS.length - 1) {
      setGroupIndex((prev) => prev + 1);
    } else {
      const completedGroups = GROUPS.map((gId) => {
        const g = getGroup(gId);

        return {
          groupId: gId,
          positions: g.positions,
        };
      });

      console.log("COMPLETED GROUPS", completedGroups);

setPrediction((prev) => ({
  ...prev,
  groups: completedGroups,
}));

setStep("THIRDS");
    }
  };

  /* ================= THIRDS ================= */
  if (step === "THIRDS") {

console.log("ENTRANDO A THIRDS");
console.log("GROUPS:", prediction.groups);


console.log("RAW GROUPS", prediction.groups);

console.log("ANTES DE thirdTeams");

const thirdTeams = prediction.groups.map((g) => g.positions[2]);

console.log("THIRD TEAMS:", thirdTeams);

    const availableTeams = teams.filter((t) =>
      thirdTeams.includes(t.id)
    );
    const leftTeams = availableTeams.slice(0, 6);
const rightTeams = availableTeams.slice(6, 12);

console.log("THIRD TEAMS:", thirdTeams);
console.log("AVAILABLE TEAMS:", availableTeams);

return (
  <div>
    <h1>TEST THIRDS</h1>
  </div>
);

console.log("AVAILABLE COUNT:", availableTeams.length);

    return (
      <div
  style={{
    maxWidth: "1200px",
    margin: "auto",
    paddingBottom: "20px",
  }}
>
        <h1
  style={{
    textAlign: "center",
    fontSize: "24px",
    marginTop: "8px",
    marginBottom: "8px",
  }}
>
 Terceros
</h1>

        <DndContext
  sensors={sensors}
  autoScroll={false}
          key="thirds"
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over) return;

            const teamId = active.id;
            const index = parseInt(String(over.id));

            setPrediction((prev) => {
              const thirds = [...prev.bestThirds];

              const existingIndex = thirds.indexOf(String(teamId));
              if (existingIndex !== -1) thirds[existingIndex] = "";

              thirds[index] = String(teamId);

              return { ...prev, bestThirds: thirds };
            });
          }}
        >
         <div
  style={{
    marginTop: "10px",
  }}
>
  {/* CANDIDATOS */}
  <div
    style={{
      display: "grid",
      // gridTemplateColumns: "repeat(4, 1fr)",
      
      gridTemplateColumns:
  "repeat(auto-fit, minmax(220px, 1fr))",

      gap: "12px",
      marginBottom: "32px",
    }}
  >
    {[...leftTeams, ...rightTeams].map((t) => (
      <DraggableTeam
        key={t.id}
        id={t.id}
        name={t.name}
        selected={prediction.bestThirds.includes(t.id)}
      />
    ))}
  </div>

  {/* RANKING */}
  <h2
    style={{
      textAlign: "left",
      marginBottom: "6px",
    }}
  >
    8 mejores terceros clasificados
  </h2>

  <div
    style={{
      display: "grid",
      
      // gridTemplateColumns: "repeat(4, 1fr)",
      
      gridTemplateColumns:
  "repeat(auto-fit, minmax(220px, 1fr))",

      gap: "10px",
    }}
  >
    {Array.from({ length: 8 }).map((_, i) => {
      const teamId = prediction.bestThirds[i];
      const team = teams.find((t) => t.id === teamId);

      return (
        <DropZone
          key={i}
          id={String(i)}
          filled={!!team}
        >
          <span>{i + 1}°</span>
          <span>{team?.name || "Soltar aquí"}</span>
        </DropZone>
      );
    })}
  </div>
</div>

</DndContext>

        <div
  style={{
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
  }}
>
          <button
            onClick={() => {
              if (prediction.bestThirds.some((t) => !t)) {
                alert("Completa los 8 terceros");
                return;
              }
              setStep("REVIEW");
            }}
          >
            Continuar →
          </button>
        </div>
      </div>
    );
  }

  /* ================= REVIEW ================= */
  if (step === "REVIEW") {
    return (
      <div style={{ textAlign: "center" }}>
        <h2
  style={{
    marginBottom: "10px",
    marginTop: "12px",
    fontSize: "24px",
  }}
>
  Revisión
</h2>

<div
  style={{
    maxWidth: "1200px",
    margin: "20px auto",
  }}
>
  
  <h3>Grupos</h3>

<div
  style={{
    display: "grid",
    
    // gridTemplateColumns: "repeat(4, 1fr)",
    
    gridTemplateColumns:
  "repeat(auto-fit, minmax(220px, 1fr))",
    
    gap: "10px",
    marginTop: "6px",
  }}
>

  {prediction.groups.map((g) => (
    <div
  key={g.groupId}
  style={{
  marginBottom: "8px",
  background: "#ffffff",
  border: "2px solid #cbd5e1",
  borderRadius: "14px",
  padding: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  textAlign: "left",
}}
>

      <strong>Grupo {g.groupId}</strong>
      <ul
  style={{
    listStyle: "none",
    padding: 0,
    marginTop: "6px",
    marginBottom: 0,
  }}
>
        {g.positions.map((teamId, i) => (
          <li key={i}>
            {i + 1}° - {teams.find(t => t.id === teamId)?.name}
          </li>
        ))}
      </ul>
    </div>
  ))}

</div>

  <h3>Mejores terceros</h3>

<div
  style={{
    display: "grid",
    
    // gridTemplateColumns: "repeat(4, 1fr)",
    
    gridTemplateColumns:
  "repeat(auto-fit, minmax(220px, 1fr))",
    
    gap: "8px",
    marginTop: "16px",
  }}
>
  {prediction.bestThirds.map((teamId, i) => (
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
      {i + 1}° - {teams.find(t => t.id === teamId)?.name}
    </div>
  ))}
</div>

<div style={{ marginTop: 20 }}>
  <button onClick={() => setStep("PAYMENT")}>
    Confirmar y pagar →
  </button>

  <button
  onClick={() => {

    setPrediction(prev => ({
      ...prev,
      bestThirds: ["", "", "", "", "", "", "", ""]
    }));

    setGroupIndex(0);
    setStep("GROUPS");
  }}
>
  Volver a editar
</button>

</div>
</div>
      </div>
    );
  }

  /* ================= PAYMENT ================= */
  if (step === "PAYMENT") {
    return (
      <div
  style={{
    textAlign: "center",
    maxWidth: "520px",
    margin: "30px auto",
    background: "#ffffff",
    border: "2px solid #cbd5e1",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  }}
>
  <h2
  style={{
    fontSize: "24px",
    marginBottom: "10px",
  }}
>
  ✅ Registra oficialmente tu cartilla
</h2>

<div
  style={{
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#16a34a",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 3px 10px rgba(22,163,74,0.22)",
}}
>
  <div style={{ marginBottom: "8px" }}>
    <strong>Participación</strong>
    <div>USD 10 incluido IVA</div>
  </div>

  <div style={{ marginBottom: "8px" }}>
    <strong>Estado</strong>
    <div>Pendiente de confirmación</div>
  </div>

  <div>
    <strong>Método de pago</strong>
    <div>PayPhone o Deuna</div>
  </div>
</div>

  <p
    style={{
      color: "#475569",
      marginBottom: "20px",
      lineHeight: "1.5",
    }}
  >
    Continúa para participar
  </p>

        <button
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");
              if (!token) return alert("Sin sesión");

              const payload = JSON.parse(atob(token.split(".")[1]));
              console.log("TOKEN PAYLOAD COMPLETO:");
console.log(payload);
console.log("EMAIL DETECTADO:", payload.email);

              // 1. PAGO
              const resPayment = await fetch("https://metagol-production.up.railway.app/api/payments/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
  usuarioId: payload.uid || payload.id || payload._id || payload.userId,
  
   email:
    payload.email ||
    payload.correo ||
    payload.user?.email,
  
  monto: 10,
  metodo: "payphone",
  transactionId: "tx_" + Date.now(),
  estado: "aprobado", // 🔥 este suele faltar
  secret: import.meta.env.VITE_PAYMENT_SECRET,
}),
              });

// 👇 AGREGAR ESTO
console.log(
  "SECRET FRONT:",
  import.meta.env.VITE_PAYMENT_SECRET
);

              const paymentData = await resPayment.json();
console.log("PAYMENT:", paymentData);

// 🔥 DEBUG REAL (esto nos dice EXACTAMENTE qué manda backend)
if (!paymentData || Object.keys(paymentData).length === 0) {
  alert("Backend no respondió correctamente en pago");
  return;
}

// 🔥 BUSCAR CARTILLA EN TODOS LOS FORMATOS POSIBLES
const cartillaId =
  paymentData.cartilla?._id ||
  paymentData.cartillaId ||
  paymentData._id ||
  paymentData.id;

if (!cartillaId) {
  console.error("RESPUESTA COMPLETA:", paymentData);
  alert("No llegó cartilla (revisar consola)");
  return;
}

// 🔥 ACTUALIZAR TOKEN SI BACKEND LO ENVÍA
// 🔥 limpiar token viejo SIEMPRE
// 🔥 guardar nuevo si backend envía uno
if (paymentData.token) {
  localStorage.setItem("token", paymentData.token);
  console.log("TOKEN ACTUALIZADO");
}

              // 2. PREDICCIÓN
              console.log("PREDICTION PAYLOAD:", {
  cartillaId,
  groups: prediction.groups,
  bestThirds: prediction.bestThirds,
});
              const resPrediction = await fetch("https://metagol-production.up.railway.app/api/predictions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  cartillaId,
                  groups: prediction.groups,
                  bestThirds: prediction.bestThirds,
                }),
              });

              if (!resPrediction.ok) {
                const err = await resPrediction.json();
                console.log("ERROR:", err);
                throw new Error();
              }

             
if (paymentData.token) {
  localStorage.setItem("token", paymentData.token);
}

// continuar flujo
setPredictionId(cartillaId);
setStep("RECEIPT");
const resCartilla = await fetch(
  `https://metagol-production.up.railway.app/api/cartillas/${cartillaId}`
);

const dataCartilla = await resCartilla.json();

if (dataCartilla.ok) {

}

            } catch {
              alert("Error en pago");
            }
          }}
        >
          Continuar al pago
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Salir sin pagar
        </button>
      </div>
    );
  }

  /* ================= RECEIPT ================= */
  if (step === "RECEIPT") {
  return (
    <div style={{ textAlign: "center" }}>

      <div
        style={{
          background: "#ffffff",
          border: "2px solid #cbd5e1",
          borderRadius: "20px",
          padding: "24px",
          maxWidth: "520px",
          margin: "20px auto",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            marginBottom: "10px",
          }}
        >
          ✅ Participación confirmada
        </h2>

        <p
          style={{
            color: "#475569",
            marginBottom: "20px",
            lineHeight: "1.5",
          }}
        >
          Tu participación en Mundial 2026 ha sido registrada exitosamente.
        </p>

        <div
  style={{
    display: "flex",
    gap: "24px",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
    flexWrap: "wrap",
  }}
>

  <div style={{ textAlign: "center", flex: "0 0 150px" }}>
    
    <div
      style={{
        marginTop: "14px",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      Cartilla ID: {predictionId}
    </div>

    <div
      style={{
        marginTop: "8px",
        color: "#16a34a",
        fontWeight: "600",
      }}
    >
      ACTIVA
    </div>
  </div>

  <div
    style={{
      flex: 1,
      textAlign: "left",
      minWidth: "220px",
    }}
  >
    <div
      style={{
        fontWeight: "700",
        marginBottom: "10px",
        fontSize: "18px",
      }}
    >
      Tu comprobante oficial
    </div>

    <p
      style={{
        color: "#475569",
        lineHeight: "1.6",
        marginBottom: "18px",
      }}
    >
      Tu comprobante oficial y cartilla han sido enviados a tu correo; recuerda que el comprobante es el único documento válido para reclamar premios.
    </p>

    
<button
  onClick={() => {
    setPrediction({
      groups: [],
      bestThirds: ["", "", "", "", "", "", "", ""],
    });

    setPredictionId("");
    
    setGroupIndex(0);

    setStep("GROUPS");
  }}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #cbd5e1",
    background: "#ffffff",
    color: "#111827",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  🆕 Generar nueva cartilla
</button>
    
<button
  onClick={() => {
    localStorage.removeItem("token");

    setPrediction({
      groups: [],
      bestThirds: ["", "", "", "", "", "", "", ""],
    });

    setPredictionId("");
    
    setGroupIndex(0);

    window.location.href = "/";
  }}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#dc2626",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  🚪 Cerrar sesión
</button>

  </div>

</div>
      </div>

      

    </div>
  );
}

  /* ================= GROUPS ================= */
  const groupId = GROUPS[groupIndex];

console.log("GROUP INDEX:", groupIndex);
console.log("GROUP ID:", GROUPS[groupIndex]);

  const groupTeams = teams.filter((t) => t.groupId === groupId);
  const group = getGroup(groupId);

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center" }}>
  TEST {groupId} - IDX {groupIndex}
</h1>

     <DndContext
  sensors={sensors}
  autoScroll={false}
  key={groupId}
  onDragEnd={(e) => handleGroupDragEnd(e, groupId)}
>
  <div
    style={{
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        flex: 1,
        minWidth: "280px",
      }}
    >
      {groupTeams.map((t) => (
        <DraggableTeam
          key={t.id}
          id={t.id}
          name={t.name}
          selected={group.positions.includes(t.id)}
        />
      ))}
    </div>

    <div
      style={{
        flex: 1,
        minWidth: "280px",
      }}
    >
      {[0, 1, 2, 3].map((pos) => {
        const teamId = group.positions[pos];
        const team = teams.find((t) => t.id === teamId);

        return (
          <DropZone
            key={pos}
            id={String(pos)}
            filled={!!team}
          >
            <span>{pos + 1}°</span>
            <span>{team?.name || "Soltar aquí"}</span>
          </DropZone>
        );
      })}
    </div>
  </div>
</DndContext>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={nextGroup}>
          {groupIndex === GROUPS.length - 1
            ? "Ir a terceros →"
            : "Siguiente grupo →"}
        </button>
      </div>
    </div>
  );
}