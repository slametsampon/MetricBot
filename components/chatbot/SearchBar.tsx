// components/MetricBot/SearchBar.tsx
'use client'

import React, { useState } from 'react'
import { getFormattedBlogSummary } from '@/lib/displayUtils'
import { searchBlogs } from '@/lib/searchUtils'
import SearchEntry from './SearchEntry'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async (query: string) => {
    setQuery(query)
    if (query) {
      const result = searchBlogs(query)
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
      <SearchEntry onSearchChange={handleSearch} />
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
