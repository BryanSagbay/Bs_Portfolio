import { useEffect, useState } from 'react';
import { getAllHomes, updateHome } from '../../services/homeService';
import { HomeData } from '../../model/home';
import './HomeEditor.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeEditor = () => {
  const [formData, setFormData] = useState<Omit<HomeData, 'id'> | null>(null);
  const [recordId, setRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHomes();
        if (data.length > 0) {
          const { id, ...rest } = data[0];
          setRecordId(id);
          setFormData(rest);
        } else {
          setError('No data available');
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error loading data');
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
      toast.success('Home data updated successfully!');
    } catch (err) {
      console.error('Error saving changes:', err);
      toast.error('Error saving changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="button-icon">⟳</div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!formData) return null;

  const formatLabel = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <form className="home-editor-form" onSubmit={handleSubmit}>
      <ToastContainer />

      <div className="form-header">
        <h2>Edit Home Information</h2>
      </div>

      <div className="form-grid">
        {Object.entries(formData).map(([key, value]) => {
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default HomeEditor;
