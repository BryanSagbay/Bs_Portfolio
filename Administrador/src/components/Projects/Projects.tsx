import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent
} from 'react'
import { ProjectData } from '../../model/projects'
import { createProject, deleteProject, getProjects, updateProject } from '../../services/projectService'


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

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [projects, filterText])

  const loadProjects = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const applyFilter = () => {
    const lower = filterText.toLowerCase()
    const result = projects.filter(p =>
      p.title.toLowerCase().includes(lower)
    )
    setFiltered(result)
    setCurrentPage(1)
  }

  const handleEdit = (project: ProjectData) => {
    setCurrentProject(project)
    setIsEditing(true)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setCurrentProject(emptyProject)
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
    if (isEditing && currentProject.id !== undefined) {
      await updateProject(currentProject.id, currentProject as ProjectData)
    } else {
      await createProject(currentProject as Omit<ProjectData, 'id'>)
    }
    setModalOpen(false)
    loadProjects()
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro que deseas eliminar este proyecto?')) {
      await deleteProject(id)
      loadProjects()
    }
  }

  // Paginación
  const indexOfLast = currentPage * ITEMS_PER_PAGE
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE
  const currentItems = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>

      {/* Filtro */}
      <input
        type="text"
        placeholder="Buscar por título..."
        className="border p-2 mb-4 w-full"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAdd}
      >
        Agregar Proyecto
      </button>

      {/* Lista */}
      <ul>
        {currentItems.map((p) => (
          <li key={p.id} className="border p-2 mb-2 flex justify-between items-center">
            <div>
              <strong>{p.title}</strong> ({p.type}) - {p.description}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(p)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(p.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ← Anterior
        </button>
        <span className="px-4 py-1">Página {currentPage} de {totalPages}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente →
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-96"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h2>

            <input
              className="border p-2 w-full mb-2"
              name="title"
              value={currentProject.title || ''}
              onChange={handleChange}
              placeholder="Título"
            />
            <input
              className="border p-2 w-full mb-2"
              name="type"
              value={currentProject.type || ''}
              onChange={handleChange}
              placeholder="Tipo"
            />
            <input
              className="border p-2 w-full mb-2"
              name="description"
              value={currentProject.description || ''}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <input
              className="border p-2 w-full mb-2"
              name="imagen"
              value={currentProject.imagen || ''}
              onChange={handleChange}
              placeholder="URL Imagen"
            />

            {/* Preview de imagen */}
            {currentProject.imagen && (
              <img
                src={currentProject.imagen}
                alt="Preview"
                className="w-full h-40 object-cover mb-2 border rounded"
              />
            )}

            <input
              className="border p-2 w-full mb-2"
              name="indice"
              type="number"
              value={currentProject.indice || 0}
              onChange={handleChange}
              placeholder="Índice"
            />
            <input
              className="border p-2 w-full mb-4"
              name="link"
              value={currentProject.link || ''}
              onChange={handleChange}
              placeholder="Link"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
