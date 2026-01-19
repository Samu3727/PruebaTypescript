import RegisterComponent from "./RegisterComponents";
import type { User } from "./RegisterComponents";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (user: User): boolean => {
    // También guardar en localStorage para que funcione localmente
    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const exists = users.some(u => u.email === user.email);
    if (exists) {
      return false;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Redirigir al login después del registro
    setTimeout(() => {
      navigate("/login");
    }, 500);
    return true;
  };

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
