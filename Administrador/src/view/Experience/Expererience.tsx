import {
    useEffect,
    useState,
    ChangeEvent,
    FormEvent,
    useCallback
} from 'react'
import {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} from '../../services/experienceService'
import './Experience.css'
import { Experience } from '../../model/experience'

const emptyExperience: Omit<Experience, 'id'> = {
    company: '',
    active: false,
    position: '',
    period: '',
    schedule: '',
    projects: [],
    technologies_used: []
}

const ITEMS_PER_PAGE = 1

export default function ExperienceList() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [filtered, setFiltered] = useState<Experience[]>([])
    const [currentItems, setCurrentItems] = useState<Experience[]>([])
    const [currentExperience, setCurrentExperience] = useState<Partial<Experience>>(emptyExperience)
    const [filterText, setFilterText] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const applyFilter = useCallback(() => {
        const lower = filterText.toLowerCase()
        const result = experiences.filter(exp =>
            exp.company.toLowerCase().includes(lower)
        )
        setFiltered(result)
        setCurrentPage(1)
    }, [experiences, filterText])

    useEffect(() => {
        loadExperiences()
    }, [])

    useEffect(() => {
        applyFilter()
    }, [applyFilter])

    useEffect(() => {
        const total = Math.ceil(filtered.length / ITEMS_PER_PAGE)
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        setCurrentItems(filtered.slice(start, end))
        setTotalPages(total)
    }, [filtered, currentPage])

    const loadExperiences = async () => {
        const data = await getAllExperiences()
        setExperiences(data)
    }

    const handleEdit = (exp: Experience) => {
        setCurrentExperience(exp)
        setIsEditing(true)
        setModalOpen(true)
    }

    const handleAdd = () => {
        setCurrentExperience(emptyExperience)
        setIsEditing(false)
        setModalOpen(true)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
      
        // Verifica si el elemento es un checkbox
        const parsedValue = type === 'checkbox' && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value;
      
        setCurrentExperience((prev) => ({ ...prev, [name]: parsedValue }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const data: Omit<Experience, 'id'> = {
            company: currentExperience.company!,
            active: currentExperience.active || false,
            position: currentExperience.position!,
            period: currentExperience.period!,
            schedule: currentExperience.schedule!,
            projects: currentExperience.projects || [],
            technologies_used: currentExperience.technologies_used || []
        }

        if (isEditing && currentExperience.id !== undefined) {
            await updateExperience(currentExperience.id, data)
        } else {
            await createExperience(data)
        }

        setModalOpen(false)
        loadExperiences()
    }

    const handleDelete = async (id: number) => {
        if (confirm('¿Deseas eliminar esta experiencia?')) {
            await deleteExperience(id)
            loadExperiences()
        }
    }

    return (
        <div className="experience-container">
            <div className="experience-header">
                <h1>Experiencia Laboral</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar por empresa..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button className="btn-primary" onClick={handleAdd}>
                        Agregar Experiencia
                    </button>
                </div>
            </div>

            <div className="experience-list">
                {currentItems.map((exp) => (
                    <div key={exp.id} className="experience-card">
                        <div className="experience-content">
                            <h3>{exp.company}</h3>
                            <span className={`status ${exp.active ? 'active' : 'inactive'}`}>
                                {exp.active ? 'Actual' : 'Finalizado'}
                            </span>
                            <p><strong>Puesto:</strong> {exp.position}</p>
                            <p><strong>Periodo:</strong> {exp.period}</p>
                            <p><strong>Horario:</strong> {exp.schedule}</p>
                            <p><strong>Tecnologías:</strong> {exp.technologies_used.join(', ')}</p>
                            <p><strong>Proyectos:</strong></p>
                            <ul>
                                {exp.projects.map((p, idx) => (
                                    <li key={idx}>
                                        <strong>{p.name}</strong>
                                        <ul>
                                            {p.details.map((d, i) => (
                                                <li key={i}>{d}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="experience-actions">
                            <button className="btn-edit" onClick={() => handleEdit(exp)}>Editar</button>
                            <button className="btn-delete" onClick={() => handleDelete(exp.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="btn-page"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        ← Anterior
                    </button>
                    <span className="page-info">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="btn-page"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Siguiente →
                    </button>
                </div>
            )}

            {modalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-container">
                        <form onSubmit={handleSubmit} className="modal-form">
                            <h2>{isEditing ? 'Editar Experiencia' : 'Nueva Experiencia'}</h2>

                            <div className="form-group">
                                <label>Empresa</label>
                                <input name="company" value={currentExperience.company || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Puesto</label>
                                <input name="position" value={currentExperience.position || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Periodo</label>
                                <input name="period" value={currentExperience.period || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Horario</label>
                                <input name="schedule" value={currentExperience.schedule || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>¿Está activo?</label>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={currentExperience.active || false}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Proyectos */}
                            <div className="form-group dynamic-list">
                                <label>Proyectos</label>
                                {currentExperience.projects?.map((project, index) => (
                                    <div key={index} className="subgroup">
                                        <input
                                            type="text"
                                            placeholder="Nombre del proyecto"
                                            value={project.name}
                                            onChange={(e) => {
                                                const newProjects = [...(currentExperience.projects || [])]
                                                newProjects[index].name = e.target.value
                                                setCurrentExperience({ ...currentExperience, projects: newProjects })
                                            }}
                                        />
                                        {project.details.map((detail, i) => (
                                            <textarea
                                                key={i}
                                                placeholder="Detalle"
                                                value={detail}
                                                onChange={(e) => {
                                                    const newProjects = [...(currentExperience.projects || [])]
                                                    newProjects[index].details[i] = e.target.value
                                                    setCurrentExperience({ ...currentExperience, projects: newProjects })
                                                }}
                                            />
                                        ))}
                                        <button
                                            type="button"
                                            className="btn-add"
                                            onClick={() => {
                                                const newProjects = [...(currentExperience.projects || [])]
                                                newProjects[index].details.push('')
                                                setCurrentExperience({ ...currentExperience, projects: newProjects })
                                            }}
                                        >
                                            + Detalle
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={() => {
                                                const newProjects = [...(currentExperience.projects || [])]
                                                newProjects.splice(index, 1)
                                                setCurrentExperience({ ...currentExperience, projects: newProjects })
                                            }}
                                        >
                                            Eliminar proyecto
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn-add"
                                    onClick={() => {
                                        const newProjects = [...(currentExperience.projects || []), { name: '', details: [''] }]
                                        setCurrentExperience({ ...currentExperience, projects: newProjects })
                                    }}
                                >
                                    + Proyecto
                                </button>
                            </div>

                            {/* Tecnologías */}
                            <div className="form-group dynamic-list">
                                <label>Tecnologías utilizadas</label>
                                {currentExperience.technologies_used?.map((tech, index) => (
                                    <div key={index} className="subgroup">
                                        <input
                                            type="text"
                                            value={tech}
                                            onChange={(e) => {
                                                const newTechs = [...(currentExperience.technologies_used || [])]
                                                newTechs[index] = e.target.value
                                                setCurrentExperience({ ...currentExperience, technologies_used: newTechs })
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn-remove"
                                            onClick={() => {
                                                const newTechs = [...(currentExperience.technologies_used || [])]
                                                newTechs.splice(index, 1)
                                                setCurrentExperience({ ...currentExperience, technologies_used: newTechs })
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn-add"
                                    onClick={() => {
                                        const newTechs = [...(currentExperience.technologies_used || []), '']
                                        setCurrentExperience({ ...currentExperience, technologies_used: newTechs })
                                    }}
                                >
                                    + Tecnología
                                </button>
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
