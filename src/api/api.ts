/**
 * ============================================================
 * Archivo: api.ts
 * Proyecto: MetaGol 2026 – Frontend
 * ============================================================
 *
 * RESPONSABILIDAD:
 * ----------------
 * - Centralizar llamadas HTTP al backend
 * - Configurar baseURL
 * - Inyectar token automáticamente
 *
 * IMPORTANTE:
 * -----------
 * - Si VITE_API_URL NO está definido → usar fallback local
 * - Evita errores silenciosos en desarrollo
 *
 * ============================================================
 */

import axios from "axios";

/**
 * ============================================================
 * Base URL
 * ============================================================
 *
 * Orden:
 * 1. Variable de entorno (producción)
 * 2. Fallback local (desarrollo)
 */
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
console.log("BASE_URL =", BASE_URL);

/**
 * ============================================================
 * Instancia Axios
 * ============================================================
 */
const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * ============================================================
 * Interceptor de autenticación
 * ============================================================
 *
 * - Adjunta automáticamente el token JWT
 * - Evita repetir código en cada request
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;