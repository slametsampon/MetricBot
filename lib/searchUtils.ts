// lib/searchUtils.ts
import { allBlogs } from '@/.contentlayer/generated'
import { createFuseInstance } from './fuseConfig'
import { normalizeText } from '@/utils/textUtils'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export function getBlogData() {
  const sortedBlogs = sortPosts(allBlogs)
  const blogs = allCoreContent(sortedBlogs)
  return blogs.map((blog) => ({
    title: normalizeText(blog.title),
    summary: blog.summary,
    tags: blog.tags,
  }))
}

export function searchBlogs(query: string) {
  const data = getBlogData()
  const fuse = createFuseInstance(data)
  return fuse.search(query)
}
