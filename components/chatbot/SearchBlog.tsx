'use client'

import { useState } from 'react'
import { searchBlog } from '@/lib/searchBlog' // Import fungsi pencarian

const SearchBlog = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  // Handle perubahan query pencarian
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)
    const searchResults = searchBlog(query) // Panggil fungsi pencarian
    setResults(searchResults)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Cari artikel blog..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Menampilkan hasil pencarian */}
      <ul className="mt-4">
        {results.length > 0 ? (
          results.map((blog) => (
            <li key={blog._id} className="mb-2">
              <a href={blog.url} className="text-blue-600 hover:underline">
                {blog.title}
              </a>
              <p>{blog.summary}</p>
            </li>
          ))
        ) : (
          <li className="text-gray-600">Tidak ada hasil yang cocok</li>
        )}
      </ul>
    </div>
  )
}

export default SearchBlog
