import { useEffect, useState } from 'react';
import {
  getAllHomes,
  deleteHome
} from '../../services/homeService';
import { HomeData } from '../../model/home';
import './HomeList.css';

const HomeList = () => {
  const [homes, setHomes] = useState<HomeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHomes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllHomes();
      setHomes(data);
    } catch (err) {
        console.error(err);
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar este registro?');
    if (!confirm) return;

    try {
      await deleteHome(id);
      setHomes(homes.filter(home => home.id !== id));
    } catch (err) {
        console.error(err);
      alert('Error al eliminar el registro.');
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  return (
    <div className="home-list-container">
      <h2>Información de Home</h2>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="home-list">
        {homes.map(home => (
          <li key={home.id} className="home-item">
            <h3>{home.name} — {home.title}</h3>
            <p>{home.description}</p>
            <p><strong>Experiencia:</strong> {home.year_experience} años</p>
            <p><strong>Proyectos:</strong> {home.completed_projects} — <strong>Clientes:</strong> {home.satisfied_clients}</p>
            <div className="home-links">
              <a href={home.github} target="_blank">GitHub</a>
              <a href={home.linkedin} target="_blank">LinkedIn</a>
              <a href={home.instagram} target="_blank">Instagram</a>
              <a href={home.x} target="_blank">X</a>
              <a href={home.cv} target="_blank">CV</a>
            </div>
            <p><strong>Correo:</strong> {home.correo}</p>
            <button onClick={() => handleDelete(home.id)} className="delete-button">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeList;
