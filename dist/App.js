"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ApiService_1 = require("./service/ApiService");
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend')));
// Rutas API
app.get('/api/users', async (req, res) => {
    const result = await ApiService_1.usuarioService.getAll();
    res.json(result);
});
app.get('/api/users/:id', async (req, res) => {
    const result = await ApiService_1.usuarioService.getOne(Number(req.params.id));
    res.json(result);
});
app.post('/api/users', async (req, res) => {
    const result = await ApiService_1.usuarioService.create(req.body);
    res.json(result);
});
app.put('/api/users/:id', async (req, res) => {
    const result = await ApiService_1.usuarioService.update(Number(req.params.id), req.body);
    res.json(result);
});
app.delete('/api/users/:id', async (req, res) => {
    const result = await ApiService_1.usuarioService.delete(Number(req.params.id));
    res.json(result);
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📱 Abre tu navegador en http://localhost:${PORT}`);
});
