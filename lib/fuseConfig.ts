// lib/fuseConfig.ts
import Fuse from 'fuse.js'

const options: Fuse.IFuseOptions<any> = {
  includeScore: true,
  keys: [
    { name: 'title', weight: 0.7 }, // Bobot lebih besar untuk title
    { name: 'tags', weight: 0.2 }, // Bobot sedang untuk tags
    { name: 'summary', weight: 0.1 }, // Bobot lebih kecil untuk summary
  ],
  threshold: 0.3, // Sensitivitas pencarian; semakin kecil nilai, semakin ketat pencarian
}

export const createFuseInstance = (data: any[]) => new Fuse(data, options)
