// GuitarChordDiagram.jsx
// SVG diagram component for guitar chord shapes
import React from 'react'

export default function GuitarChordDiagram({ diagram }) {
  if (!diagram) {
    return (
      <div className='text-red-400 text-center mt-2'>Diagram not available</div>
    )
  }
  // Render a simple SVG diagram
  // 6 strings, dynamic number of frets
  const stringCount = 6
  const fretWidth = 24
  const fretHeight = 28
  // nutHeight is not used since we always show from base fret
  // Find min/max fret (ignore X and 0)
  const frets = diagram.filter(f => typeof f === 'number' && f > 0)
  const minFret = 0
  const maxFret = Math.max(4, ...frets)
  // Always show at least 5 frets
  const fretCount = Math.max(5, maxFret - minFret + 1)
  const yOffset = 24
  return (
    <svg
      width={fretWidth * (stringCount - 1) + 32}
      height={fretHeight * fretCount + 40}
    >
      {/* Nut */}
      <rect
        x={16}
        y={yOffset}
        width={fretWidth * (stringCount - 1)}
        height={6}
        fill='#bbb'
      />
      {/* Frets */}
      {[...Array(fretCount + 1)].map((_, i) => (
        <line
          key={'fret' + i}
          x1={16}
          y1={yOffset + i * fretHeight}
          x2={16 + fretWidth * (stringCount - 1)}
          y2={yOffset + i * fretHeight}
          stroke='#888'
          strokeWidth={i === 0 ? 3 : 1}
        />
      ))}
      {/* Strings */}
      {[...Array(stringCount)].map((_, i) => (
        <line
          key={'string' + i}
          x1={16 + i * fretWidth}
          y1={yOffset}
          x2={16 + i * fretWidth}
          y2={yOffset + fretHeight * fretCount}
          stroke='#aaa'
          strokeWidth={1.5}
        />
      ))}
      {/* Dots for finger positions */}
      {diagram.map((fret, i) => {
        if (fret === 'X' || fret === 0) return null
        // Place dot so fret 1 is between 1st and 2nd fret lines
        const y = yOffset + fretHeight * (fret - 1 + 0.5)
        return (
          <circle
            key={'dot' + i}
            cx={16 + i * fretWidth}
            cy={y}
            r={7}
            fill='#facc15'
            stroke='#333'
            strokeWidth={2}
          />
        )
      })}
      {/* X and O above nut */}
      {diagram.map((fret, i) => (
        <text
          key={'xo' + i}
          x={16 + i * fretWidth}
          y={yOffset - 6}
          textAnchor='middle'
          fontSize='16'
          fill={fret === 'X' ? '#f87171' : '#a3e635'}
          fontWeight='bold'
        >
          {fret === 'X' ? 'X' : fret === 0 ? 'O' : ''}
        </text>
      ))}
      {/* Fret numbers for 5th and 7th frets (if visible) */}
      {[5, 7].map(fretNum => {
        // Only show if the fret is within the displayed range
        if (fretNum >= 0 && fretNum <= fretCount) {
          return (
            <text
              key={'fret-label-' + fretNum}
              x={8}
              y={yOffset + fretHeight * fretNum - fretHeight / 2 + 6}
              fontSize='14'
              fill='#fbfbfbff'
              textAnchor='end'
            >
              {fretNum}
            </text>
          )
        }
        return null
      })}
    </svg>
  )
}
