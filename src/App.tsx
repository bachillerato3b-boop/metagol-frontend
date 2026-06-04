import { useState } from "react";

import "react-router-dom";

import "./App.css";

import Prediction from "./components/Prediction";
import CountdownBanner from "./components/CountdownBanner";
import AccumulatedBanner from "./components/AccumulatedBanner";
import PublicCartilla from "./pages/PublicCartilla";
import ValidationPage from "./pages/ValidationPage";
import HeaderBrand from "./components/HeaderBrand";
import { useEventStatus } from "./contexts/EventStatusContext";
import Ranking from "./components/Ranking";

function App() {
  const { status } = useEventStatus();  
  const isPublicCartillaRoute =
    window.location.pathname.startsWith("/cartilla/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdult, setIsAdult] = useState(false);

  const [token, setToken] = useState<string | null>(
  localStorage.getItem("token")
);

  // 🔥 NUEVO: modo único (LOGIN / REGISTER)
  const [mode, setMode] = useState<"LOGIN" | "REGISTER">("LOGIN");

  /* ================= LOGIN ================= */
  const handleLogin = async () => {

    const res = await fetch("https://metagol-production.up.railway.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (!data.token) {
      alert("Login fallido");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {

    if (!email || !password || !phone) {
      alert("Completa todos los campos");
      return;
    }

    if (!isAdult) {
      alert("Debes confirmar que eres mayor de edad");
      return;
    }

    const res = await fetch("https://metagol-production.up.railway.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        phone,
        isAdult
      })
    });

    const data = await res.json();

    if (!data.token) {
      alert(data.error || "Error en registro");
      return;
    }

    localStorage.removeItem("token");
setToken(null);

    alert("Registro exitoso. Ahora inicia sesión.");

    setMode("LOGIN");
    setEmail("");
    setPassword("");
    setPhone("");
    setIsAdult(false);
  };

  /* ================= LOGOUT ================= */
  

   if (
  window.location.pathname.startsWith("/validar/")
) {
  return <ValidationPage />;
}

if (isPublicCartillaRoute) {
  return <PublicCartilla />;
}

  return (
    <div
  style={{
    textAlign: "center",
    padding: "16px",
    minHeight: "100vh",
    overflowY: "auto",
  }}
>

    { /* <h1>⚽ MUNDIAL 2026</h1> */}
      <HeaderBrand />

     <div
  style={{
    display: "flex",
    gap: "12px",
    marginTop: "2px",
    alignItems: "stretch",
    flexWrap: "wrap",
  }}
>
  <div style={{ flex: 1, minWidth: "320px" }}>
    <CountdownBanner />
  </div>

  <div style={{ flex: 1, minWidth: "320px" }}>
    <AccumulatedBanner />
  </div>
</div>

 <div style={{ marginTop: "-12px" }} />
      {!token && (
  <div
    style={{
      maxWidth: "420px",
minHeight: "auto",
      margin: "20px auto",
      background: "#ffffff",
      padding: "12px 32px 40px 32px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      border: "1px solid #e5e7eb",
    }}
  >

          {/* 🔘 SELECTOR */}
          <div style={{ marginBottom: "20px", marginTop: "0px" }}>
            <label
  style={{
    marginRight: "20px",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
              <input
                type="radio"
                checked={mode === "LOGIN"}
                onChange={() => setMode("LOGIN")}
              />
              Ingresar
            </label>

            <label>
              <input
                type="radio"
                checked={mode === "REGISTER"}
                onChange={() => setMode("REGISTER")}
              />
              Registrarse
            </label>
          </div>

          {/* CAMPOS COMUNES */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
}}
          />

          <div style={{ height: "12px" }} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
}}
          />

          <div style={{ height: "12px" }} />

          {/* 🔥 CAMPOS SOLO REGISTER */}
          {mode === "REGISTER" && (
            <>
              <input
                type="text"
                placeholder="Celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
}}
              />

              <div style={{ height: "12px" }} />

              <label>
                <input
                  type="checkbox"
                  checked={isAdult}
                  onChange={(e) => setIsAdult(e.target.checked)}
                />
                Soy mayor de edad
              </label>

              <div style={{ height: "6px" }} />
            </>
          )}

          {/* BOTÓN DINÁMICO */}
          {mode === "LOGIN" ? (
           <button
  onClick={handleLogin}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
              Iniciar sesión
            </button>
          ) : (
            <button
  onClick={handleRegister}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#111827",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
              Registrarse
            </button>
          )}

        </div>
      )}

      {/* APP */}
     {token && status === "OPEN" && (
  <div>
    <Prediction />
  </div>
)}

{status === "RESULTS_PUBLISHED" && (

  <div>
    <Ranking />
  </div>
)}


{status === "CLOSED" && (
  <div
    style={{
      marginTop: "40px",
      textAlign: "center",
    }}
  >
    <h1>⛔ Predicciones cerradas</h1>

    <p>
      El período de predicciones ha finalizado.
    </p>
  </div>
)}


    </div>
  );
}

export default App;