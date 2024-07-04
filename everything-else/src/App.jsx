import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="font-serif text-purple-800 text-9xl font-bold">「茈」</h1>
      <body className="fixed left-0 top-0 w-screen h-screen -z-10 bg-murasaki bg-cover"></body>
    </>
  )
}

export default App
