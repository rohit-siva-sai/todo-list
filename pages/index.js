import Image from 'next/image'
import { Inter } from 'next/font/google'
import Demo from './demo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={``}
    >
      <Demo/>
    </main>
  )
}
