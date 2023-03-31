/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { useEffect, useState } from "react";
import { TRPCClientIncomingMessage, TRPCResponseMessage } from "@trpc/server/rpc";
import VerseCard from "~/components/VerseCard";

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

const Bookmarks = () => {
    type savedType = {
        "surah"?: string,
        "verse"?: string
    }[] | undefined
      

    const { data: sessionData } = useSession();

    let fetchSavedVerses
    let savedVerses: savedType

    if (sessionData) {
      fetchSavedVerses = api.db.fetchUserSavedSnippets.useQuery({ userId: sessionData.user.id })
    }

    if (fetchSavedVerses && fetchSavedVerses.data && fetchSavedVerses.data.userSavedSnippets.length > 0) {
      savedVerses = fetchSavedVerses.data.userSavedSnippets.map((v) => {
        const surah = v.verseId.split("_")[0]
        const verse = v.verseId.split("_")[1]

        return {
          surah: surah,
          verse: verse
        }
      })
    }


    return (
        <>
          <Head>
            <title>Saved Verses</title>
            <meta name="description" content="AI-powered al-Quran daleel search" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex flex-col min-h-screen items-center bg-slate-100">
            <NavBar/><MobileNavBar/>
            <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
              <div className="font-zilla-slab-italic text-3xl md:text-6xl">
                Saved Verses
              </div>
              <div className="mt-10 md:p-10 w-full md:w-2/3 flex flex-col items-center">
                 {(savedVerses && savedVerses.map && savedVerses.map(({ surah, verse }) => {
                  return ((surah !== undefined && verse !== undefined) ? 
                    (<Link key={`${surah}_${verse}`} href={`verse/${surah}_${verse}`} className="flex items-center">
                      <VerseCard surah={parseInt(surah)} verse={parseInt(verse)}/>
                    </Link>)
                    : (<>You have no saved verses</>)
                  )
                 })) 
                 }
              </div>
            </div>
          </main>
        </>
      );
  };
  
  export default Bookmarks;