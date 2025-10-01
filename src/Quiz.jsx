import React, { useState, useEffect, useRef } from 'react'
import QuizStats from './QuizStats'
import QuizSettings from './QuizSettings'
import QuizToneControls from './QuizToneControls'
import QuizGuessForm from './QuizGuessForm'
import QuizFeedback from './QuizFeedback'
// Key for localStorage
const QUIZ_STATS_KEY = 'quizStatsV1'

function loadStats() {
  try {
    const raw = localStorage.getItem(QUIZ_STATS_KEY)
    if (!raw) return { total: 0, correct: 0, incorrect: 0, skipped: 0 }
    const stats = JSON.parse(raw)
    return { total: 0, correct: 0, incorrect: 0, skipped: 0, ...stats }
  } catch {
    return { total: 0, correct: 0, incorrect: 0, skipped: 0 }
  }
}

function saveStats(stats) {
  localStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(stats))
}
import { NOTES, isHalfTone } from './musicConstants'
import { getNoteRange, playTone } from './musicUtils'

export default function Quiz() {
  const [duration, setDuration] = useState(3)
  const [fromNote, setFromNote] = useState('C3')
  const [toNote, setToNote] = useState('C4')
  const [includeHalftones, setIncludeHalftones] = useState(false)
  const [currentTone, setCurrentTone] = useState(null)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [stats, setStats] = useState(loadStats())
  const timeoutRef = useRef(null)
  const audioCtxRef = useRef(null)
  const oscRef = useRef(null)

  const getNotes = () =>
    getNoteRange(NOTES, fromNote, toNote, includeHalftones, isHalfTone)

  // Use playTone/stopTone from utils

  const playRandomTone = (skip = false) => {
    // If skip=true, increment skipped if a tone was active and not answered
    if (skip && currentTone && !showAnswer) {
      const newStats = { ...stats, skipped: (stats.skipped || 0) + 1 }
      setStats(newStats)
      saveStats(newStats)
    }
    const notes = getNotes()
    if (notes.length === 0) return
    const idx = Math.floor(Math.random() * notes.length)
    const randomNote = notes[idx]
    setCurrentTone(randomNote)
    setShowAnswer(false)
    setFeedback('')
    setGuess('')
    playTone(randomNote, duration, { audioCtxRef, oscRef, timeoutRef })
  }

  // Space repeats current tone, 'n' plays new tone (skip)
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (timeoutRef.current && audioCtxRef.current && oscRef.current) {
          oscRef.current.stop()
          audioCtxRef.current.close()
          oscRef.current = null
          audioCtxRef.current = null
          timeoutRef.current = null
        } else if (currentTone) {
          playTone(currentTone, duration, {
            audioCtxRef,
            oscRef,
            timeoutRef,
          })
        }
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        playRandomTone(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line
  }, [
    fromNote,
    toNote,
    includeHalftones,
    duration,
    stats,
    currentTone,
    showAnswer,
  ])

  const handleGuess = e => {
    e.preventDefault()
    if (!currentTone) return
    let newStats = { ...stats, total: stats.total + 1 }
    if (guess.trim().toUpperCase() === currentTone.name.toUpperCase()) {
      setFeedback('✅ Correct!')
      newStats.correct = (stats.correct || 0) + 1
      setStats(newStats)
      saveStats(newStats)
      setShowAnswer(false)
      setTimeout(() => {
        playRandomTone()
      }, 400)
      setGuess('')
    } else {
      setFeedback(`❌ ${guess} is Incorrect.`)
      newStats.incorrect = (stats.incorrect || 0) + 1
      setStats(newStats)
      saveStats(newStats)
      setShowAnswer(false)
      // Don't play a new tone, let user guess again
    }
  }

  const handleResetStats = () => {
    const reset = { total: 0, correct: 0, incorrect: 0, skipped: 0 }
    setStats(reset)
    saveStats(reset)
  }

  const notes = getNotes()

  return (
    <div className='bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto mt-12 p-8'>
      <QuizStats stats={stats} onReset={handleResetStats} />
      <h1 className='text-yellow-300 text-2xl font-bold text-center mb-6'>
        Quiz
      </h1>
      <QuizSettings
        duration={duration}
        setDuration={setDuration}
        fromNote={fromNote}
        setFromNote={setFromNote}
        toNote={toNote}
        setToNote={setToNote}
        includeHalftones={includeHalftones}
        setIncludeHalftones={setIncludeHalftones}
        notes={notes}
      />
      <QuizToneControls
        onNewTone={() => playRandomTone(true)}
        onRepeatTone={() => {
          if (timeoutRef.current && audioCtxRef.current && oscRef.current) {
            oscRef.current.stop()
            audioCtxRef.current.close()
            oscRef.current = null
            audioCtxRef.current = null
            timeoutRef.current = null
          } else if (currentTone) {
            playTone(currentTone, duration, {
              audioCtxRef,
              oscRef,
              timeoutRef,
            })
          }
        }}
      />
      <p className='text-gray-400 text-center mb-4'>
        Press <span className='font-bold'>N</span> for a new tone (skip),{' '}
        <span className='font-bold'>Spacebar</span> to repeat/play/stop the
        current tone.
        <br />
        Guess the note name (e.g. C3, F#3). Tone is not displayed!
      </p>
      <QuizGuessForm
        guess={guess}
        setGuess={setGuess}
        onSubmit={handleGuess}
        disabled={!currentTone}
      />
      <QuizFeedback
        feedback={feedback}
        showAnswer={showAnswer}
        currentTone={currentTone}
      />
    </div>
  )
}
