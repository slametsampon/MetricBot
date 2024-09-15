// lib/displayUtils.ts
import { truncateText } from '@/utils/textUtils'

export function getFormattedBlogSummary(summary: string): string {
  return truncateText(summary, 100) // Truncate to 100 characters
}
