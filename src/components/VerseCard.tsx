/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { type FC } from 'react'
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/utils/api';

interface VerseCardProps {
  surah: number;
  verse: number;
  isDetailed?: boolean;
}

const VerseCard: FC<VerseCardProps> = ({ surah, verse, isDetailed }) => {
  
  const { data: session } = useSession();

  const saveApi = api.db.saveSnippet.useMutation();
  const handleSave = async () => {
    console.log("Clicked Save");
    if (session) {
      const saveRes = await saveApi.mutateAsync({ verseId: `${surah}_${verse}`, userId: session?.user.id });
      console.log(saveRes);
    } else {
      console.log("Unable to save. Please log in.")
    }
  }

  //make tRPC calls to fetch surahName and verse here
  const dbFetch = api.db.fetchVerse.useQuery({surahNumber: surah.toString(), verseNumber: verse.toString()})
  let dbFetchDetails = null
  //query detailed metadata separately
  if (isDetailed) {
    //detailed call
    dbFetchDetails = api.db.fetchDetails.useQuery({ surahNumber: surah.toString() })
    console.log(dbFetchDetails.data)
  } 
  
  return ((dbFetch.data) ? (
    <>
      <div className={`bg-slate-200 m-10 p-10 border border-dashed border-slate-400 rounded-xl w-full flex flex-col text-center shadow-xl transition-all ${(isDetailed) ? (""): ("hover:translate-x-1 hover:-translate-y-1 hover:shadow-2xl")}`}>
        {
          (isDetailed && dbFetchDetails) //Renders only in verse/ endpoint
          ? (
          <div className="w-max sm:w-max self-center px-5 sm:px-10 flex flex-row content-evenly align-middle justify-center gap-5 items-baseline mb-5 bg-slate-300 rounded-full border border-dashed border-slate-400 shadow-inner">
            <div className="text-slate-500 mb-2 font-lateef text-md" key={`translation_${surah}_${verse}`}>{dbFetchDetails.data?.surahEName}</div>
            <div className="text-slate-500 font-lateef text-3xl" key={`arabictitle_${surah}_${verse}`}>{dbFetchDetails.data?.surahName}</div>
            <div className="text-slate-500 mb-2 font-lateef text-md" key={`type_${surah}_${verse}`}>{dbFetchDetails.data?.surahType}</div>
          </div>
            ) 
          : (<></>)
        }
        <div className="font-zilla-slab-italic text-slate-500" key={`surahverse_${surah}_${verse}`}>— {dbFetch.data?.surahName}, {verse} —</div>
        <br></br>
        <div className="font-lateef text-3xl text-slate-600">{dbFetch.data?.verseText}</div>
        <br></br>
        <div className="font-zilla-slab-italic text-lg text-slate-500">{dbFetch.data?.verseTranslation}</div>

        {
          (isDetailed) //Renders only in verse/ endpoint
          ? (
            <>
              <div className="flex flex-col sm:flex-row mt-5 gap-2 sm:gap-6 justify-center items-center text-xs font-zilla-slab-italic text-slate-600 ">
                <div className="">References</div>
                <Link target="_blank" rel="noopener" passHref className="shadow-inner py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://www.alim.org/quran/tafsir/ibn-kathir/surah/${surah}/${verse}/`}>Tafseer ibn Kathir</Link>
                <Link target="_blank" rel="noopener" passHref className="shadow-inner py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=${surah}&Ayah=${verse}&search=yes&img=A&LanguageID=2`}>Asbaab al-Nuzul</Link>
                <Link target="_blank" rel="noopener" passHref className="shadow-inner py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://quran.com/${surah}?startingVerse=${verse}`}>Full text</Link>
              </div>
              <div className="flex justify-end -mb-4 cursor-pointer" onClick={handleSave}>
                Save
              </div>
            </>
          ) 
          : (<></>)
        }
      </div>
    </>
  ) : (<div className="animate-ping font-zilla-slab-italic text-xs h-max w-max text-slate-500 my-10 rounded-lg bg-slate-200 py-1 px-2">Fetching verses...</div>))
}

export default VerseCard;