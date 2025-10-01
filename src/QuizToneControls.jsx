import React from 'react'

export default function QuizToneControls({ onNewTone, onRepeatTone }) {
  return (
    <div className='flex justify-center gap-4 mb-4'>
      <button
        className='bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded shadow hover:bg-yellow-400 transition disabled:opacity-50'
        onClick={e => {
          e.preventDefault()
          onNewTone()
        }}
      >
        New Tone (N/Skip)
      </button>
      <button
        className='bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded shadow hover:bg-yellow-400 transition disabled:opacity-50'
        onClick={e => {
          e.preventDefault()
          onRepeatTone()
        }}
      >
        Play/Stop (Space)
      </button>
    </div>
  )
}
