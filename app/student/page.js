'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LOCATIONS = [
  'JLN Boys Hostel', 'JLN Girls Hostel', 'Ibn Batuta Boys Hostel',
  'Ibn Sina Girls Hostel', 'SEST', 'CL Building', 'Parking',
  'Canteen', 'Sports Complex',
]

export default function StudentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    name: '', 
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('campus-user')
    if (!savedUser) {
      router.push('/login') 
    } else {
      const user = JSON.parse(savedUser)
      setFormData(prev => ({ ...prev, name: user.name }))
    }
  }, [router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')

    try {
      const response = await fetch('/api/submit-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessMessage(`✅ Issue submitted successfully! AI Priority: ${result.priority}`)
        setFormData(prev => ({ ...prev, description: '', location: '' }))
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      alert('Failed to submit issue: ' + error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Report Campus Issue</h1>
        <p>Welcome back, <strong>{formData.name}</strong>. Describe the problem below.</p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reporting As</label>
            <input
              type="text"
              name="name"
              className="form-input"
              style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
              value={formData.name}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Issue Description *</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="e.g., 'Wifi not working in the study room'"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <select
              name="location"
              className="form-select"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select location...</option>
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : '🚀 Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  )
}