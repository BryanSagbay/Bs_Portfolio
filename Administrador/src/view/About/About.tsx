import { useEffect, useState } from "react"
import { About as AboutModel } from "../../model/about"
import { getAllAbout, updateAbout } from "../../services/aboutService"
import "./About.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const About = () => {
  const [about, setAbout] = useState<AboutModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAllAbout()
        if (data.length > 0) setAbout(data[0])
      } catch (error) {
        console.error("Error loading profile:", error)
        toast.error("Error loading profile data.")
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
    try {
      const updated = await updateAbout(about.id, about)
      setAbout(updated)
      toast.success("Profile updated successfully!")

      // Smooth scroll to toast area
      setTimeout(() => {
        const toastContainer = document.querySelector('.Toastify__toast-container')
        toastContainer?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("An error occurred while saving.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="about-container">
      <div className="loader">Loading profile...</div>
    </div>
  )

  if (!about) return (
    <div className="about-container">
      <div className="loader">Profile information not found</div>
    </div>
  )

  return (
    <div className="about-container">
      <ToastContainer />

      <div className="about-card">
        <div className="card-header">
          <h1>Profile Information</h1>
        </div>

        <div className="card-body">
          <div className="about-photo-container">
            <img src={about.photo} alt={about.name} className="about-photo" />
            <div className="form-group">
              <label htmlFor="photo">Photo URL</label>
              <input
                type="text"
                id="photo"
                name="photo"
                value={about.photo}
                onChange={handleChange}
                placeholder="Photo URL"
              />
            </div>
          </div>

          <div className="form-content">
            <div className="form-section">
              <h2 className="section-title">Personal Information</h2>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={about.name}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={about.title}
                  onChange={handleChange}
                  placeholder="Professional title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={about.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={about.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mail">Email</label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={about.mail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Highlighted Phrases</h2>
              <div className="phrases-container">
                {about.phrases.map((phrase, index) => (
                  <div className="form-group" key={index}>
                    <label htmlFor={`phrase-${index}`}>Phrase {index + 1}</label>
                    <input
                      id={`phrase-${index}`}
                      type="text"
                      value={phrase}
                      onChange={(e) => handlePhrasesChange(index, e.target.value)}
                      placeholder={`Highlighted phrase ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">About Me</h2>
              <div className="form-group">
                <label htmlFor="about-text">Short Description</label>
                <textarea
                  id="about-text"
                  name="about"
                  value={about.about}
                  onChange={handleChange}
                  placeholder="Brief description about yourself"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Extended Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={about.description}
                  onChange={handleChange}
                  placeholder="Detailed professional profile description"
                  rows={6}
                />
              </div>
            </div>

            <div className="save-button-container">
              <button
                className={`save-button ${saving ? 'saving-pulse' : ''}`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
