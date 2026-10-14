import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Si Chbile — Joyeux anniversaire',
  description:
    'Célébrons ensemble l’anniversaire de la librairie Si Chbile : lectures, rencontres et passion partagée.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <style>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
