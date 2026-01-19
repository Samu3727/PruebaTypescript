export const register = async (req, res) => {

    try {
        const { correo, contrasena } = req.body;
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}