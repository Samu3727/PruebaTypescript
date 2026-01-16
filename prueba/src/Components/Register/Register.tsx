import RegisterComponent from "./RegisterComponents";
import type { User } from "./RegisterComponents";
import styles from "./register.module.css";

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


  return (
    <main className={styles.container}>
      <div className={styles.modal}>
        <h3>¡Regístrate ahora!</h3>
        <RegisterComponent onSubmit={handleRegister} />
      </div>
    </main>
  );
};

export default Register;
