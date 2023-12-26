import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { EdgeStoreProvider } from '@/lib/edgestore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daily',
  description: 'Flashcard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  )
}
