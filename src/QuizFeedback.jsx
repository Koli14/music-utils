import React from 'react'

export default function QuizFeedback({ feedback, showAnswer, currentTone }) {
  if (!feedback) return null
  return (
    <div className='mt-4 text-center text-lg'>
      <span>{feedback}</span>
      {showAnswer && (
        <span className='ml-2 text-gray-400'>
          (Answer:{' '}
          <span className='font-mono text-yellow-300'>{currentTone?.name}</span>
          )
        </span>
      )}
    </div>
  )
}
