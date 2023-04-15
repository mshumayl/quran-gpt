/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import { getSession, useSession, type GetSessionParams } from "next-auth/react";
import NavBar from "~/components/NavBar";
import MobileNavBar from "~/components/MobileNavBar";
import VerseCard from "~/components/VerseCard";
import Toaster from "~/components/Toaster";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notes from "~/components/Notes";

//TODO: Use getStaticProps to get verse data

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: 'auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

const Main: NextPage = () => {
  const { query } = useRouter();

  const [ bookmarkResult, setBookmarkResult ] = useState("") //Pass setBookmarkResult as callback into child (VerseCard)
  const { data: session } = useSession();

  const [ verseTranslation, setVerseTranslation ] = useState("");

  useEffect(() => {
    if (bookmarkResult !== "") {
      const timeout = setTimeout(() => {
        setBookmarkResult("")
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [bookmarkResult])

  let surah = null;
  let verse = null;
  let verseId = "";
  let userId = "";

  if (typeof query.surahVerse === "string") {
    [ surah, verse ] = query.surahVerse.split("_");

    if (query.surahVerse) {
      verseId = query.surahVerse
    }
  }

  if (session && session.user.id) {
    userId = session.user.id
  }

  //TODO: Add more metadata here 
  //TODO: Conditionally render verseCard. If it's in surahVerse, then prop detailed=true
  return (
    <>
      <Head>
        <title>Verse Details | AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/ai-daleel.ico" />
      </Head>
      <main className="flex flex-col min-h-screen min-w-fit items-center bg-slate-100">
        <NavBar/><MobileNavBar/>
        <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
          <div className="font-zilla-slab-italic text-3xl md:text-6xl">
            Verse Details
          </div>
          <div className="mt-2 md:p-10 w-full md:w-7/8 flex flex-col items-center">
            {(surah && verse) ? (<VerseCard 
            surah={parseInt(surah)} 
            verse={parseInt(verse)} 
            isDetailed={true} 
            setToasterResult={setBookmarkResult}
            setVerseTranslation={setVerseTranslation}/>) : (<></>)} 
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
          <div className="-mt-14 md:p-10 w-full md:w-7/8   flex flex-col items-center">
            <Notes verseId={verseId} userId={userId} verseTranslation={verseTranslation}/>
          </div>
        </div>
        <div className="z-50">
          <Toaster status={bookmarkResult}/>
        </div>
      </main>
    </>
  );
};

export default Main;
