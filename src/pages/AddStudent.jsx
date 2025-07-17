import React from 'react'
import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'

const AddStudent = () => {
  const navigate = useNavigate()

  const handleAdd = async (student) => {
    try {
      const response = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: student.name,
          age: Number(student.age),
          grade: student.grade,
        }),
      })

      if (!response.ok) throw new Error('Failed to add student')

      navigate('/')
    } catch (err) {
      alert('Failed to add student')
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h1>Add Student</h1>
      <StudentForm onSubmit={handleAdd} />
    </div>
  )
}

export default AddStudent
