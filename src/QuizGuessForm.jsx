import React from 'react'

export default function QuizGuessForm({ guess, setGuess, onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center gap-4'>
      <input
        type='text'
        className='bg-gray-900 text-yellow-200 border border-gray-600 rounded px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-yellow-300 w-40'
        placeholder='Your guess (e.g. C3)'
        value={guess}
        onChange={e => setGuess(e.target.value)}
        disabled={disabled}
      />
      <button
        type='submit'
        className='bg-yellow-300 text-gray-900 font-bold px-6 py-2 rounded shadow hover:bg-yellow-400 transition disabled:opacity-50'
        disabled={disabled || guess.trim() === ''}
      >
        Submit Guess
      </button>
    </form>
  )
}
