// components/MetricBot/SearchBar.tsx
'use client'

import React, { useState } from 'react'
import { getFormattedBlogSummary } from '@/lib/displayUtils'
import { searchBlogs } from '@/lib/searchUtils'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useDebouncedCallback } from 'use-debounce'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleSearch = useDebouncedCallback(async (query: string) => {
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
  }, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value
    setQuery(searchQuery)
    handleSearch(searchQuery)
  }

  return (
    <div className="search-bar p-4 max-w-md mx-auto">
      <div className="relative flex flex-1 flex-shrink-0">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Cari blog..."
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />
        <MagnifyingGlassIcon className="absolute -left-5 h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
      </div>{' '}
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
