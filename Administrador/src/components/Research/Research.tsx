import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Research } from '../../model/research'
import { createResearch, deleteResearch, getAllResearch, updateResearch } from '../../services/researchService'
import "./Research.css"

const ITEMS_PER_PAGE = 5

export default function ResearchList() {
  const [researchList, setResearchList] = useState<Research[]>([])
  const [filteredList, setFilteredList] = useState<Research[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [editing, setEditing] = useState<Research | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<Omit<Research, 'id'>>({
    title: '',
    description: '',
    date: '',
    timeread: '',
    article: '',
    link: '',
    comingsoon: false
  })

  const token = localStorage.getItem('token') || ''

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const data = await getAllResearch()
        setResearchList(data)
        setFilteredList(data)
      } catch (err) {
        setError('Error al cargar investigaciones')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResearch()
  }, [])

  useEffect(() => {
    const filtered = researchList.filter(r =>
      r.title.toLowerCase().includes(filter.toLowerCase()) ||
      r.description.toLowerCase().includes(filter.toLowerCase())
    )
    setFilteredList(filtered)
    setCurrentPage(1)
  }, [filter, researchList])

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE)
  const currentItems = filteredList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
  
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleEdit = (item: Research) => {
    setEditing(item)
    setForm({
      title: item.title,
      description: item.description,
      date: item.date.substring(0, 10),
      timeread: item.timeread,
      article: item.article,
      link: item.link,
      comingsoon: item.comingsoon
    })
    openModal()
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Deseas eliminar esta investigación?')) {
      await deleteResearch(id, token)
      const updated = await getAllResearch()
      setResearchList(updated)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editing) {
      await updateResearch(editing.id, form, token)
    } else {
      await createResearch(form, token)
    }
    const updated = await getAllResearch()
    setResearchList(updated)
    resetForm()
    closeModal()
  }

  const openModal = () => {
    setIsModalOpen(true)
    // Prevenir el scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  const resetForm = () => {
    setEditing(null)
    setForm({
      title: '',
      description: '',
      date: '',
      timeread: '',
      article: '',
      link: '',
      comingsoon: false
    })
  }

  const handleNewResearch = () => {
    resetForm()
    openModal()
  }

  const handleCancelForm = () => {
    closeModal()
    resetForm()
  }

  if (loading) return <p className="loading">Cargando investigaciones...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="research-container">
      <div className="research-header">
        <h1 className="research-title">Investigaciones</h1>

        <div className="top-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar investigación..."
              className="search-input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button 
            className="new-research-button"
            onClick={handleNewResearch}
          >
            Nueva investigación
          </button>
        </div>
      </div>

      {currentItems.length === 0 ? (
        <p className="no-results">No se encontraron investigaciones.</p>
      ) : (
        <ul className="research-list">
          {currentItems.map((r) => (
            <li key={r.id} className="research-item">
              <h2 className="research-item-title">
                {r.title}
              </h2>
              <div className="research-meta">
                <span className="research-date">{new Date(r.date).toLocaleDateString()}</span>
                <span className="research-time">{r.timeread}</span>
                {r.comingsoon && <span className="coming-soon-badge">Próximamente</span>}
              </div>
              <p className="research-description">{r.description}</p>
              <div className="research-footer">
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-link"
                >
                  Leer artículo completo
                </a>
                <div className="action-buttons">
                  <button onClick={() => handleEdit(r)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(r.id)} className="delete-button">Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Paginación */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="pagination-button"
        >
          ← Anterior
        </button>
        <span className="page-info">Página {currentPage} de {totalPages || 1}</span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="pagination-button"
        >
          Siguiente →
        </button>
      </div>

      {/* Modal para crear/editar investigación */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              {editing ? 'Editar Investigación' : 'Nueva Investigación'}
            </h2>
            <button className="modal-close" onClick={closeModal}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="form-grid">
            <input 
              name="title" 
              value={form.title} 
              onChange={handleChange} 
              placeholder="Título" 
              className="form-input" 
              required 
            />
            
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              placeholder="Descripción" 
              className="form-textarea" 
              required 
            />
            
            <input 
              name="date" 
              type="date" 
              value={form.date} 
              onChange={handleChange} 
              className="form-input" 
              required 
            />
            
            <input 
              name="timeread" 
              value={form.timeread} 
              onChange={handleChange} 
              placeholder="Tiempo de lectura" 
              className="form-input" 
              required 
            />
            
            <textarea 
              name="article" 
              value={form.article} 
              onChange={handleChange} 
              placeholder="Artículo completo" 
              className="form-textarea" 
              required 
            />
            
            <input 
              name="link" 
              value={form.link} 
              onChange={handleChange} 
              placeholder="Enlace externo" 
              className="form-input" 
              required 
            />
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="comingsoon" 
                checked={form.comingsoon} 
                onChange={handleChange} 
                className="form-checkbox"
              /> 
              Próximamente
            </label>

            <div className="form-buttons">
              <button 
                type="button" 
                onClick={handleCancelForm} 
                className="cancel-button"
              >
                Cancelar
              </button>
              <button type="submit" className="submit-button">
                {editing ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}