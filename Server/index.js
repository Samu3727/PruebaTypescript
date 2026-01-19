import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/register.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);



app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 Registro: POST http://localhost:${PORT}/api/register`);
    console.log(`🔐 Login: POST http://localhost:${PORT}/api/login`);
    console.log(`💓 Health: GET http://localhost:${PORT}/api/health`);
});

export default app;