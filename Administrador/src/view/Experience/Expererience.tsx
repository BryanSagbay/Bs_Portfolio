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
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        try {
            const data = await getAllExperiences()
            setExperiences(data)
        } catch (error) {
            toast.error("Failed to load experiences.")
        }
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
        const { name, value, type } = e.target
        const parsedValue = type === 'checkbox' && e.target instanceof HTMLInputElement
            ? e.target.checked
            : value

        setCurrentExperience((prev) => ({ ...prev, [name]: parsedValue }))
    }

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

        try {
            if (isEditing && currentExperience.id !== undefined) {
                await updateExperience(currentExperience.id, data)
                toast.success('Experience updated successfully!')
            } else {
                await createExperience(data)
                toast.success('Experience created successfully!')
            }

            setModalOpen(false)
            loadExperiences()
        } catch (error) {
            toast.error('There was an error saving the experience.')
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            try {
                await deleteExperience(id)
                toast.success('Experience deleted successfully!')
                loadExperiences()
            } catch (error) {
                toast.error('Error deleting experience.')
            }
        }
    }

    return (
        <div className="experience-container">
            <ToastContainer />

            <div className="experience-header">
                <h1>Work Experience</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by company..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button className="btn-primary" onClick={handleAdd}>
                        Add Experience
                    </button>
                </div>
            </div>

            <div className="experience-list">
                {currentItems.map((exp) => (
                    <div key={exp.id} className="experience-card">
                        <div className="experience-content">
                            <h3>{exp.company}</h3>
                            <span className={`status ${exp.active ? 'active' : 'inactive'}`}>
                                {exp.active ? 'Current' : 'Ended'}
                            </span>
                            <p><strong>Position:</strong> {exp.position}</p>
                            <p><strong>Period:</strong> {exp.period}</p>
                            <p><strong>Schedule:</strong> {exp.schedule}</p>
                            <p><strong>Technologies:</strong> {exp.technologies_used.join(', ')}</p>
                            <p><strong>Projects:</strong></p>
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
                            <button className="btn-edit" onClick={() => handleEdit(exp)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(exp.id)}>Delete</button>
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
                        ← Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn-page"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}

            {modalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-container">
                        <form onSubmit={handleSubmit} className="modal-form">
                            <h2>{isEditing ? 'Edit Experience' : 'New Experience'}</h2>

                            <div className="form-group">
                                <label>Company</label>
                                <input name="company" value={currentExperience.company || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Position</label>
                                <input name="position" value={currentExperience.position || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Period</label>
                                <input name="period" value={currentExperience.period || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Schedule</label>
                                <input name="schedule" value={currentExperience.schedule || ''} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Active?</label>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={currentExperience.active || false}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Projects */}
                            <div className="form-group dynamic-list">
                                <label>Projects</label>
                                {currentExperience.projects?.map((project, index) => (
                                    <div key={index} className="subgroup">
                                        <input
                                            type="text"
                                            placeholder="Project name"
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
                                                placeholder="Detail"
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
                                            + Detail
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
                                            Remove project
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
                                    + Project
                                </button>
                            </div>

                            {/* Technologies */}
                            <div className="form-group dynamic-list">
                                <label>Technologies Used</label>
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
                                            Remove
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
                                    + Technology
                                </button>
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
