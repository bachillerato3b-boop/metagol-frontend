/**
 * ============================================================
 * PredictionPayload
 * ============================================================
 *
 * Payload que el frontend envía al backend
 * al crear o actualizar una predicción.
 *
 * Reglas:
 * - NO incluye userId
 * - NO incluye score
 * - NO incluye fechas
 */
export interface PredictionPayload {
  groups: {
    groupId: string;
    positions: [
      string, // 1°
      string, // 2°
      string, // 3°
      string  // 4°
    ];
  }[];

  /**
   * Mejores terceros ordenados del 1° al 8°
   */
  bestThirds: string[]; // length = 8
}
