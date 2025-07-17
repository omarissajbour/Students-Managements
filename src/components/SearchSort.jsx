import React from 'react'

const SearchSort = ({ searchTerm, setSearchTerm, sortKey, setSortKey }) => {
  return (
    <div className="search-sort">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
        <option value="grade">Grade</option>
      </select>
    </div>
  )
}

export default SearchSort
