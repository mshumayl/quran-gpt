/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, type FC, useEffect } from 'react'
import { api } from '~/utils/api';


interface VerseCardProps {
  surah: number;
  verse: number;
  isDetailed?: boolean;
  uid?: string; //Unique ID for table savedSnippets in db. Only available for saved snippets.
  setBookmarkResultCallback?:  React.Dispatch<React.SetStateAction<string>>; //Callback function to update state in parent component. Parent can be savedVerses or [surahVerse].
  setBookmarkMessageCallback?: React.Dispatch<React.SetStateAction<string>>;
  setVerseTranslationCallback?: React.Dispatch<React.SetStateAction<string>>;
}

const VerseCard: FC<VerseCardProps> = ({ surah, verse, isDetailed, uid, setBookmarkResultCallback, setBookmarkMessageCallback, setVerseTranslationCallback }) => {

  type responseType = {
      surahName: string | undefined;
      verseText: string | undefined;
      verseTranslation: string | null | undefined;
  } | undefined

  const [ fetchedData, setFetchedData ] = useState<responseType>()
  const [ loader, setLoader ] = useState(true)


  const { data: session } = useSession();

  const saveApi = api.db.saveSnippet.useMutation();
  const handleSave = async () => {

    if (session && session?.user.bookmarkQuota !== 0) {
      const res = await saveApi.mutateAsync({ verseId: `${surah}_${verse}`, userId: session?.user.id });

      if (res.result === "SAVE_SUCCESS" && res.message) {
        //If callback function is passed as prop
        if (setBookmarkResultCallback && setBookmarkMessageCallback) {
          setBookmarkResultCallback(res.result);
          setBookmarkMessageCallback(res.message);
        }
      } else if (res.result === "SAVE_EXISTS") {
        if (setBookmarkResultCallback) {
          setBookmarkResultCallback(res.result);
        }
      } else if (res.result && res.message) {
        if (setBookmarkResultCallback && setBookmarkMessageCallback) {
          setBookmarkResultCallback(res.result);
          setBookmarkMessageCallback(res.message);
          console.log("Remove bookmark woi!")
        }
      } else {
        if (setBookmarkResultCallback && setBookmarkMessageCallback) {
          const message = "Bookmark failed. Please try again.";
          setBookmarkResultCallback(res.result);
          setBookmarkMessageCallback(message);
        }
      }
    } else {
      //BUG: TODO: This should not display if the user has already bookmarked this. Deferring bug fix to another time.
      const message = "You are out of bookmarks quota. Remove existing bookmarks to add more."
      const result = "OUT_OF_BOOKMARK_QUOTA"
      if (setBookmarkResultCallback && setBookmarkMessageCallback) {
        setBookmarkResultCallback(result);
        setBookmarkMessageCallback(message);
      }

      console.log(result, message)
    }
  }

  const deleteApi = api.db.removeSnippet.useMutation();
  const handleDelete = async () => {

    //Addition in API, not reduction
    if (session && uid) {
      const res = await deleteApi.mutateAsync({ id: uid, verseId: `${surah}_${verse}`, userId: session?.user.id })

      //If callback function is passed as prop
      if (setBookmarkResultCallback && setBookmarkMessageCallback && res.message) {
        setBookmarkResultCallback(res.result);
        setBookmarkMessageCallback(res.message);
      }
      
      setFetchedData(undefined);
      dbFetch = undefined;
    } else {
      console.log("Unable to delete. Please log in.")
    }
  }

  let dbFetch = api.db.fetchVerse.useQuery({surahNumber: surah.toString(), verseNumber: verse.toString()}).data

  //Store response in state so that the state can be cleared and re-rendered dynamically when user removes a bookmark
  useEffect(() => {
    if (dbFetch !== undefined) {
      //This only runs during page load
      setFetchedData(dbFetch);

      //Only to return to [surahVerse] to pass into OpenAI to generate notes (generateNote)
      if (setVerseTranslationCallback !== undefined && dbFetch.verseTranslation) {
        setVerseTranslationCallback(dbFetch.verseTranslation);
      }

      setLoader(false);
    }
  }, [dbFetch])


  let dbFetchDetails = null
  //query detailed metadata separately
  if (isDetailed) {
    //detailed call
    dbFetchDetails = api.db.fetchDetails.useQuery({ surahNumber: surah.toString() })
    console.log(dbFetchDetails.data)
  } 
  
  return ((fetchedData) ? (
    <div className="flex flex-col">
      <div className={`bg-gradient-to-tr from-slate-300 to-slate-200 p-10 border border-dashed border-slate-400 rounded-xl w-full flex flex-col text-center shadow-xl transition-all ${(isDetailed) ? (""): ("hover:translate-x-1 hover:-translate-y-1 hover:shadow-2xl")} md:break-inside-avoid`}>
        {
          (isDetailed && dbFetchDetails) //Renders only in verse/ endpoint
          ? (
          <>
            <div className="-mt-6 -mr-6 mb-5 sm:-m-2 flex justify-end cursor-pointer" onClick={handleSave}>
                <svg className="h-7 w-7 fill-slate-300 stroke-slate-400 hover:fill-slate-400 hover:stroke-slate-500 transition-all" width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C7.28 3 8.12 3 9.8 3h4.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C19 5.28 19 6.12 19 7.8V21l-7-4-7 4V7.8Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="transition-all w-max sm:w-max self-center px-5 sm:px-10 flex flex-row content-evenly align-middle justify-center gap-5 items-baseline mb-5 bg-slate-100 rounded-full border border-dashed border-slate-400 shadow-inner">
              <div className="text-slate-500 mb-2 font-lateef text-md" key={`translation_${surah}_${verse}`}>{dbFetchDetails.data?.surahEName}</div>
              <div className="text-slate-500 font-lateef text-3xl" key={`arabictitle_${surah}_${verse}`}>{dbFetchDetails.data?.surahName}</div>
              <div className="text-slate-500 mb-2 font-lateef text-md" key={`type_${surah}_${verse}`}>{dbFetchDetails.data?.surahType}</div>
            </div>
          </>
            ) 
          : (<></>)
        }
        {
          (uid) //Renders only in /savedVerses (uid prop is only passed in savedVerses.tsx)
          ? (
          <>
            <div className="-mt-6 -mr-6 mb-5 sm:-m-2 flex justify-end cursor-pointer" onClick={handleDelete}>
              <svg className="h-7 w-7 fill-slate-300 stroke-slate-400 hover:fill-slate-400 hover:stroke-slate-500 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"/></svg>
            </div>
          </>
          )
          : (<></>)
        }
        <div className="font-zilla-slab-italic text-emerald-500" key={`surahverse_${surah}_${verse}`}>— {fetchedData?.surahName}, {verse} —</div>
        <br></br>
        <div className="font-lateef text-3xl text-slate-600">{fetchedData?.verseText}</div>
        <br></br>
        <div className="font-zilla-slab-italic text-lg text-slate-500">{fetchedData?.verseTranslation}</div>

        {
          (isDetailed) //Renders only in verse/ endpoint
          ? (
            <>
              <div className="flex flex-col sm:flex-row mt-5 gap-2 sm:gap-6 justify-center items-center text-xs font-zilla-slab-italic text-slate-600 ">
                <div className="">References</div>
                <Link target="_blank" rel="noopener" passHref className="shadow-inner py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://quran.com/${surah}:${verse}/tafsirs/en-tafisr-ibn-kathir/`}>Tafseer ibn Kathir</Link>
                <Link target="_blank" rel="noopener" passHref className="shadow-inner py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://www.altafsir.com/AsbabAlnuzol.asp?SoraName=${surah}&Ayah=${verse}&search=yes&img=A&LanguageID=2`}>Asbaab al-Nuzul</Link>
                <Link target="_blank" rel="noopener" passHref className="shadow-inner py-2 px-3 border border-dashed border-slate-400 w-max bg-slate-50 h-max hover:bg-slate-100" href={`https://quran.com/${surah}?startingVerse=${verse}`}>Full text</Link>
              </div>
            </>
          ) 
          : (<></>)
        }

        {
          (uid) //Renders navigation button only in /savedVerses (uid prop is only passed in savedVerses.tsx)
          ? (
          <>
            <Link className="mt-6 -mb-2 w-full self-end md:w-1/3 flex flex-col items-center transition-all
             font-zilla-slab text-slate-500 rounded-lg shadow-inner
            bg-slate-100 hover:bg-slate-50" key={`${surah}_${verse}`} href={`verse/${surah}_${verse}`}>
              Details
            </Link>
          </>
          )
          : (<></>)
        }
      </div>
    </div>
  ) : (loader) //If fetching data on page load, display loader 
  ? (<div className="animate-ping font-zilla-slab text-xs h-max w-max text-slate-500 my-10 rounded-lg bg-slate-200 py-1 px-2">Fetching verses...</div>)
  : (<></>))
}

export default VerseCard;