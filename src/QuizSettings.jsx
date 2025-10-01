import React from 'react'

export default function QuizSettings({
  duration,
  setDuration,
  fromNote,
  setFromNote,
  toNote,
  setToNote,
  includeHalftones,
  setIncludeHalftones,
  notes,
}) {
  return (
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
  )
}
