import URL from '@/hooks/useURL'

export function useLocalImage(path: string) {
  console.log('import.meta.url', import.meta.url, new URL(import.meta.url))

  if (!path) return path
  return import.meta.url
}
