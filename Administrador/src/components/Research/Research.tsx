import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Research } from '../../model/research'
import { createResearch, deleteResearch, getAllResearch, updateResearch } from '../../services/researchService'


const ITEMS_PER_PAGE = 5

export default function ResearchList() {
  const [researchList, setResearchList] = useState<Research[]>([])
  const [filteredList, setFilteredList] = useState<Research[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [editing, setEditing] = useState<Research | null>(null)
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
    setEditing(null)
    setForm({ title: '', description: '', date: '', timeread: '', article: '', link: '', comingsoon: false })
  }

  if (loading) return <p>Cargando investigaciones...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Investigaciones</h1>

      <input
        type="text"
        placeholder="Buscar investigación..."
        className="w-full border p-2 rounded mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {currentItems.length === 0 ? (
        <p>No se encontraron investigaciones.</p>
      ) : (
        <ul className="grid gap-4">
          {currentItems.map((r) => (
            <li key={r.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                {r.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(r.date).toLocaleDateString()} • {r.timeread} {r.comingsoon && <span className="text-orange-600 font-semibold ml-2">Próximamente</span>}
              </p>
              <p className="text-gray-700 mb-2">{r.description}</p>
              <div className="flex justify-between items-center">
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Leer artículo completo ↗
                </a>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(r)} className="text-sm text-yellow-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(r.id)} className="text-sm text-red-600 hover:underline">Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>
        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente →
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mt-10 grid gap-4 border-t pt-6">
        <h2 className="text-xl font-semibold">{editing ? 'Editar Investigación' : 'Nueva Investigación'}</h2>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="border p-2 rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="border p-2 rounded" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded" required />
        <input name="timeread" value={form.timeread} onChange={handleChange} placeholder="Tiempo de lectura" className="border p-2 rounded" required />
        <textarea name="article" value={form.article} onChange={handleChange} placeholder="Artículo completo" className="border p-2 rounded" required />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Enlace externo" className="border p-2 rounded" required />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="comingsoon" checked={form.comingsoon} onChange={handleChange} /> Próximamente
        </label>

        <div className="flex justify-end gap-4">
          {editing && (
            <button type="button" onClick={() => setEditing(null)} className="text-gray-600">Cancelar</button>
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  )
}
