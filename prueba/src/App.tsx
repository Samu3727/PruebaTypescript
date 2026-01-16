import { useRoutes } from "react-router-dom";
import './App.css'
import Register from "./Components/Register/Register";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "*", element: <Register />}
  ]);

  return routes;
}

function App() {
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
