import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

// Función para leer los usuarios del archivo
const readUsers = () => {
    try {
        if (fs.existsSync(usersFilePath)) {
            const data = fs.readFileSync(usersFilePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error al leer archivo de usuarios:', error);
        return [];
    }
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // Leer los usuarios del archivo
        const users = readUsers();

        // Buscar el usuario por email
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Validar contraseña
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Login exitoso - devolver datos del usuario sin contraseña
        res.status(200).json({
            message: 'Login exitoso',
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}