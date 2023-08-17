import './globals.css'
import type {Metadata} from 'next'
import {Figtree} from 'next/font/google'
import Header from "@/components/Header";
import ToasterProvider from "@/providers/ToasterProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";

const font = Figtree({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Capyforum',
  description: 'Watch capybara forum',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={font.className}>
      <ToasterProvider />
      <SupabaseProvider>
        <UserProvider>
          <Header>
            {children}
          </Header>
        </UserProvider>
      </SupabaseProvider>

      </body>
    </html>
  )
}
