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

// export function getStaticProps({ params: { surahVerse } }: { params: { surahVerse: string } }) {
//     const [ surah, verse ] = surahVerse.split("_");

//     console.log(surah);
//     console.log(verse);

//     return { 
//         props: {
//             surah,
//             verse
//         }
//      };
// }

const Main: NextPage = () => {
  const { query } = useRouter();

  let surah = null;
  let verse = null;

  if (typeof query.surahVerse === "string") {
    [ surah, verse ] = query.surahVerse.split("_");
    console.log(surah, verse)
  }

  console.log(surah, verse)

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
          <div className="font-righteous text-3xl md:text-6xl">
            Verse Details
          </div>
          <div className="text-center text-sm md:text-md font-zilla-slab-italic">
            AI-powered al-Quran daleel search
          </div>
          <div className="mt-10 md:p-10 w-full md:w-7/8 flex flex-col items-center">
            {(surah && verse) ? (<VerseCard surah={parseInt(surah)} verse={parseInt(verse)}/>) : (<>No</>)} 
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
