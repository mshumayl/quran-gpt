import React, { type FC } from 'react'

interface VerseCardProps {
  surah: number;
  verse: number;
}

const VerseCard: FC<VerseCardProps> = ({ surah, verse }) => {
  return (
    <div className="bg-red-200 m-10 p-10">
     <li key={`${surah}_${verse}`}>Surah: {surah}, Verse: {verse}</li>
    </div>
  )
}

export default VerseCard;