import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm'

const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/${id}`)
        if (!response.ok) throw new Error('Failed to fetch student')
        const data = await response.json()
        setStudent(data)
      } catch (err) {
        alert('Failed to fetch student')
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [id])

  const handleUpdate = async (updatedStudent) => {
    try {
      const response = await fetch(`http://localhost:5000/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      })
      if (!response.ok) throw new Error('Failed to update student')
      navigate('/')
    } catch (err) {
      alert('Failed to update student')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!student) return <p>Student not found.</p>

  return (
    <div className="container">
      <h1>Edit Student</h1>
      <StudentForm initialData={student} onSubmit={handleUpdate} />
    </div>
  )
}

export default EditStudent
