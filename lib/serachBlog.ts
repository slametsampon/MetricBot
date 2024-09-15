import Fuse from 'fuse.js'
import { allBlogs } from '@/.contentlayer/generated'

// Konfigurasi Fuse.js dengan bobot
const options = {
  keys: [
    { name: 'title', weight: 0.7 }, // Bobot lebih besar untuk title
    { name: 'tags', weight: 0.2 }, // Bobot sedang untuk tags
    { name: 'summary', weight: 0.1 }, // Bobot lebih kecil untuk summary
  ],
  threshold: 0.3, // Sensitivitas pencarian
}

const fuse = new Fuse(allBlogs, options) // Membuat instance Fuse.js dengan data blog

// Fungsi untuk mencari blog berdasarkan query
export const searchBlog = (query: string) => {
  if (!query) return allBlogs // Jika query kosong, kembalikan semua blog
  const result = fuse.search(query)
  return result.map(({ item }) => item) // Mengembalikan hasil pencarian
}
