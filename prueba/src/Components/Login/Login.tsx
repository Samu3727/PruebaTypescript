import { useState  } from "react";
import '../Styles/Login.css';

interface Loginprops {

    onLoginSuccess: (userData: { correo: string; contrasena: string }) => void;
}

export const Login = ({ onLoginSuccess }: Loginprops) => {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        onLoginSuccess({ correo, contrasena });
    }

    return (

    <div className="contenedorLogin">
        <form className="formLogin" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo electrónico" />
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" />
            <button type="submit">Ingresar</button>
        </form>
    </div>
)
}


export default Login;