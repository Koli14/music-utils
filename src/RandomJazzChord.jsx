import React, { useState, useEffect } from 'react'
import { getRandomChord } from './musicChordUtils'
import GuitarChordDiagram from './GuitarChordDiagram'

export default function RandomJazzChord() {
  const [chord, setChord] = useState(null)
  const [display, setDisplay] = useState(false)

  const showChord = React.useCallback(() => {
    setChord(getRandomChord())
    setDisplay(false)
  }, [])
  const displayChord = React.useCallback(() => {
    setDisplay(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Space') {
        e.preventDefault()
        showChord()
      } else if (e.code === 'Enter') {
        e.preventDefault()
        displayChord()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showChord, displayChord])

  return (
    <div className='bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto mt-12 p-8'>
      <h1 className='text-yellow-300 text-2xl font-bold text-center mb-6'>
        Random Jazz Chord
      </h1>
      <div className='flex flex-col items-center gap-4'>
        <button
          className='bg-yellow-300 text-gray-900 font-bold px-6 py-2 rounded shadow hover:bg-yellow-400 transition mb-2'
          onClick={showChord}
        >
          Show Random Chord (Space)
        </button>
        <button
          className='bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded shadow hover:bg-yellow-400 transition mb-2'
          onClick={displayChord}
          disabled={!chord}
        >
          Display (Enter)
        </button>
        {chord && (
          <div className='text-3xl font-mono text-yellow-200 bg-gray-900 rounded px-8 py-4 shadow text-center'>
            {chord.name}
          </div>
        )}
        {display && chord && chord.diagram && (
          <div className='flex flex-col items-center mt-2'>
            <GuitarChordDiagram diagram={chord.diagram} />
          </div>
        )}
      </div>
      <p className='text-gray-400 text-center mt-6'>
        Press <span className='font-bold'>Spacebar</span> for a new chord,{' '}
        <span className='font-bold'>Enter</span> to display the diagram.
        <br />
        Chords: C–B, major/minor, with base, maj7, 7, or 6.
      </p>
    </div>
  )
}
