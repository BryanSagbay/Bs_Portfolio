import { useEffect, useState } from "react"
import { About as AboutModel } from "../../model/about"
import { getAllAbout, updateAbout } from "../../services/aboutService"
import "./About.css"

const About = () => {
  const [about, setAbout] = useState<AboutModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAllAbout()
        if (data.length > 0) setAbout(data[0])
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!about) return
    const { name, value } = e.target
    setAbout({ ...about, [name]: value })
  }

  const handlePhrasesChange = (index: number, value: string) => {
    if (!about) return
    const updatedPhrases = [...about.phrases]
    updatedPhrases[index] = value
    setAbout({ ...about, phrases: updatedPhrases })
  }

  const handleSave = async () => {
    if (!about) return
    setSaving(true)
    setMessage(null)
    try {
      const updated = await updateAbout(about.id, about)
      setAbout(updated)
      setMessage({type: 'success', text: 'Perfil actualizado correctamente'})
      // Smooth scroll to message
      setTimeout(() => {
        const alertElement = document.querySelector('.alert')
        alertElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch (error) {
      console.error("Error al guardar:", error)
      setMessage({type: 'error', text: 'Hubo un error al guardar'})
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="about-container">
      <div className="loader">Cargando perfil</div>
    </div>
  )
  
  if (!about) return (
    <div className="about-container">
      <div className="loader">No se encontró información del perfil</div>
    </div>
  )

  return (
    <div className="about-container">
      <div className="about-card">
        <div className="card-header">
          <h1>Información de Perfil</h1>
        </div>
        
        <div className="card-body">
          <div className="about-photo-container">
            <img src={about.photo} alt={about.name} className="about-photo" />
            <div className="form-group">
              <label htmlFor="photo">URL de la foto</label>
              <input
                type="text"
                id="photo"
                name="photo"
                value={about.photo}
                onChange={handleChange}
                placeholder="URL de la foto"
              />
            </div>
          </div>

          <div className="form-content">
            <div className="form-section">
              <h2 className="section-title">Datos personales</h2>
              
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={about.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={about.title}
                  onChange={handleChange}
                  placeholder="Título profesional"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Ubicación</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={about.location}
                  onChange={handleChange}
                  placeholder="Ciudad, País"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={about.phone}
                  onChange={handleChange}
                  placeholder="Número de teléfono"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mail">Correo electrónico</label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={about.mail}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Frases destacadas</h2>
              <div className="phrases-container">
                {about.phrases.map((phrase, index) => (
                  <div className="form-group" key={index}>
                    <label htmlFor={`phrase-${index}`}>Frase {index + 1}</label>
                    <input
                      id={`phrase-${index}`}
                      type="text"
                      value={phrase}
                      onChange={(e) => handlePhrasesChange(index, e.target.value)}
                      placeholder={`Frase destacada ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Descripción personal</h2>
              <div className="form-group">
                <label htmlFor="about-text">Sobre mí</label>
                <textarea
                  id="about-text"
                  name="about"
                  value={about.about}
                  onChange={handleChange}
                  placeholder="Breve descripción sobre ti"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción extendida</label>
                <textarea
                  id="description"
                  name="description"
                  value={about.description}
                  onChange={handleChange}
                  placeholder="Descripción más detallada de tu perfil profesional"
                  rows={6}
                />
              </div>
            </div>

            {message && (
              <div className={`alert alert-${message.type}`}>
                <span>{message.type === 'success' ? '✓' : '✕'}</span>
                {message.text}
              </div>
            )}

            <div className="save-button-container">
              <button 
                className={`save-button ${saving ? 'saving-pulse' : ''}`}
                onClick={handleSave} 
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About