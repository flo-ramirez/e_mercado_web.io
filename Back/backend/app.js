const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE_ULTRA_SECRETA";
const app = express();
const puerto = 3000;
const cors = require("cors");
// Habilitar CORS para todos los orígenes
app.use(cors());

app.use(express.json());  // Permite leer el cuerpo de las solicitudes en formato JSON

// Función para verificar el token de autorización
const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"];  // Obtener el token del encabezado 'authorization'
  
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);  // Verifica y decodifica el token
    req.user = decoded;  // Agrega el usuario decodificado al objeto de la solicitud
    next();  // Si todo es correcto, sigue al siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Ruta de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verifica las credenciales
  if (username === "admin@admin.com" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);  // Crea el token JWT
    res.status(200).json({ token });  // Devuelve el token
  } else {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});

// Ruta protegida (requiere autenticación)
app.get("/protected", checkAuth, (req, res) => {
  res.status(200).json({ message: "Acceso autorizado", user: req.user });
});

// Ruta para devolver archivos JSON
app.get("/:folder/:file/:id?", checkAuth, (req, res) => {
  const { folder, file, id } = req.params;
  const filePath = path.join(__dirname, "../api", folder, `${file}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Archivo no encontrado" });
  }

  try {
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (Array.isArray(fileData)) {
      if (id) {
        const item = fileData.find(element => element.id === parseInt(id, 10));
        if (item) {
          return res.json(item);
        } else {
          return res.status(404).json({ error: "Elemento no encontrado" });
        }
      }
      return res.json(fileData);
    }
    return res.json(fileData);
  } catch (error) {
    return res.status(500).json({ error: "Error interno al procesar el archivo" });
  }
});

// Inicia el servidor
app.listen(puerto, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
