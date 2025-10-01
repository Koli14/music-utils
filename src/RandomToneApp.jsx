import React, { useState, useEffect, useRef } from 'react'

const NOTES = [
  { name: 'E2', freq: 82.41 },
  { name: 'F2', freq: 87.31 },
  { name: 'F#2', freq: 92.5 },
  { name: 'G2', freq: 98.0 },
  { name: 'G#2', freq: 103.83 },
  { name: 'A2', freq: 110.0 },
  { name: 'A#2', freq: 116.54 },
  { name: 'B2', freq: 123.47 },
  { name: 'C3', freq: 130.81 },
  { name: 'C#3', freq: 138.59 },
  { name: 'D3', freq: 146.83 },
  { name: 'D#3', freq: 155.56 },
  { name: 'E3', freq: 164.81 },
  { name: 'F3', freq: 174.61 },
  { name: 'F#3', freq: 185.0 },
  { name: 'G3', freq: 196.0 },
  { name: 'G#3', freq: 207.65 },
  { name: 'A3', freq: 220.0 },
  { name: 'A#3', freq: 233.08 },
  { name: 'B3', freq: 246.94 },
  { name: 'C4', freq: 261.63 },
  { name: 'C#4', freq: 277.18 },
  { name: 'D4', freq: 293.66 },
  { name: 'D#4', freq: 311.13 },
  { name: 'E4', freq: 329.63 },
  { name: 'F4', freq: 349.23 },
  { name: 'F#4', freq: 369.99 },
  { name: 'G4', freq: 392.0 },
]

function isHalfTone(noteName) {
  return noteName.includes('#')
}

export default function RandomToneApp() {
  const [duration, setDuration] = useState(3)
  const [fromNote, setFromNote] = useState('C3')
  const [toNote, setToNote] = useState('C4')
  const [includeHalftones, setIncludeHalftones] = useState(false)
  const [lastTone, setLastTone] = useState(null)
  const [toneDisplay, setToneDisplay] = useState('Current Tone: None')
  const timeoutRef = useRef(null)
  const audioCtxRef = useRef(null)
  const oscRef = useRef(null)

  const getNoteRange = () => {
    const allNotes = NOTES.filter(
      note => includeHalftones || !isHalfTone(note.name)
    )
    const fromIdx = allNotes.findIndex(n => n.name === fromNote)
    const toIdx = allNotes.findIndex(n => n.name === toNote)
    if (fromIdx === -1 || toIdx === -1 || fromIdx > toIdx) return []
    return allNotes.slice(fromIdx, toIdx + 1)
  }

  const stopTone = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (oscRef.current) {
      oscRef.current.stop()
      oscRef.current.disconnect()
      oscRef.current = null
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
  }

  const playTone = (note, durationMs) => {
    // Always stop previous sound before starting a new one
    stopTone()
    setToneDisplay(`Current Tone: ${note.name}`)
    setLastTone(note)
    // Create a new AudioContext and Oscillator for every play
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = note.freq
    osc.connect(ctx.destination)
    osc.start()
    audioCtxRef.current = ctx
    oscRef.current = osc
    timeoutRef.current = setTimeout(() => {
      osc.stop()
      ctx.close()
      oscRef.current = null
      audioCtxRef.current = null
      timeoutRef.current = null
    }, durationMs * 1000)
  }

  const playRandomTone = () => {
    const notes = getNoteRange()
    if (notes.length === 0) return
    const idx = Math.floor(Math.random() * notes.length)
    const randomNote = notes[idx]
    playTone(randomNote, duration)
  }

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Enter') {
        stopTone()
        playRandomTone()
      } else if (e.code === 'Space') {
        if (timeoutRef.current) {
          // If a tone is playing, stop it
          stopTone()
        } else if (lastTone) {
          // If nothing is playing, play last tone
          playTone(lastTone, duration)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const notes = NOTES.filter(note => includeHalftones || !isHalfTone(note.name))

  return (
    <div className='bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto mt-12 p-8'>
      <h1 className='text-yellow-300 text-2xl font-bold text-center mb-6'>
        Random Tone App
      </h1>
      <form
        id='settings'
        onSubmit={e => e.preventDefault()}
        className='mb-4 space-y-4'
      >
        <label className='block text-gray-200 mb-2'>
          <span className='mr-2'>Duration (s):</span>
          <input
            type='number'
            min='1'
            max='10'
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className='bg-gray-900 text-gray-100 border border-gray-600 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-yellow-300'
          />
        </label>
        <label className='block text-gray-200 mb-2'>
          <span className='mr-2'>From:</span>
          <select
            value={fromNote}
            onChange={e => setFromNote(e.target.value)}
            className='bg-gray-900 text-gray-100 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-300'
          >
            {notes.map(note => (
              <option key={note.name} value={note.name}>
                {note.name}
              </option>
            ))}
          </select>
        </label>
        <label className='block text-gray-200 mb-2'>
          <span className='mr-2'>To:</span>
          <select
            value={toNote}
            onChange={e => setToNote(e.target.value)}
            className='bg-gray-900 text-gray-100 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-300'
          >
            {notes.map(note => (
              <option key={note.name} value={note.name}>
                {note.name}
              </option>
            ))}
          </select>
        </label>
        <label className='block text-gray-200 mb-2 flex items-center'>
          <input
            type='checkbox'
            checked={includeHalftones}
            onChange={e => setIncludeHalftones(e.target.checked)}
            className='accent-yellow-300 mr-2'
          />
          Include half tones (sharps/flats)
        </label>
      </form>
      <p
        id='tone-display'
        className='bg-gray-900 text-yellow-300 rounded px-4 py-2 text-center text-lg mb-2'
      >
        {toneDisplay}
      </p>
      <p className='text-gray-400 text-center'>
        Press the <span className='font-bold'>Spacebar</span> to repeat the last
        tone or <span className='font-bold'>Enter</span> to play a new tone.
      </p>
    </div>
  )
}
