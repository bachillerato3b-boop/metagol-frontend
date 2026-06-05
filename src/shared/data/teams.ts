export interface Team {
  id: string;
  name: string;
  groupId: string;
}

/**
 * ============================================================
 * Equipos oficiales por grupo – MetaGol 2026
 * ============================================================
 * id: estable, no depende del nombre visible
 */
export const teams: Team[] = [
  // Grupo A
  { id: "A1", name: "México", groupId: "A" },
  { id: "A2", name: "Sudáfrica", groupId: "A" },
  { id: "A3", name: "Corea del Sur", groupId: "A" },
  { id: "A4", name: "República Checa", groupId: "A" },

  // Grupo B
  { id: "B1", name: "Canadá", groupId: "B" },
  { id: "B2", name: "Qatar", groupId: "B" },
  { id: "B3", name: "Suiza", groupId: "B" },
  { id: "B4", name: "Bosnia y Herzegovina", groupId: "B" },

  // Grupo C
  { id: "C1", name: "Brasil", groupId: "C" },
  { id: "C2", name: "Marruecos", groupId: "C" },
  { id: "C3", name: "Haití", groupId: "C" },
  { id: "C4", name: "Escocia", groupId: "C" },

  // Grupo D
  { id: "D1", name: "Estados Unidos", groupId: "D" },
  { id: "D2", name: "Paraguay", groupId: "D" },
  { id: "D3", name: "Australia", groupId: "D" },
  { id: "D4", name: "Turquía", groupId: "D" },

  // Grupo E
  { id: "E1", name: "Alemania", groupId: "E" },
  { id: "E2", name: "Curazao", groupId: "E" },
  { id: "E3", name: "Costa de Marfil", groupId: "E" },
  { id: "E4", name: "Ecuador", groupId: "E" },

  // Grupo F
  { id: "F1", name: "Países Bajos", groupId: "F" },
  { id: "F2", name: "Japón", groupId: "F" },
  { id: "F3", name: "Túnez", groupId: "F" },
  { id: "F4", name: "Suecia", groupId: "F" },

  // Grupo G
  { id: "G1", name: "Bélgica", groupId: "G" },
  { id: "G2", name: "Egipto", groupId: "G" },
  { id: "G3", name: "Irán", groupId: "G" },
  { id: "G4", name: "Nueva Zelanda", groupId: "G" },

  // Grupo H
  { id: "H1", name: "España", groupId: "H" },
  { id: "H2", name: "Cabo Verde", groupId: "H" },
  { id: "H3", name: "Arabia Saudita", groupId: "H" },
  { id: "H4", name: "Uruguay", groupId: "H" },

  // Grupo I
  { id: "I1", name: "Francia", groupId: "I" },
  { id: "I2", name: "Senegal", groupId: "I" },
  { id: "I3", name: "Noruega", groupId: "I" },
  { id: "I4", name: "Irak", groupId: "I" },

  // Grupo J
  { id: "J1", name: "Argentina", groupId: "J" },
  { id: "J2", name: "Argelia", groupId: "J" },
  { id: "J3", name: "Austria", groupId: "J" },
  { id: "J4", name: "Jordania", groupId: "J" },

  // Grupo K
  { id: "K1", name: "Portugal", groupId: "K" },
  { id: "K2", name: "Uzbekistán", groupId: "K" },
  { id: "K3", name: "Colombia", groupId: "K" },
  { id: "K4", name: "RD Congo", groupId: "K" },

  // Grupo L
  { id: "L1", name: "Inglaterra", groupId: "L" },
  { id: "L2", name: "Croacia", groupId: "L" },
  { id: "L3", name: "Ghana", groupId: "L" },
  { id: "L4", name: "Panamá", groupId: "L" },
];
