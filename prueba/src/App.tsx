import { useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import './App.css';
import { Login } from './Components/Login/Login';
import Register from './Components/Register/Register';

interface UserData {
  correo: string;
  contrasena: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleLoginSuccess = (userData: UserData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Rutas usando react-router
  const routes = useRoutes([
    {
      path: "/login",
      element: currentUser ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />
    },
    {
      path: "/register",
      element: currentUser ? <Navigate to="/" /> : <Register />
    },
    {
      path: "/",
      element: currentUser ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Bienvenido, {currentUser.correo}</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <Navigate to="/login" />
      )
    },
    {
      path: "*",
      element: <Navigate to="/" />
    }
  ]);

  return routes;
}

export default App;
