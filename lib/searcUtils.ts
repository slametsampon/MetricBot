// lib/searchUtils.ts
import { allBlogs } from '@/.contentlayer/generated'
import { createFuseInstance } from './fuseConfig'
import { normalizeText } from '../utils/textUtils'

// export function getBlogData() {
//   return allBlogs.map((blog) => ({
//     id: blog._id,
//     title: blog.title,
//     tags: blog.tags,
//     summary: blog.summary,
//     //content: blog.content,
//   }))
// }

export function getBlogData() {
  return allBlogs.map((blog) => ({
    id: blog._id,
    title: normalizeText(blog.title),
    summary: normalizeText(blog.summary),
    tags: normalizeText(blog.tags),
    //content: normalizeText(blog.content),
  }))
}

export function searchBlogs(query: string) {
  const data = getBlogData()
  const fuse = createFuseInstance(data)
  return fuse.search(query)
}
