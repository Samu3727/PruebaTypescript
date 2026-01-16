import { useState  } from "react";
import '../Styles/Login.css';

export const Login = () =>{

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
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