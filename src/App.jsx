import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentList from './pages/StudentList'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import './App.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="nav-link">Home</a>
      <a href="/add" className="nav-link">Add Student</a>
    </nav>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </>
  )
}

export default App
