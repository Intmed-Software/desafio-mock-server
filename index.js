import express from "express";
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  if (!req.path.startsWith("/users")) {
    const { authorization } = req.headers;
    if (authorization === "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b") {
      next();
    } else {
      return res
        .status(403)
        .json({ invalid_credentials: "Provide a valid Token" });
    }
  } else {
    next();
  }
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "intmed" && password === "challenge") {
    return res.json({
      token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
    });
  }

  return res.status(401).json({
    invalid_credentials:
      "It was not possible to login with the provided credentials",
  });
});

app.post("/users", (req, res) => {
  return res.status(201).json({
    username: "intmed",
    email: "intmed@email.com",
  });
});

app.get("/especialidades", async (req, res) => {
  await db.read();
  return res.json(db.data.especialidades);
});

app.get("/medicos", async (req, res) => {
  await db.read();
  return res.json(db.data.medicos);
});

app.get("/agendas", async (req, res) => {
  await db.read();
  return res.json(db.data.agendas);
});

app.get("/consultas", async (req, res) => {
  await db.read();
  return res.json(db.data.consultas);
});

app.post("/consultas", async (req, res) => {
  await db.read();
  const { consultas } = db.data;

  const novaConsulta = {
    id: 2,
    dia: "2020-03-01",
    horario: "09:00",
    data_agendamento: "2020-02-01T10:45:0-03:00",
    medico: {
      id: 1,
      crm: 3711,
      nome: "Drauzio Varella",
      especialidade: {
        id: 2,
        nome: "Pediatria",
      },
    },
  };

  consultas.push(novaConsulta);
  await db.write();

  return res.json(novaConsulta);
});

app.delete("/consultas/:id", async (req, res) => {
  await db.read();
  
  db.data.consultas.pop()

  await db.write();
  return res.json();
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
