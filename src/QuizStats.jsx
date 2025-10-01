import React from 'react'

export default function QuizStats({ stats, onReset }) {
  return (
    <div className='mb-4 flex flex-col items-center'>
      <div className='text-yellow-200 text-sm mb-1'>
        <span className='font-bold'>Quiz Statistics</span>
      </div>
      <div className='flex gap-4 text-gray-300 text-sm flex-wrap justify-center'>
        <span>
          Total: <span className='font-mono'>{stats.total}</span>
        </span>
        <span>
          Correct:{' '}
          <span className='font-mono text-green-400'>{stats.correct}</span>
        </span>
        <span>
          Incorrect:{' '}
          <span className='font-mono text-red-400'>{stats.incorrect}</span>
        </span>
        <span>
          Skipped:{' '}
          <span className='font-mono text-yellow-400'>{stats.skipped}</span>
        </span>
        {stats.total > 0 && (
          <span>
            Accuracy:{' '}
            <span className='font-mono'>
              {Math.round((stats.correct / stats.total) * 100)}%
            </span>
          </span>
        )}
      </div>
      <button
        className='mt-2 bg-gray-700 text-yellow-200 px-3 py-1 rounded hover:bg-yellow-300 hover:text-gray-900 transition text-xs font-bold border border-yellow-300'
        onClick={onReset}
      >
        Reset Statistics
      </button>
    </div>
  )
}
