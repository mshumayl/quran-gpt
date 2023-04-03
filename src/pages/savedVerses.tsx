/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import { type GetSessionParams, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import { getSession } from "next-auth/react"
import NavBar from "~/components/NavBar";
import MobileNavBar from "~/components/MobileNavBar";
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
        "verse"?: string,
        "uid"?:   string,
    }[] | undefined
      

    const { data: sessionData } = useSession();

    let fetchSavedVerses
    let savedVerses: savedType

    //TODO: Prevent this line from running unless on page load. Consider stuffing into gSSP.
    if (sessionData !== null) {
      fetchSavedVerses = api.db.fetchUserSavedSnippets.useQuery({ userId: sessionData.user.id })
    }

    if (fetchSavedVerses && fetchSavedVerses.data && fetchSavedVerses.data.userSavedSnippets.length > 0) {
      savedVerses = fetchSavedVerses.data.userSavedSnippets.map((v: { verseId: string, id: string }) => {
        const surah = v.verseId.split("_")[0]
        const verse = v.verseId.split("_")[1]
        const uid = v.id

        return {
          surah: surah,
          verse: verse,
          uid: uid
        }
      })
    }


    return (
        <>
          <Head>
            <title>Saved Verses</title>
            <meta name="description" content="AI-powered al-Quran daleel search" />
            <link rel="icon" href="/ai-daleel.ico" />
          </Head>
          <main className="flex flex-col items-center min-h-screen bg-slate-100">
            <NavBar/><MobileNavBar/>
            <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
              <div className="font-zilla-slab-italic text-3xl md:text-6xl">
                Saved Verses
              </div>
              <div className="w-full md:columns-2 lg:columns-3 items-baseline h-max space-y-10 mt-5 overflow-visible md:items-center md:align-top">
                 {(savedVerses && savedVerses.map && savedVerses.map(({ surah, verse, uid }) => {
                  return ((surah !== undefined && verse !== undefined) ? 
                    (
                      <VerseCard surah={parseInt(surah)} verse={parseInt(verse)} uid={uid}/>
                    )
                    : (<></>)
                  )
                 })
                 )}
              </div>
              {(fetchSavedVerses?.data?.userSavedSnippets.length === 0) 
              ? (<>
                  <div className="font-zilla-slab-italic text-slate-700">You have no saved verses.</div>
                  <Link href="/main" className="underline underline-offset-2 flex flex-col items-center text-sm font-zilla-slab-italic text-slate-600 hover:text-emerald-500">Search verses</Link>
                </>) 
              : (<></>)}
              <div></div>
            </div>
          </main>
        </>
      );
  };
  
  export default Bookmarks;