export const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        if (username === 'admin' && password === 'password') {
            res.status(200).json({ message: 'Login exitoso' });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}