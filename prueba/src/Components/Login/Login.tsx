import { useState  } from "react";
import '../Styles/Login.css';

export const Login = () =>{

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
    }
}