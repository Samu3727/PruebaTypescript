import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');

// Crear directorio data si no existe
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

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

// Función para guardar los usuarios en el archivo
const saveUsers = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al guardar archivo de usuarios:', error);
        throw error;
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, hobbies } = req.body;

        console.log('Solicitud de registro recibida:', { name, email });

        // Validaciones básicas
        if (!name || !email || !password || !hobbies) {
            console.log('Validación fallida: campos faltantes');
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Email inválido:', email);
            return res.status(400).json({ message: 'Email no válido' });
        }

        // Validar contraseña (al menos 6 caracteres, una mayúscula y un número)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            console.log('Contraseña no válida');
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número' });
        }

        // Validar que hobbies sea un array
        if (!Array.isArray(hobbies) || hobbies.length === 0) {
            console.log('Hobbies inválidos');
            return res.status(400).json({ message: 'Debe proporcionar al menos un hobby' });
        }

        // Leer usuarios existentes
        const users = readUsers();
        console.log(`Total de usuarios actuales: ${users.length}`);

        // Verificar si el email ya está registrado
        const userExists = users.some(u => u.email === email);
        if (userExists) {
            console.log('Email duplicado:', email);
            return res.status(400).json({ message: 'Este email ya está registrado' });
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            hobbies,
            createdAt: new Date().toISOString()
        };

        // Guardar nuevo usuario
        users.push(newUser);
        saveUsers(users);

        console.log('Usuario registrado exitosamente:', { id: newUser.id, name, email });

        res.status(201).json({ 
            message: 'Registro exitoso',
            user: {
                id: newUser.id,
                name,
                email,
                hobbies
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};