// src/musicConstants.js

export const NOTES = [
  { name: 'E2', freq: 82.41 },
  { name: 'F2', freq: 87.31 },
  { name: 'F#2', freq: 92.5 },
  { name: 'G2', freq: 98.0 },
  { name: 'G#2', freq: 103.83 },
  { name: 'A2', freq: 110.0 },
  { name: 'A#2', freq: 116.54 },
  { name: 'B2', freq: 123.47 },
  { name: 'C3', freq: 130.81 },
  { name: 'C#3', freq: 138.59 },
  { name: 'D3', freq: 146.83 },
  { name: 'D#3', freq: 155.56 },
  { name: 'E3', freq: 164.81 },
  { name: 'F3', freq: 174.61 },
  { name: 'F#3', freq: 185.0 },
  { name: 'G3', freq: 196.0 },
  { name: 'G#3', freq: 207.65 },
  { name: 'A3', freq: 220.0 },
  { name: 'A#3', freq: 233.08 },
  { name: 'B3', freq: 246.94 },
  { name: 'C4', freq: 261.63 },
  { name: 'C#4', freq: 277.18 },
  { name: 'D4', freq: 293.66 },
  { name: 'D#4', freq: 311.13 },
  { name: 'E4', freq: 329.63 },
  { name: 'F4', freq: 349.23 },
  { name: 'F#4', freq: 369.99 },
  { name: 'G4', freq: 392.0 },
];

export function isHalfTone(noteName) {
  return noteName.includes('#');
}
