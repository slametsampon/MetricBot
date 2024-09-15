// components/MetricBot/SearchProvider.tsx
import React, { createContext, useContext, useState } from 'react'
import { getBlogData } from '@/lib/searchUtils'

const SearchContext = createContext<any>(null)

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchData, setSearchData] = useState(getBlogData())

  return <SearchContext.Provider value={{ searchData }}>{children}</SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)
