import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi'
import SearchSort from '../components/SearchSort'
import Pagination from '../components/Pagination'
import { FaEdit, FaTrash } from 'react-icons/fa'


const StudentList = () => {
  const { data: students, loading, error, setData } = useApi('http://localhost:5000/students')

  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // فلترة و فرز
  const filteredStudents = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (!sortKey) return 0
      if (sortKey === 'age') return a.age - b.age
      return a[sortKey].localeCompare(b[sortKey])
    })

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const currentStudents = filteredStudents.slice(startIdx, startIdx + itemsPerPage)

  // حذف طالب
const handleDelete = async (id) => {
  if (!window.confirm('Are you sure to delete this student?')) return
  try {
    const response = await fetch(`http://localhost:5000/students/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete student')
    setData(prev => prev.filter(s => s.id !== id))
  } catch (err) {
    alert('Failed to delete student')
  }
}
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortKey])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading students.</p>

  return (
    <div className="container">
      <h1>Students</h1>
      <SearchSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length === 0 ? (
            <tr><td colSpan="4">No students found.</td></tr>
          ) : (
            currentStudents.map(({ id, name, age, grade }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{age}</td>
                <td>{grade}</td>
                <td>
<Link to={`/edit/${id}`} className="icon-btn edit-btn">
    <FaEdit />
  </Link>
  <button onClick={() => handleDelete(id)} className="icon-btn delete-btn">
    <FaTrash />
  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default StudentList
