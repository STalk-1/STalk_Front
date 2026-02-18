import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>STalk Front</h1>
      <button onClick={() => setCount((value) => value + 1)}>
        count is {count}
      </button>
    </main>
  )
}

export default App
