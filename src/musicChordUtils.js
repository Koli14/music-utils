// musicChordUtils.js
// Utilities for jazz chord generation and fretboard logic

// Chord roots and types
export const ROOTS = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]
export const TYPES = [
  { name: '', label: '' },
  { name: 'm', label: 'm' },
]
export const EXTENSIONS = [
  { name: '', label: '' },
  { name: 'maj7', label: 'maj7' },
  { name: '7', label: '7' },
  { name: '6', label: '6' },
]

// Map root note to fret for 6th and 5th string (E and A string)
export const rootToFret6 = {
  C: 8,
  'C#': 9,
  D: 10,
  'D#': 11,
  E: 12,
  F: 1,
  'F#': 2,
  G: 3,
  'G#': 4,
  A: 5,
  'A#': 6,
  B: 7,
}
export const rootToFret5 = {
  C: 3,
  'C#': 4,
  D: 5,
  'D#': 6,
  E: 7,
  F: 8,
  'F#': 9,
  G: 10,
  'G#': 11,
  A: 12,
  'A#': 1,
  B: 2,
}

// Main generator for random jazz chord and diagram

// Helper for 6th string root voicings
function get6thStringVoicing(fret, type, ext) {
  switch (ext.name) {
    case '':
      return type.name === ''
        ? [fret, 'X', fret + 2, fret + 1, 'X', 'X']
        : [fret, 'X', fret + 2, fret, 'X', 'X']
    case 'maj7':
      return type.name === ''
        ? [fret, 'X', fret + 1, fret + 1, 'X', 'X']
        : [fret, 'X', fret + 1, fret, 'X', 'X']
    case '7':
      return type.name === ''
        ? [fret, 'X', fret, fret + 1, 'X', 'X']
        : [fret, 'X', fret, fret, 'X', 'X']
    case '6':
      return type.name === ''
        ? [fret, 'X', fret - 1, fret + 1, 'X', 'X']
        : [fret, 'X', fret - 1, fret, 'X', 'X']
    default:
      return ['X', 0, 2, 2, 'X', 'X']
  }
}

// Helper for 5th string root voicings
function get5thStringVoicing(fret, type, ext) {
  switch (ext.name) {
    case '':
      return type.name === ''
        ? ['X', fret, fret - 1, fret + 2, 'X', 'X']
        : ['X', fret, fret - 2, fret + 2, 'X', 'X']
    case 'maj7':
      return type.name === ''
        ? ['X', fret, fret - 1, fret + 1, 'X', 'X']
        : ['X', fret, fret - 2, fret + 1, 'X', 'X']
    case '7':
      return type.name === ''
        ? ['X', fret, fret - 1, fret, 'X', 'X']
        : ['X', fret, fret - 2, fret, 'X', 'X']
    case '6':
      return type.name === ''
        ? ['X', fret, fret - 1, fret - 1, 'X', 'X']
        : ['X', fret, fret - 2, fret - 1, 'X', 'X']
    default:
      return ['X', 0, 2, 2, 'X', 'X']
  }
}

export function getChordBySelection(root, type, ext) {
  const chordName = root + type.label + (ext.label ? ' ' + ext.label : '')
  const fret6 = rootToFret6[root]
  const fret5 = rootToFret5[root]
  const use6 = fret6 <= fret5

  let diagram = use6
    ? get6thStringVoicing(fret6, type, ext)
    : get5thStringVoicing(fret5, type, ext)

  diagram = diagram.map(f => (typeof f === 'number' && f > 12 ? 'X' : f))
  return { name: chordName, diagram }
}

export function getRandomChord() {
  const root = ROOTS[Math.floor(Math.random() * ROOTS.length)]
  const type = TYPES[Math.floor(Math.random() * TYPES.length)]
  const ext = EXTENSIONS[Math.floor(Math.random() * EXTENSIONS.length)]
  const chordName = root + type.label + (ext.label ? ' ' + ext.label : '')
  const fret6 = rootToFret6[root]
  const fret5 = rootToFret5[root]
  const use6 = fret6 <= fret5

  let diagram = use6
    ? get6thStringVoicing(fret6, type, ext)
    : get5thStringVoicing(fret5, type, ext)

  // Convert to 'X' for impossible frets (e.g. > 12)
  diagram = diagram.map(f => (typeof f === 'number' && f > 12 ? 'X' : f))
  console.log('diagram: ', diagram)
  return chordName ? { name: chordName, diagram } : { name: '', diagram: null }
}
