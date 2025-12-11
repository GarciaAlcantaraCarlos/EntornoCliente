import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListaAutores from "./pages/ListaAutores";
import DetalleAutor from './pages/DetalleAutor';
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Todos los autores</Link>
          <Link to="/autor/nuevo">Nuevo autor</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ListaAutores />} />
          <Route path="/autor/:id" element={<DetalleAutor />} />
          {/* <Route path="/autor/nuevo" element={<DetalleCarta />} />
          <Route path="/autor/:id/editar" element={<EditarCarta />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
