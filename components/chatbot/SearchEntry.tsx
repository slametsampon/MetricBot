'use client'
import React, { ChangeEvent, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useDebouncedCallback } from 'use-debounce'

interface SearchEntryProps {
  onSearchChange: (value: string) => void
}

const SearchEntry: React.FC<SearchEntryProps> = ({ onSearchChange }) => {
  const [query, setQuery] = useState('')

  // Menggunakan useDebouncedCallback dengan delay 500ms
  const debouncedSearchChange = useDebouncedCallback((value: string) => {
    onSearchChange(value)
  }, 300) // 300ms delay

  // Fungsi yang dipanggil ketika input berubah
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value
    setQuery(searchQuery)
    debouncedSearchChange(searchQuery)
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Cari blog..."
        className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
      />
      <MagnifyingGlassIcon className="absolute -left-5 h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}

export default SearchEntry
