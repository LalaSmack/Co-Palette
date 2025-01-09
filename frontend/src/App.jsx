import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Co-Palette</h1>
      <div className="card">
        <button>
          Start Drawing!
        </button>
      </div>
    </>
  )
}

export default App
