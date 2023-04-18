import { type NextPage } from "next";
import Head from "next/head";
import { getSession, type GetSessionParams } from "next-auth/react";
import PromptInput from "~/components/PromptInput";
import NavBar from "~/components/NavBar";
import MobileNavBar from "~/components/MobileNavBar";

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

  return (
    <>
      <Head>
        <title>Search Quran verses | AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran research companion" />
        <link rel="icon" href="/ai-daleel.ico" />
      </Head>
      <main className="flex flex-col min-h-screen min-w-fit items-center bg-slate-100">
        <div className="w-full z-40">
          <NavBar/><MobileNavBar/>
        </div>
        <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
          <div className="flex flex-row">
            <div className="flex align-baseline">
              <svg className="transition-all stroke-emerald-500 fill-emerald-500 hover:stroke-emerald-300 hover:fill-emerald-300 w-10 h-10   md:w-16 md:h-16" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1080 1080"><path d="m719.05 549.78 69.49-39 43.67-24.48a51 51 0 1 0-34.43-60.95l-30.26 17L702.19 479l-79.73 44.7-73.29 41.09a14.88 14.88 0 0 1-14.54 0l-52.33-29.36-82.22-46.09-69.49-39L287 425.92a51 51 0 1 0-35.11 60.57l29.08 16.31 65.34 36.63L426 584.12 447.2 596a14.86 14.86 0 0 1 0 25.93l-.23.13-82.22 46.09-69.49 39-50 28-4.58 2.55a51 51 0 1 0 35.56 60.3l40-22.45L381.61 739l79.73-44.69 87.33-49 88.16-49.42ZM847.5 735.58a52.83 52.83 0 0 0-7.27.52l-37.38-21-65.33-36.63-79.73-44.7-16.6-9.3a10.23 10.23 0 0 0-10 0l-66.57 37.32 36.88 20.67 82.22 46.1 69.49 39L796.77 792a51 51 0 1 0 50.73-56.41Z"/><path d="M952 259.44c-10.42-16.18-30.78-22.14-47.88-12.56L866 268.24l-91.09 51-110.56 61.97-95.2 53.34q-8.5 4.76-17.07 9.45a25.56 25.56 0 0 1-24.87-.08l-7.86-4.4-91.09-51-110.57-61.97-95.21-53.34c-15.44-8.64-30.76-17.54-46.34-26l-.66-.37c-16-8.95-38.95-4.36-47.89 12.56-8.73 16.52-4.5 38.33 12.56 47.88l38.12 21.36 91.09 51 110.58 62 95.2 53.36c15.44 8.65 30.76 17.55 46.34 26l.67.37a35.2 35.2 0 0 0 11.57 4 34.76 34.76 0 0 0 19.85-2.1l.11-.05c.25-.1.5-.2.75-.32a33.34 33.34 0 0 0 4.67-2.43L595.6 500l91.09-51 110.58-62 95.2-53.33c15.43-8.65 31.08-17 46.34-26l.67-.38c15.98-8.92 22.67-32.17 12.52-47.85Z"/></svg>
            </div>
            <div className="text-emerald-500 font-jost text-3xl md:text-6xl">
              AI 
            </div>
            <div className="text-slate-900 font-jost text-3xl md:text-6xl">
               -Daleel
            </div>
          </div>
          <div className="text-center text-sm md:text-md font-zilla-slab tracking-wide text-slate-400">
            AI-powered al-Quran research companion
          </div>
          <div className="mt-10 md:p-10 w-full md:w-2/3 flex flex-col items-center ">
              {/* TODO: Pass session object into PromptInput into VerseCard */}
              <PromptInput/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
