import Image from 'next/image'
import PirateTodo from './components/pirate-todo'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Image
        src="/treasure-map.jpg"
        alt="Treasure Map Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="relative z-10">
        <PirateTodo />
      </div>
    </main>
  )
}
