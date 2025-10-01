// src/musicUtils.js

/**
 * Returns a filtered and sliced array of notes based on range and halftone inclusion.
 * @param {Array} notes - The array of note objects.
 * @param {string} fromNote - The starting note name.
 * @param {string} toNote - The ending note name.
 * @param {boolean} includeHalftones - Whether to include half tones.
 * @param {function} isHalfTone - Function to check if a note is a half tone.
 * @returns {Array} - The filtered note range.
 */
export function getNoteRange(
  notes,
  fromNote,
  toNote,
  includeHalftones,
  isHalfTone
) {
  const allNotes = notes.filter(
    note => includeHalftones || !isHalfTone(note.name)
  )
  const fromIdx = allNotes.findIndex(n => n.name === fromNote)
  const toIdx = allNotes.findIndex(n => n.name === toNote)
  if (fromIdx === -1 || toIdx === -1 || fromIdx > toIdx) return []
  return allNotes.slice(fromIdx, toIdx + 1)
}

/**
 * Plays a tone using the Web Audio API.
 * @param {Object} note - The note object with freq property.
 * @param {number} durationSec - Duration in seconds.
 * @param {Object} refs - { audioCtxRef, oscRef, timeoutRef }
 */
export function playTone(note, durationSec, refs) {
  stopTone(refs)
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = note.freq
  osc.connect(ctx.destination)
  osc.start()
  refs.audioCtxRef.current = ctx
  refs.oscRef.current = osc
  refs.timeoutRef.current = setTimeout(() => {
    osc.stop()
    ctx.close()
    refs.oscRef.current = null
    refs.audioCtxRef.current = null
    refs.timeoutRef.current = null
  }, durationSec * 1000)
}

/**
 * Stops any currently playing tone.
 * @param {Object} refs - { audioCtxRef, oscRef, timeoutRef }
 */
export function stopTone(refs) {
  if (refs.timeoutRef.current) {
    clearTimeout(refs.timeoutRef.current)
    refs.timeoutRef.current = null
  }
  if (refs.oscRef.current) {
    refs.oscRef.current.stop()
    refs.oscRef.current.disconnect()
    refs.oscRef.current = null
  }
  if (refs.audioCtxRef.current) {
    refs.audioCtxRef.current.close()
    refs.audioCtxRef.current = null
  }
}
