import React, { useState, useMemo } from 'react'
import {
  ROOTS,
  TYPES,
  EXTENSIONS,
  getChordBySelection,
} from './musicChordUtils'
import GuitarChordDiagram from './GuitarChordDiagram'

export default function DisplayJazzChord() {
  const [root, setRoot] = useState(ROOTS[0])
  const [typeIndex, setTypeIndex] = useState(0)
  const [extIndex, setExtIndex] = useState(0)
  const showDiagram = true

  const type = TYPES[typeIndex]
  const ext = EXTENSIONS[extIndex]

  const chord = useMemo(
    () => getChordBySelection(root, type, ext),
    [root, type, ext],
  )

  const chordTypeLabel = type.label === '' ? 'Major' : 'Minor'
  const extLabel = ext.label || 'Base'

  return (
    <div className='bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto mt-12 p-8'>
      <h1 className='text-yellow-300 text-2xl font-bold text-center mb-6'>
        Display Jazz Chord
      </h1>
      <div className='flex flex-col gap-4'>
        {/* Root note */}
        <div className='flex flex-col gap-1'>
          <label className='text-yellow-200 font-semibold text-sm'>
            Root Note
          </label>
          <select
            className='bg-gray-900 text-yellow-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            value={root}
            onChange={e => {
              setRoot(e.target.value)
            }}
          >
            {ROOTS.map(r => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Major / Minor */}
        <div className='flex flex-col gap-1'>
          <label className='text-yellow-200 font-semibold text-sm'>
            Quality
          </label>
          <select
            className='bg-gray-900 text-yellow-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            value={typeIndex}
            onChange={e => {
              setTypeIndex(Number(e.target.value))
            }}
          >
            {TYPES.map((t, i) => (
              <option key={i} value={i}>
                {i === 0 ? 'Major' : 'Minor'}
              </option>
            ))}
          </select>
        </div>

        {/* Extension */}
        <div className='flex flex-col gap-1'>
          <label className='text-yellow-200 font-semibold text-sm'>
            Extension
          </label>
          <select
            className='bg-gray-900 text-yellow-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            value={extIndex}
            onChange={e => {
              setExtIndex(Number(e.target.value))
            }}
          >
            {EXTENSIONS.map((ex, i) => (
              <option key={i} value={i}>
                {i === 0 ? 'Base' : ex.label}
              </option>
            ))}
          </select>
        </div>

        {/* Chord name display */}
        <div className='text-3xl font-mono text-yellow-200 bg-gray-900 rounded px-8 py-4 shadow text-center'>
          {chord.name || `${root} ${chordTypeLabel}`}
        </div>

        {showDiagram && chord.diagram && (
          <div className='flex flex-col items-center mt-2'>
            <GuitarChordDiagram diagram={chord.diagram} />
          </div>
        )}
      </div>

      <p className='text-gray-400 text-center mt-6 text-sm'>
        Select a root, quality, and extension, then check the chord diagram.
      </p>
    </div>
  )
}
