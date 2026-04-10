import express from 'express';
import path from 'path';
import { usuarioService } from "./service/ApiService";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Rutas API
app.get('/api/users', async (req, res) => {
    const result = await usuarioService.getAll();
    res.json(result);
});

app.get('/api/users/:id', async (req, res) => {
    const result = await usuarioService.getOne(Number(req.params.id));
    res.json(result);
});

app.post('/api/users', async (req, res) => {
    const result = await usuarioService.create(req.body);
    res.json(result);
});

app.put('/api/users/:id', async (req, res) => {
    const result = await usuarioService.update(Number(req.params.id), req.body);
    res.json(result);
});

app.delete('/api/users/:id', async (req, res) => {
    const result = await usuarioService.delete(Number(req.params.id));
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📱 Abre tu navegador en http://localhost:${PORT}`);
});