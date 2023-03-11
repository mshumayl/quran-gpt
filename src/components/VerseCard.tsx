/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, type FC } from 'react'
import { api } from '~/utils/api';

interface VerseCardProps {
  surah: number;
  verse: number;
}

const VerseCard: FC<VerseCardProps> = ({ surah, verse }) => {
  // const [verseText, setVerseText] = useState<string>("")

  //make tRPC calls to fetch surahName and verse here
  const dbFetch = api.db.fetchVerse.useQuery({surahNumber: surah.toString(), verseNumber: verse.toString()})

  console.log("dbFetch:")
  console.log(dbFetch.data)

  return (
    <div className="bg-slate-200 m-10 p-10 border border-dashed border-slate-400 w-full flex flex-col text-center">
      <div key={`${surah}_${verse}`}>{dbFetch.data?.surahName} {verse}</div>
      <br></br>
      <div>{dbFetch.data?.verseText}</div>
    </div>
  )
}

export default VerseCard;