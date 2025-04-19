import { useEffect, useState } from 'react';
import { getAllHomes, updateHome } from '../../services/homeService';
import { HomeData } from '../../model/home';
import './HomeEditor.css';

const HomeEditor = () => {
  const [formData, setFormData] = useState<Omit<HomeData, 'id'> | null>(null);
  const [recordId, setRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHomes();
        if (data.length > 0) {
          const { id, ...rest } = data[0];
          setRecordId(id);
          setFormData(rest);
        } else {
          setError('No hay datos disponibles');
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: ['year_experience', 'completed_projects', 'satisfied_clients'].includes(name)
        ? Number(value)
        : value
    } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || recordId === null) return;

    setSaving(true);
    setError(null);
    try {
      await updateHome(recordId, formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Error al guardar los cambios');
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="button-icon">⟳</div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!formData) return null;

  // Función para formatear las etiquetas de los campos
  const formatLabel = (key: string) => {
    return key.replace(/_/g, ' ');
  };

  return (
    <form className="home-editor-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Edit Home Information</h2>
        {success && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            Data updated correctly
          </div>
        )}
      </div>

      <div className="form-grid">
        {Object.entries(formData).map(([key, value]) => {
          // Manejamos el campo de descripción separado
          if (key === 'description') return null;
          
          return (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{formatLabel(key)}</label>
              {typeof value === 'string' ? (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          );
        })}
        
        <div className="form-group description-group">
          <label htmlFor="description">{formatLabel('description')}</label>
          <textarea
            id="description"
            name="description"
            value={formData.description as string}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="button-container">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={saving}
          >
            {saving && <span className="button-icon">⟳</span>}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default HomeEditor;