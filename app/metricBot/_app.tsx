// pages/_app.tsx
import { SearchProvider } from '@/components/chatbot/SearchProvider'

function MyApp({ Component, pageProps }: any) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  )
}

export default MyApp
