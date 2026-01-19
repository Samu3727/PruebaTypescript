import { useState  } from "react";
import '../Styles/Login.css';
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    email: string;
    password: string;
    hobbies: string[];
}

interface Loginprops {

    onLoginSuccess: (userData: { email: string; password: string }) => void;
}

export const Login = ({ onLoginSuccess }: Loginprops) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError('');

        // Validar campos vacíos
        if (!email || !password) {
            setError('Correo y contraseña son requeridos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar también en localStorage para sincronización
                const storedUsers = localStorage.getItem("users");
                const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
                const userExists = users.find(u => u.email === email);
                if (!userExists) {
                    users.push({ name: data.user.name, email: email, password: password, hobbies: [] });
                    localStorage.setItem("users", JSON.stringify(users));
                }
                onLoginSuccess({ email, password });
            } else {
                setError(data.message || 'Error en el login');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
            console.error('Error:', err);
        }
    }

    const navigate = useNavigate();

    return (

    <div className="contenedorLogin">
        <form className="formLogin" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <button type="submit">Ingresar</button>
        </form>
         <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          ¿No tienes cuenta?{" "}
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate("/register")}
          >
            Regístrate
          </button>
        </p>
    </div>
)
}


export default Login;