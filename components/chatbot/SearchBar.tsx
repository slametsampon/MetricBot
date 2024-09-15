// components/MetricBot/SearchBar.tsx
import React, { useState } from 'react'
import { searchBlogs } from '@/lib/searchUtils'
import { getFormattedBlogSummary } from '@/lib/displayUtils'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value
    setQuery(searchQuery)
    if (searchQuery) {
      const result = searchBlogs(searchQuery)
      setResults(
        result.map((r) => ({
          ...r.item,
          summary: getFormattedBlogSummary(r.item.summary),
        }))
      ) // Apply formatting to summary
    } else {
      setResults([])
    }
  }

  return (
    <div className="search-bar p-4 max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Cari blog..."
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="search-results mt-4">
        {results.map((result) => (
          <li
            key={result.id}
            className="search-result-item p-4 border-b last:border-b-0 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            <h3 className="text-lg font-semibold">{result.title}</h3>
            <p className="text-gray-700">{result.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
