import React, { useState, useEffect } from 'react'

const StudentForm = ({ initialData = { name: '', age: '', grade: '' }, onSubmit }) => {
  const [form, setForm] = useState(initialData)
  const [errors, setErrors] = useState({})

  useEffect(() => {
  setForm(initialData)
}, [JSON.stringify(initialData)])


  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.age || isNaN(form.age) || form.age <= 0) newErrors.age = 'Valid age is required'
    if (!form.grade.trim()) newErrors.grade = 'Grade is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div>
        <label>Name:</label><br />
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>Age:</label><br />
        <input name="age" type="number" value={form.age} onChange={handleChange} />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div>
        <label>Grade:</label><br />
        <input name="grade" value={form.grade} onChange={handleChange} />
        {errors.grade && <p className="error">{errors.grade}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default StudentForm
