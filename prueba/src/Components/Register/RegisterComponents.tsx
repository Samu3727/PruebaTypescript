import { useState } from "react";
import styles from "./register.module.css";

export interface User {
    name: string;
    email: string;
    password: string;
    hobbies: string[];
}

interface Props {
    onSubmit: (user: User) => boolean;
}

const RegisterComponent = ({ onSubmit }: Props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hobbies, setHobbies] = useState<string[]>([""]);

    const addHobby = () => setHobbies([...hobbies, ""]);

    const updateHobby = (index: number, value: string) => {
        const updated = [...hobbies];
        updated[index] = value;
        setHobbies(updated);
    };
    const removeHobby = (index: number) => {
        setHobbies(hobbies.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!passwordRegex.test(password)) {
            alert("La contraseña debe al menos 6 caracteres, una mayúscula y un número");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email no válido");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const success = onSubmit({
            name,
            email,
            password,
            hobbies: hobbies.filter(h => h.trim())
        });

        if (success) {
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setHobbies([""]);
        }
    };


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <aside>
                <label>Nombre</label>
                <input value={name} onChange={e => setName(e.target.value)} required />
            </aside>

            <aside>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </aside>

            <aside>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </aside>

            <aside>
                <label>Confirmar Contraseña</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </aside>

            <aside>
                <label>Hobbies</label>

                {hobbies.map((hobby, index) => (
                    <div key={index} className={styles.hobbyRow}>
                        <input
                            value={hobby}
                            placeholder="Ingresa un hobby"
                            onChange={e => updateHobby(index, e.target.value)}
                        />

                        {hobbies.length > 1 && (
                            <button type="button" onClick={() => removeHobby(index)}>
                                ❌
                            </button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={addHobby}>
                    + Agregar hobby
                </button>
            </aside>

            <button type="submit">Registrar</button>
        </form>
    );
};

export default RegisterComponent;