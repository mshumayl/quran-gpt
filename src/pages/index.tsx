/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { api } from "~/utils/api";
import NavBar from "~/components/NavBar";
import MobileNavBar from "~/components/MobileNavBar";
import { getSession } from "next-auth/react";
import { getClientQuota } from "~/utils/quotas";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const quotas = getClientQuota()
  console.log("Quotas: ", quotas)
  
  return (
    <>
      <Head>
        <title>AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran research companion" />
        <link rel="icon" href="/ai-daleel.ico" />
      </Head>
      <main className="flex flex-col min-h-screen min-w-fit items-center bg-slate-100">
        <NavBar/><MobileNavBar/>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="flex flex-col bg-[url('/graph-paper.svg')] bg-slate-50 drop-shadow-lg pb-20 pt-14 border-t-2 border-b-2 border-emerald-500 w-full justify-center items-center">
            <div className="flex flex-row text-6xl md:text-9xl items-center">
              <div className="flex align-baseline">
                <svg className="transition-all stroke-emerald-500 fill-emerald-500 w-16 h-16 md:w-44 md:h-44" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1080 1080"><path d="m719.05 549.78 69.49-39 43.67-24.48a51 51 0 1 0-34.43-60.95l-30.26 17L702.19 479l-79.73 44.7-73.29 41.09a14.88 14.88 0 0 1-14.54 0l-52.33-29.36-82.22-46.09-69.49-39L287 425.92a51 51 0 1 0-35.11 60.57l29.08 16.31 65.34 36.63L426 584.12 447.2 596a14.86 14.86 0 0 1 0 25.93l-.23.13-82.22 46.09-69.49 39-50 28-4.58 2.55a51 51 0 1 0 35.56 60.3l40-22.45L381.61 739l79.73-44.69 87.33-49 88.16-49.42ZM847.5 735.58a52.83 52.83 0 0 0-7.27.52l-37.38-21-65.33-36.63-79.73-44.7-16.6-9.3a10.23 10.23 0 0 0-10 0l-66.57 37.32 36.88 20.67 82.22 46.1 69.49 39L796.77 792a51 51 0 1 0 50.73-56.41Z"/><path d="M952 259.44c-10.42-16.18-30.78-22.14-47.88-12.56L866 268.24l-91.09 51-110.56 61.97-95.2 53.34q-8.5 4.76-17.07 9.45a25.56 25.56 0 0 1-24.87-.08l-7.86-4.4-91.09-51-110.57-61.97-95.21-53.34c-15.44-8.64-30.76-17.54-46.34-26l-.66-.37c-16-8.95-38.95-4.36-47.89 12.56-8.73 16.52-4.5 38.33 12.56 47.88l38.12 21.36 91.09 51 110.58 62 95.2 53.36c15.44 8.65 30.76 17.55 46.34 26l.67.37a35.2 35.2 0 0 0 11.57 4 34.76 34.76 0 0 0 19.85-2.1l.11-.05c.25-.1.5-.2.75-.32a33.34 33.34 0 0 0 4.67-2.43L595.6 500l91.09-51 110.58-62 95.2-53.33c15.43-8.65 31.08-17 46.34-26l.67-.38c15.98-8.92 22.67-32.17 12.52-47.85Z"/></svg>
              </div>
              <div className="text-emerald-500 font-jost">
                AI 
              </div>
              <div className="text-slate-900 font-jost">
                -Daleel
              </div>
            </div>
            <div className="text-center text-2xl md:text-4xl text-emerald-500 font-jost">
              AI-powered al-Quran research companion
            </div>
            <div className="text-center text-lg md:text-xl text-slate-700 font-zilla-slab-italic">
              Supercharge your Quranic knowledge with a complete toolkit for querying and recording Quranic verses.
            </div>
          </div>
        {/* Get Started Button */}
          <div className="flex flex-col items-center -mt-10 w-full md:w-2/3 lg:w-1/3 px-4">
            <Link className="bg-emerald-400 items-center px-4 py-3 text-white
            border-emerald-500 rounded-xl border border-dashed hover:bg-emerald-300 active:bg-emerald-200
            transition-all duration-75
            text-center text-md md:text-lg font-jost
            shadow-lg translate-x-1 -translate-y-1 
            hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md
            active:translate-x-0 active:-translate-y-0 active:shadow-inner tracking-wide w-full
            uppercase my-5" 
            href="main">
              Get started
            </Link>
          </div>
          <div className="pt-10">
            {/* Features list */}
            <div className="grid grid-rows-4 md:grid-rows-none md:grid-cols-2 mx-8 xl:mx-44 h-fit md:h-fit gap-4 md:gap-6">
              <div className="flex flex-col items-center text-center m-2 mx-0 xl:mx-20 h-30 p-2">
                <svg className="p-1 w-16 h-16 mb-4 bg-gradient-to-br fill-slate-100 rounded-xl from-emerald-300 to-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg>
                <div className="font-jost text-emerald-500 text-sm md:text-sm uppercase my-2 tracking-wider">Advanced AI-powered search</div>
                <div className="font-zilla-slab text-md text-slate-600 ">
                  From &quot;Where did Noah&apos;s ark land?&quot; to
                  &quot;Apakah hukum merokok?&quot;, you can
                  search for quick daleels in <a className="text-emerald-500 bg-slate-200 rounded-md px-1">any language</a> of your choice.
                </div>
              </div>
              <div className="flex flex-col items-center text-center m-2 mx-0 xl:mx-20 h-30 p-2">
                <svg className="p-1 w-16 h-16 mb-4 bg-gradient-to-br fill-slate-100 rounded-xl from-emerald-300 to-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 17V7c0-2.168-3.663-4-8-4S4 4.832 4 7v10c0 2.168 3.663 4 8 4s8-1.832 8-4zM12 5c3.691 0 5.931 1.507 6 1.994C17.931 7.493 15.691 9 12 9S6.069 7.493 6 7.006C6.069 6.507 8.309 5 12 5zM6 9.607C7.479 10.454 9.637 11 12 11s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2V9.607zM6 17v-2.393C7.479 15.454 9.637 16 12 16s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2z"/></svg>
                <div className="font-jost text-emerald-500 text-sm md:text-sm uppercase my-2 tracking-wider">A personal database of verses</div>
                <div className="font-zilla-slab text-md text-slate-600">
                  Save favourite verses to your bookmarks to start building your own library of <a className="text-emerald-500 bg-slate-200 rounded-md px-1">Quranic verse cards</a>. 
                </div>
              </div>
              <div className="flex flex-col items-center text-center m-2 mx-0 xl:mx-20 h-30 p-2">
                <svg className="p-1 w-16 h-16 mb-4 bg-gradient-to-br fill-slate-100 rounded-xl from-emerald-300 to-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.864 8.465a3.505 3.505 0 0 0-3.03-4.449A3.005 3.005 0 0 0 14 2a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 2c-1.301 0-2.41.831-2.825 2.015a3.505 3.505 0 0 0-3.039 4.45A4.028 4.028 0 0 0 2 12c0 1.075.428 2.086 1.172 2.832A4.067 4.067 0 0 0 3 16c0 1.957 1.412 3.59 3.306 3.934A3.515 3.515 0 0 0 9.5 22c.979 0 1.864-.407 2.5-1.059A3.484 3.484 0 0 0 14.5 22a3.51 3.51 0 0 0 3.19-2.06 4.006 4.006 0 0 0 3.138-5.108A4.003 4.003 0 0 0 22 12a4.028 4.028 0 0 0-2.136-3.535zM9.5 20c-.711 0-1.33-.504-1.47-1.198L7.818 18H7c-1.103 0-2-.897-2-2 0-.352.085-.682.253-.981l.456-.816-.784-.51A2.019 2.019 0 0 1 4 12c0-.977.723-1.824 1.682-1.972l1.693-.26-1.059-1.346a1.502 1.502 0 0 1 1.498-2.39L9 6.207V5a1 1 0 0 1 2 0v13.5c0 .827-.673 1.5-1.5 1.5zm9.575-6.308-.784.51.456.816c.168.3.253.63.253.982 0 1.103-.897 2-2.05 2h-.818l-.162.802A1.502 1.502 0 0 1 14.5 20c-.827 0-1.5-.673-1.5-1.5V5c0-.552.448-1 1-1s1 .448 1 1.05v1.207l1.186-.225a1.502 1.502 0 0 1 1.498 2.39l-1.059 1.347 1.693.26A2.002 2.002 0 0 1 20 12c0 .683-.346 1.315-.925 1.692z"/></svg>
                <div className="font-jost text-emerald-500 text-sm md:text-sm uppercase my-2 tracking-wider">Your digital brain for Quranic daleel</div>
                <div className="font-zilla-slab text-md text-slate-600">
                  Add <a className="text-emerald-500 bg-slate-200 rounded-md px-1">annotations</a> to your verse cards to record your thoughts, ideas, and learnings on Quranic verses.
                </div>
              </div>
              <div className="flex flex-col items-center text-center m-2 mx-0 xl:mx-20 h-30 p-2">
                <svg className="p-1 w-16 h-16 mb-4 bg-gradient-to-br fill-slate-100 rounded-xl from-emerald-300 to-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 20h6v2H9zm7.906-6.288C17.936 12.506 19 11.259 19 9c0-3.859-3.141-7-7-7S5 5.141 5 9c0 2.285 1.067 3.528 2.101 4.73.358.418.729.851 1.084 1.349.144.206.38.996.591 1.921H8v2h8v-2h-.774c.213-.927.45-1.719.593-1.925.352-.503.726-.94 1.087-1.363zm-2.724.213c-.434.617-.796 2.075-1.006 3.075h-2.351c-.209-1.002-.572-2.463-1.011-3.08a20.502 20.502 0 0 0-1.196-1.492C7.644 11.294 7 10.544 7 9c0-2.757 2.243-5 5-5s5 2.243 5 5c0 1.521-.643 2.274-1.615 3.413-.373.438-.796.933-1.203 1.512z"/></svg>
                <div className="font-jost text-emerald-500 text-sm md:text-sm uppercase my-2 tracking-wider">AI summarization of verse translations</div>
                <div className="font-zilla-slab text-md text-slate-600">
                  Create summaries on your verse cards and add them to your notes collection with the help of an <a className="text-emerald-500 bg-slate-200 rounded-md px-1">AI model</a>.
                </div>
              </div>
              </div>
              {/* This is the perfect tool if you are a */}
              <div>


            </div>

          </div>

          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
