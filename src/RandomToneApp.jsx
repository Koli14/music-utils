import React, { useState, useEffect, useRef } from 'react'
import { NOTES, isHalfTone } from './musicConstants'
import { getNoteRange, playTone, stopTone } from './musicUtils'

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

  const getNotes = () =>
    getNoteRange(NOTES, fromNote, toNote, includeHalftones, isHalfTone)

  // Use playTone/stopTone from utils

  const playRandomTone = () => {
    const notes = getNotes()
    if (notes.length === 0) return
    const idx = Math.floor(Math.random() * notes.length)
    const randomNote = notes[idx]
    setToneDisplay(`Current Tone: ${randomNote.name}`)
    setLastTone(randomNote)
    playTone(randomNote, duration, { audioCtxRef, oscRef, timeoutRef })
  }

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Enter') {
        stopTone({ audioCtxRef, oscRef, timeoutRef })
        playRandomTone()
      } else if (e.code === 'Space') {
        if (timeoutRef.current) {
          stopTone({ audioCtxRef, oscRef, timeoutRef })
        } else if (lastTone) {
          playTone(lastTone, duration, { audioCtxRef, oscRef, timeoutRef })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const notes = getNotes()

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
      <div className='flex justify-center gap-4 mb-4'>
        <button
          className='bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded shadow hover:bg-yellow-400 transition disabled:opacity-50'
          onClick={e => {
            e.preventDefault()
            playRandomTone()
          }}
        >
          New Tone (Enter)
        </button>
        <button
          className='bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded shadow hover:bg-yellow-400 transition disabled:opacity-50'
          onClick={e => {
            e.preventDefault()
            if (timeoutRef.current) {
              stopTone({ audioCtxRef, oscRef, timeoutRef })
            } else if (lastTone) {
              playTone(lastTone, duration, { audioCtxRef, oscRef, timeoutRef })
            }
          }}
        >
          Play/Stop (Space)
        </button>
      </div>
      <p className='text-gray-400 text-center'>
        Press the <span className='font-bold'>Spacebar</span> to repeat/stop the
        last tone or <span className='font-bold'>Enter</span> to play a new
        tone.
      </p>
    </div>
  )
}
