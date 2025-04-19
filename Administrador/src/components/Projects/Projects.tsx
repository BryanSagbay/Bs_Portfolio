import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useCallback
} from 'react'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../../services/projectService'
import './Projects.css'
import { ProjectData } from '../../model/projects'

const ITEMS_PER_PAGE = 5

const emptyProject: Omit<ProjectData, 'id'> = {
  type: '',
  title: '',
  description: '',
  imagen: '',
  indice: 0,
  link: ''
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [filtered, setFiltered] = useState<ProjectData[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<ProjectData>>(emptyProject)
  const [isEditing, setIsEditing] = useState(false)
  const [filterText, setFilterText] = useState('')

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const applyFilter = useCallback(() => {
    const lower = filterText.toLowerCase()
    const result = projects.filter(p =>
      p.title.toLowerCase().includes(lower)
    )
    setFiltered(result)
    setCurrentPage(1)
  }, [projects, filterText])

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [applyFilter])

  const loadProjects = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const handleEdit = (project: ProjectData) => {
    setCurrentProject(project)
    setImageFile(null)
    setPreviewUrl(null)
    setIsEditing(true)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setCurrentProject(emptyProject)
    setImageFile(null)
    setPreviewUrl(null)
    setIsEditing(false)
    setModalOpen(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentProject((prev) => ({
      ...prev,
      [name]: name === 'indice' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const projectData: Omit<ProjectData, 'id'> = {
      type: currentProject.type!,
      title: currentProject.title!,
      description: currentProject.description!,
      imagen: currentProject.imagen || '',
      indice: currentProject.indice!,
      link: currentProject.link!
    }

    if (isEditing && currentProject.id !== undefined) {
      await updateProject(currentProject.id, projectData, imageFile!)
    } else {
      await createProject(projectData, imageFile!)
    }

    setModalOpen(false)
    setImageFile(null)
    setPreviewUrl(null)
    loadProjects()
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro que deseas eliminar este proyecto?')) {
      await deleteProject(id)
      loadProjects()
    }
  }

  const indexOfLast = currentPage * ITEMS_PER_PAGE
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE
  const currentItems = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <div className="project-list-container">
      <div className="project-header">
        <h1>Proyectos</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAdd}>
            Agregar Proyecto
          </button>
        </div>
      </div>

      <div className="project-list">
        {currentItems.map((p) => (
          <div key={p.id} className="project-card">
            <div className="project-image">
              <img src={`http://localhost:3000${p.imagen}`} alt={p.title} />
            </div>
            <div className="project-info">
              <span className="project-type">{p.type}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <a className="project-link" href={p.link} target="_blank">Ver más</a>
            </div>
            <div className="project-actions">
              <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
              <button className="btn-delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="btn-page"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ← Anterior
        </button>
        <span className="page-info">Página {currentPage} de {totalPages}</span>
        <button
          className="btn-page"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente →
        </button>
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <form onSubmit={handleSubmit} className="project-form">
              <h2>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>

              <div className="form-group">
                <label>Título</label>
                <input name="title" value={currentProject.title || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <input name="type" value={currentProject.type || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <input name="description" value={currentProject.description || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Imagen</label>
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setImageFile(file)
                    setPreviewUrl(URL.createObjectURL(file))
                  }
                }} />
              </div>
              {(previewUrl || currentProject.imagen) && (
                <div className="image-preview">
                  <img src={previewUrl || `http://localhost:3000${currentProject.imagen}`} alt="Preview" />
                </div>
              )}
              <div className="form-group">
                <label>Índice</label>
                <input name="indice" type="number" value={currentProject.indice || 0} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input name="link" value={currentProject.link || ''} onChange={handleChange} />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-submit">
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
