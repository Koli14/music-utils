import React, { useState } from 'react'
import RandomToneApp from './RandomToneApp'
import Quiz from './Quiz'
import RandomJazzChord from './RandomJazzChord'
import DisplayJazzChord from './DisplayJazzChord'
import './App.css'

function App() {
  const [page, setPage] = useState('quiz')

  return (
    <div className='flex min-h-screen bg-gray-900 w-full'>
      <aside className='w-56 bg-gray-800 text-yellow-300 py-10 flex flex-col items-center shadow-lg border-r border-gray-700'>
        <h2 className='mb-10 text-lg font-semibold tracking-wide'>Menu</h2>
        <nav className='w-full flex flex-col gap-2'>
          <button
            className={`w-full text-left px-8 py-3 rounded-lg font-bold transition-colors duration-150 border-l-4 ${
              page === 'quiz'
                ? 'bg-yellow-300 text-gray-800 border-yellow-400 shadow-md'
                : 'bg-transparent text-yellow-300 border-transparent hover:bg-yellow-300 hover:text-gray-800 hover:border-yellow-400'
            }`}
            onClick={() => setPage('quiz')}
          >
            Quiz
          </button>
          <button
            className={`w-full text-left px-8 py-3 rounded-lg font-bold transition-colors duration-150 border-l-4 ${
              page === 'random-tone'
                ? 'bg-yellow-300 text-gray-800 border-yellow-400 shadow-md'
                : 'bg-transparent text-yellow-300 border-transparent hover:bg-yellow-300 hover:text-gray-800 hover:border-yellow-400'
            }`}
            onClick={() => setPage('random-tone')}
          >
            Random Tone
          </button>
          <button
            className={`w-full text-left px-8 py-3 rounded-lg font-bold transition-colors duration-150 border-l-4 ${
              page === 'random-jazz-chord'
                ? 'bg-yellow-300 text-gray-800 border-yellow-400 shadow-md'
                : 'bg-transparent text-yellow-300 border-transparent hover:bg-yellow-300 hover:text-gray-800 hover:border-yellow-400'
            }`}
            onClick={() => setPage('random-jazz-chord')}
          >
            Random Jazz Chord
          </button>
          <button
            className={`w-full text-left px-8 py-3 rounded-lg font-bold transition-colors duration-150 border-l-4 ${
              page === 'display-jazz-chord'
                ? 'bg-yellow-300 text-gray-800 border-yellow-400 shadow-md'
                : 'bg-transparent text-yellow-300 border-transparent hover:bg-yellow-300 hover:text-gray-800 hover:border-yellow-400'
            }`}
            onClick={() => setPage('display-jazz-chord')}
          >
            Display Jazz Chord
          </button>
        </nav>
      </aside>
      <main className='flex-1 m-2'>
        {page === 'random-tone' ? (
          <RandomToneApp />
        ) : page === 'random-jazz-chord' ? (
          <RandomJazzChord />
        ) : page === 'display-jazz-chord' ? (
          <DisplayJazzChord />
        ) : (
          <Quiz />
        )}
      </main>
    </div>
  )
}

export default App
