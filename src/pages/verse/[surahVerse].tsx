/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { GetSessionParams, signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import PromptInput from "~/components/PromptInput";


import { getSession } from "next-auth/react"
import NavBar from "~/components/NavBar";
import MobileNavBar from "~/components/MobileNavBar";
import VerseCard from "~/components/VerseCard";
import { useRouter } from "next/router";

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

  let surah = null;
  let verse = null;

  if (typeof query.surahVerse === "string") {
    [ surah, verse ] = query.surahVerse.split("_");
  }

  //TODO: Add more metadata here 
  //TODO: Conditionally render verseCard. If it's in surahVerse, then prop detailed=true
  return (
    <>
      <Head>
        <title>AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <NavBar/><MobileNavBar/>
        <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
          <div className="font-zilla-slab-italic text-3xl md:text-6xl">
            Verse Details
          </div>
          <div className="mt-2 md:p-10 w-full md:w-7/8 flex flex-col items-center">
            {(surah && verse) ? (<VerseCard surah={parseInt(surah)} verse={parseInt(verse)} isDetailed={true}/>) : (<>No</>)} 
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
