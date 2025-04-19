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
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

    try {
      if (isEditing && currentProject.id !== undefined) {
        await updateProject(currentProject.id, projectData, imageFile!)
        toast.success('Project updated successfully!')
      } else {
        await createProject(projectData, imageFile!)
        toast.success('Project created successfully!')
      }

      setModalOpen(false)
      setImageFile(null)
      setPreviewUrl(null)
      loadProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Error saving the project. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id)
        toast.success('Project deleted successfully!')
        loadProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        toast.error('Error deleting the project.')
      }
    }
  }

  const indexOfLast = currentPage * ITEMS_PER_PAGE
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE
  const currentItems = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <div className="project-list-container">
      <ToastContainer />

      <div className="project-header">
        <h1>Projects</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAdd}>
            Add Project
          </button>
        </div>
      </div>

      <div className="project-list">
        {currentItems.map((p) => (
          <div key={p.id} className="project-card">
            <div className="project-info">
              <span className="project-type">{p.type}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                See more
              </a>
              <div className="projects-footer">
                <div className="project-actions">
                  <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            </div>
            <div className="project-image">
              <img
                src={`${import.meta.env.VITE_API_IMAGES}${p.imagen}`}
                alt={p.title}
              />
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
          ← Back
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button
          className="btn-page"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next →
        </button>
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <form onSubmit={handleSubmit} className="project-form">
              <h2>{isEditing ? 'Edit Project' : 'New Project'}</h2>

              <div className="form-group">
                <label>Title</label>
                <input name="title" value={currentProject.title || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input name="type" value={currentProject.type || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input name="description" value={currentProject.description || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setImageFile(file)
                      setPreviewUrl(URL.createObjectURL(file))
                    }
                  }}
                />
              </div>
              {(previewUrl || currentProject.imagen) && (
                <div className="image-preview">
                  <img
                    src={previewUrl || `${import.meta.env.VITE_API_IMAGES}${currentProject.imagen}`}
                    alt="Preview"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Index</label>
                <input
                  name="indice"
                  type="number"
                  value={currentProject.indice || 0}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input name="link" value={currentProject.link || ''} onChange={handleChange} />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
