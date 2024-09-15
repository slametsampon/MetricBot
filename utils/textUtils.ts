// utils/textUtils.ts
export function normalizeText(text: string): string {
  return text
    .toLowerCase() // Ubah ke huruf kecil
    .replace(/[\W_]+/g, ' ') // Hapus karakter non-alfanumerik dan underscore
}

export function truncateText(text: string, length: number): string {
  return text.length > length ? `${text.substring(0, length)}...` : text
}
