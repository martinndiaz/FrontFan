import { BASE_URL } from "./api.js";

export async function loadProfessionals() {
  try {
    const response = await fetch(BASE_URL + "api/kinesiologists", {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json"
      }
    });

    const raw = await response.json();

    
    const professionals = {};

    raw.forEach((p) => {
      professionals[p.id] = {
        id: p.id,
        name: p.name,
        role: p.specialty,
        bio: p.description,
        email: p.email,
        phone: p.phone_number,
        rut: p.rut,
        box: p.box,

        
        photoClass: `booking__profile-photo--p${p.id}`,
        avatarClass: `booking-card__avatar--p${p.id}`,

        
        tags: [
          p.specialty,
          `Box: ${p.box}`,
        ],

        sessions: [
          {
            title: "Evaluación inicial",
            subtitle: "45 minutos",
            price: "$15.000"
          },
          {
            title: "Sesión de kinesiología",
            subtitle: "45 minutos",
            price: "$25.000"
          }
        ],
      };
    });

    console.log("Profesionales normalizados:", professionals);
    return professionals;

  } catch (error) {
    console.error("Error en GET:", error);
    return {};
  }
}
