import RegisterComponent from "./RegisterComponents";
import type { User } from "./RegisterComponents";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const handleRegister = (user: User): boolean => {
  const storedUsers = localStorage.getItem("users");
  const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

  const exists = users.some(u => u.email === user.email);
  if (exists) {
    alert("Este email ya está registrado");
    return false;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registro exitoso");
  return true;
};

const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <div className={styles.modal}>
        <h3>¡Regístrate ahora!</h3>
        <RegisterComponent onSubmit={handleRegister} />
        <h4>¿Ya tienes cuenta? 
          <button type="button" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
        </h4>
      </div>
    </main>
  );
};

export default Register;
