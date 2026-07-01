import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON body parsing
  app.use(express.json());

  const DATA_DIR = path.join(process.cwd(), 'data');
  const DATA_FILE = path.join(DATA_DIR, 'event_scores.json');

  // Helper to read database
  function getEventData() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('Error reading event scores data:', error);
    }
    // Return a fallback structure if file isn't found or is invalid
    return {
      eventInfo: {
        title: "Mega Encuentro Juvenil 2026",
        description: "El evento más grande del año para jóvenes líderes, deportistas y creadores. ¡Demuestra el poder de tu equipo!",
        date: "1 de Julio, 2026",
        location: "Polideportivo Municipal Central",
        status: "¡En curso!"
      },
      challenges: [],
      teams: []
    };
  }

  // Helper to save database
  function saveEventData(data: any) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Error saving event scores data:', error);
      return false;
    }
  }

  // Initial/default backup data to reset to
  const DEFAULT_DATA = {
    "eventInfo": {
      "title": "Mega Encuentro Juvenil 2026",
      "description": "El portal oficial de resultados para el crecimiento integral de nuestros jóvenes participantes.",
      "date": "1 de Julio, 2026",
      "location": "Polideportivo Municipal Central",
      "status": "¡En curso!"
    },
    "challenges": [
      {
        "id": "mrnt-clase",
        "name": "MRNT class",
        "description": "Participación, asistencia y cumplimiento de retos de estudio en la clase regular de jóvenes.",
        "maxPoints": 100,
        "iconName": "Brain"
      },
      {
        "id": "mrnt-adoracion",
        "name": "MRNT Adoración",
        "description": "Devoción, reverencia y actividades espirituales de adoración juvenil.",
        "maxPoints": 100,
        "iconName": "Sparkles"
      },
      {
        "id": "semana-joven",
        "name": "Semana Joven",
        "description": "Compromiso, asistencia y dinámicas de servicio en la gran semana de evangelismo juvenil.",
        "maxPoints": 150,
        "iconName": "Trophy"
      },
      {
        "id": "conexion-gp",
        "name": "Conexión GP",
        "description": "Participación e integración activa de Grupos Pequeños en actividades de servicio.",
        "maxPoints": 100,
        "iconName": "Users"
      }
    ],
    "teams": [
      {
        "id": "fenix",
        "name": "Fénix",
        "avatar": "🔥",
        "color": "from-red-500 to-orange-500",
        "bgColor": "bg-red-500/10 border-red-500/30 text-red-400",
        "scores": [
          {
            "challengeId": "mrnt-clase",
            "points": 85,
            "completedAt": "2026-07-01T09:30:00.000Z",
            "notes": "Excelente participación interactiva y puntualidad."
          },
          {
            "challengeId": "mrnt-adoracion",
            "points": 90,
            "completedAt": "2026-07-01T11:15:00.000Z",
            "notes": "Gran reverencia y apoyo musical en el programa."
          },
          {
            "challengeId": "semana-joven",
            "points": 135,
            "completedAt": "2026-07-01T14:40:00.000Z",
            "notes": "Asistencia perfecta de todos sus miembros."
          }
        ],
        "totalScore": 310
      },
      {
        "id": "centinelas",
        "name": "Centinelas",
        "avatar": "🛡️",
        "color": "from-blue-500 to-indigo-500",
        "bgColor": "bg-blue-500/10 border-blue-500/30 text-blue-400",
        "scores": [
          {
            "challengeId": "mrnt-clase",
            "points": 95,
            "completedAt": "2026-07-01T09:45:00.000Z",
            "notes": "¡Casi perfecto! Demostraron amplio conocimiento de las lecciones."
          },
          {
            "challengeId": "semana-joven",
            "points": 120,
            "completedAt": "2026-07-01T14:55:00.000Z",
            "notes": "Trabajo en equipo impecable en las misiones comunitarias."
          },
          {
            "challengeId": "conexion-gp",
            "points": 85,
            "completedAt": "2026-07-01T16:20:00.000Z",
            "notes": "Excelente reporte de actividades de su Grupo Pequeño."
          }
        ],
        "totalScore": 300
      },
      {
        "id": "titanes",
        "name": "Titanes",
        "avatar": "⚡",
        "color": "from-amber-400 to-yellow-600",
        "bgColor": "bg-amber-500/10 border-amber-500/30 text-amber-400",
        "scores": [
          {
            "challengeId": "mrnt-clase",
            "points": 70,
            "completedAt": "2026-07-01T10:00:00.000Z",
            "notes": "Buen esfuerzo grupal en las trivias de clase."
          },
          {
            "challengeId": "mrnt-adoracion",
            "points": 80,
            "completedAt": "2026-07-01T11:45:00.000Z",
            "notes": "Participación activa en los momentos de oración."
          },
          {
            "challengeId": "conexion-gp",
            "points": 90,
            "completedAt": "2026-07-01T15:10:00.000Z",
            "notes": "Organizaron una fantástica reunión de integración."
          }
        ],
        "totalScore": 240
      },
      {
        "id": "alquimistas",
        "name": "Alquimistas",
        "avatar": "🧪",
        "color": "from-emerald-400 to-teal-600",
        "bgColor": "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        "scores": [
          {
            "challengeId": "mrnt-clase",
            "points": 80,
            "completedAt": "2026-07-01T10:15:00.000Z",
            "notes": "Puntuales y con sus cuadernos listos."
          },
          {
            "challengeId": "mrnt-adoracion",
            "points": 75,
            "completedAt": "2026-07-01T12:00:00.000Z",
            "notes": "Buena actitud en el culto."
          },
          {
            "challengeId": "semana-joven",
            "points": 110,
            "completedAt": "2026-07-01T15:25:00.000Z",
            "notes": "Gran entusiasmo en la barra juvenil."
          },
          {
            "challengeId": "conexion-gp",
            "points": 80,
            "completedAt": "2026-07-01T16:30:00.000Z",
            "notes": "Buen espíritu misionero en su GP."
          }
        ],
        "totalScore": 345
      },
      {
        "id": "vanguardia",
        "name": "Vanguardia",
        "avatar": "🚀",
        "color": "from-purple-500 to-pink-500",
        "bgColor": "bg-purple-500/10 border-purple-500/30 text-purple-400",
        "scores": [
          {
            "challengeId": "mrnt-clase",
            "points": 65,
            "completedAt": "2026-07-01T10:30:00.000Z",
            "notes": "Buen esfuerzo en clase."
          },
          {
            "challengeId": "mrnt-adoracion",
            "points": 75,
            "completedAt": "2026-07-01T12:15:00.000Z",
            "notes": "Mostraron gran devoción."
          },
          {
            "challengeId": "semana-joven",
            "points": 85,
            "completedAt": "2026-07-01T15:40:00.000Z",
            "notes": "Muy colaborativos en el aseo y orden."
          }
        ],
        "totalScore": 225
      },
      {
        "id": "nomadas",
        "name": "Nómadas",
        "avatar": "🧭",
        "color": "from-pink-500 to-rose-500",
        "bgColor": "bg-pink-500/10 border-pink-500/30 text-pink-400",
        "scores": [
          {
            "challengeId": "mrnt-clase",
            "points": 50,
            "completedAt": "2026-07-01T10:45:00.000Z",
            "notes": "Asistencia parcial, pero muy alegres."
          },
          {
            "challengeId": "mrnt-adoracion",
            "points": 65,
            "completedAt": "2026-07-01T12:30:00.000Z",
            "notes": "Participaron activamente de los cantos."
          },
          {
            "challengeId": "semana-joven",
            "points": 70,
            "completedAt": "2026-07-01T15:55:00.000Z",
            "notes": "Apoyaron activamente en la logística."
          }
        ],
        "totalScore": 185
      }
    ]
  };

  // Ensure JSON file exists initially, otherwise write seed
  try {
    let shouldOverWrite = false;
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      if (!content.includes('mrnt-clase')) {
        shouldOverWrite = true;
      }
    } else {
      shouldOverWrite = true;
    }
    if (shouldOverWrite) {
      saveEventData(DEFAULT_DATA);
    }
  } catch (e) {
    console.error("Failed to initialize score file", e);
  }

  // API: Get all event data
  app.get('/api/scores', (req, res) => {
    const data = getEventData();
    res.json(data);
  });

  // API: Update score for a team & challenge
  app.post('/api/scores', (req, res) => {
    const { password, teamId, challengeId, points, notes } = req.body;

    // Verify PIN/password
    if (password !== 'admin123') {
      return res.status(401).json({ error: 'Contraseña de administrador incorrecta.' });
    }

    if (!teamId || !challengeId || points === undefined) {
      return res.status(400).json({ error: 'Datos incompletos. Faltan parámetros.' });
    }

    const data = getEventData();
    const team = data.teams.find((t: any) => t.id === teamId);
    const challenge = data.challenges.find((c: any) => c.id === challengeId);

    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado.' });
    }
    if (!challenge) {
      return res.status(404).json({ error: 'Desafío no encontrado.' });
    }

    const numPoints = Number(points);
    if (isNaN(numPoints) || numPoints < 0 || numPoints > challenge.maxPoints) {
      return res.status(400).json({ error: `Puntos inválidos. Deben estar entre 0 y ${challenge.maxPoints}.` });
    }

    // Find or create score record
    const scoreIndex = team.scores.findIndex((s: any) => s.challengeId === challengeId);
    const now = new Date().toISOString();

    if (scoreIndex >= 0) {
      team.scores[scoreIndex] = {
        challengeId,
        points: numPoints,
        completedAt: now,
        notes: notes || team.scores[scoreIndex].notes || ''
      };
    } else {
      team.scores.push({
        challengeId,
        points: numPoints,
        completedAt: now,
        notes: notes || ''
      });
    }

    // Recalculate total score
    team.totalScore = team.scores.reduce((sum: number, s: any) => sum + s.points, 0);

    // Save changes
    const saved = saveEventData(data);
    if (saved) {
      res.json({ success: true, data });
    } else {
      res.status(500).json({ error: 'Error al guardar los datos en el servidor.' });
    }
  });

  // API: Edit event info
  app.post('/api/event-info', (req, res) => {
    const { password, title, description, date, location, status } = req.body;

    if (password !== 'admin123') {
      return res.status(401).json({ error: 'Contraseña de administrador incorrecta.' });
    }

    const data = getEventData();
    if (title) data.eventInfo.title = title;
    if (description) data.eventInfo.description = description;
    if (date) data.eventInfo.date = date;
    if (location) data.eventInfo.location = location;
    if (status) data.eventInfo.status = status;

    const saved = saveEventData(data);
    if (saved) {
      res.json({ success: true, data });
    } else {
      res.status(500).json({ error: 'Error al guardar los datos.' });
    }
  });

  // API: Reset scores
  app.post('/api/reset', (req, res) => {
    const { password } = req.body;

    if (password !== 'admin123') {
      return res.status(401).json({ error: 'Contraseña de administrador incorrecta.' });
    }

    const saved = saveEventData(DEFAULT_DATA);
    if (saved) {
      res.json({ success: true, data: DEFAULT_DATA });
    } else {
      res.status(500).json({ error: 'Error al restablecer los datos.' });
    }
  });

  // API: Add new team dynamically
  app.post('/api/teams/add', (req, res) => {
    const { password, name, avatar, colorPreset } = req.body;

    if (password !== 'admin123') {
      return res.status(401).json({ error: 'Contraseña de administrador incorrecta.' });
    }

    if (!name) {
      return res.status(400).json({ error: 'El nombre del equipo es obligatorio.' });
    }

    const data = getEventData();
    const id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (data.teams.some((t: any) => t.id === id)) {
      return res.status(400).json({ error: 'Ya existe un equipo con un nombre similar.' });
    }

    const presets: { [key: string]: { color: string, bgColor: string } } = {
      red: { color: "from-red-500 to-orange-500", bgColor: "bg-red-500/10 border-red-500/30 text-red-400" },
      blue: { color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
      green: { color: "from-emerald-400 to-teal-600", bgColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
      purple: { color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
      yellow: { color: "from-amber-400 to-yellow-600", bgColor: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
      pink: { color: "from-pink-500 to-rose-500", bgColor: "bg-pink-500/10 border-pink-500/30 text-pink-400" },
      cyan: { color: "from-cyan-400 to-sky-600", bgColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" }
    };

    const selectedPreset = presets[colorPreset] || presets.blue;

    const newTeam = {
      id,
      name,
      avatar: avatar || '👥',
      color: selectedPreset.color,
      bgColor: selectedPreset.bgColor,
      scores: [],
      totalScore: 0
    };

    data.teams.push(newTeam);
    const saved = saveEventData(data);

    if (saved) {
      res.json({ success: true, data });
    } else {
      res.status(500).json({ error: 'Error al agregar el equipo.' });
    }
  });

  // API: Add/Edit challenge
  app.post('/api/challenges/add', (req, res) => {
    const { password, name, description, maxPoints, iconName } = req.body;

    if (password !== 'admin123') {
      return res.status(401).json({ error: 'Contraseña de administrador incorrecta.' });
    }

    if (!name || !maxPoints) {
      return res.status(400).json({ error: 'Nombre y puntaje máximo son obligatorios.' });
    }

    const data = getEventData();
    const id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    if (data.challenges.some((c: any) => c.id === id)) {
      return res.status(400).json({ error: 'Ya existe un desafío con un nombre similar.' });
    }

    const newChallenge = {
      id,
      name,
      description: description || '',
      maxPoints: Number(maxPoints),
      iconName: iconName || 'Trophy'
    };

    data.challenges.push(newChallenge);
    const saved = saveEventData(data);

    if (saved) {
      res.json({ success: true, data });
    } else {
      res.status(500).json({ error: 'Error al agregar el desafío.' });
    }
  });

  // Serve Static Assets & Vite Integrations
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bind to port 3000 and interface 0.0.0.0
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Event Server] running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
