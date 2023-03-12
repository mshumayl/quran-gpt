/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
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

  // console.log("dbFetch:")
  // console.log(dbFetch.data)

  return ((dbFetch.data) ? (
    <div className="bg-slate-200 m-10 p-10 border border-dashed border-slate-400 rounded-xl w-full flex flex-col text-center shadow-xl">
      <div key={`${surah}_${verse}`}>{dbFetch.data?.surahName} {verse}</div>
      <br></br>
      <div className="font-lateef text-3xl">{dbFetch.data?.verseText}</div>
      <br></br>
      <div className="font-zilla-slab-italic text-lg">{dbFetch.data?.verseTranslation}</div>
      <div className="flex flex-col sm:flex-row mt-5 gap-2 sm:gap-6 justify-center items-center text-xs font-zilla-slab-italic text-slate-600 ">
        <div className="">References</div>
        <Link target="_blank" rel="noopener" passHref className="py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://www.alim.org/quran/tafsir/ibn-kathir/surah/${surah}/${verse}/`}>Tafseer ibn Kathir</Link>
        <Link target="_blank" rel="noopener" passHref className="py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=${surah}&Ayah=${verse}&search=yes&img=A&LanguageID=2`}>Asbaab al-Nuzul</Link>
        <Link target="_blank" rel="noopener" passHref className="py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://quran.com/${surah}?startingVerse=${verse}`}>Full text</Link>
      </div>
    </div>
  ) : (<div className="animate-ping font-zilla-slab-italic text-xs h-max w-max text-slate-500 my-10 rounded-lg bg-slate-200 py-1 px-2">Fetching verses...</div>))
}

export default VerseCard;