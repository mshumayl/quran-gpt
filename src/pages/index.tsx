/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { api } from "~/utils/api";
import NavBar from "~/components/NavBar";
import MobileNavBar from "~/components/MobileNavBar";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/ai-daleel.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <NavBar/><MobileNavBar/>
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-20">
          <div className="flex flex-row">
            <div className="flex align-baseline">
              <svg className="transition-all stroke-emerald-500 fill-emerald-500 hover:stroke-emerald-300 hover:fill-emerald-300 w-10 h-10   md:w-16 md:h-16" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 600 450"><defs><clipPath id="a"><path d="M115.441 314.129h76.102v76.101h-76.102Zm0 0"/></clipPath><clipPath id="b"><path d="M153.492 314.129c-21.015 0-38.05 17.035-38.05 38.05 0 21.016 17.035 38.051 38.05 38.051 21.016 0 38.051-17.035 38.051-38.05 0-21.016-17.035-38.051-38.05-38.051"/></clipPath><clipPath id="c"><path d="M394.219 310.41h76.101v76.106H394.22Zm0 0"/></clipPath><clipPath id="d"><path d="M432.27 310.41c-21.016 0-38.051 17.04-38.051 38.05 0 21.017 17.035 38.056 38.05 38.056 21.016 0 38.051-17.04 38.051-38.055 0-21.012-17.035-38.05-38.05-38.05"/></clipPath><clipPath id="e"><path d="M91.512 130.809h76.101v76.101H91.512Zm0 0"/></clipPath><clipPath id="f"><path d="M129.563 130.809c-21.016 0-38.051 17.035-38.051 38.05 0 21.016 17.035 38.051 38.05 38.051 21.016 0 38.051-17.035 38.051-38.05 0-21.016-17.035-38.051-38.05-38.051"/></clipPath><clipPath id="g"><path d="M426.16 131.559h76.102v76.101H426.16Zm0 0"/></clipPath><clipPath id="h"><path d="M464.21 131.559c-21.015 0-38.05 17.035-38.05 38.05 0 21.016 17.035 38.051 38.05 38.051 21.017 0 38.052-17.035 38.052-38.05 0-21.016-17.035-38.051-38.051-38.051"/></clipPath></defs><path fill="none" strokeLinecap="round" strokeWidth="26" d="m13.002 13 214.447-.001" transform="matrix(1.26912 -.73273 .73406 1.27144 158.187 325.026)"/><path fill="none" strokeLinecap="round" strokeWidth="26" d="M13 13.001 125.39 13" transform="matrix(-1.27877 -.71307 .71501 -1.28225 293.62 285.237)"/><path fill="none" strokeLinecap="round" strokeWidth="51" d="m25.501 25.502 105.922-.003" transform="matrix(-.63736 -.39602 .39582 -.63704 419.292 361.43)"/><path fill="none" strokeLinecap="round" strokeWidth="71" d="m35.5 35.5 280.157.003" transform="matrix(-.64847 -.37615 .37632 -.64876 305.966 200.911)"/><path fill="none" strokeLinecap="round" strokeWidth="71" d="m35.5 35.501 278.988-.002" transform="matrix(.64448 -.38366 .38365 .64445 262.341 155.038)"/><g clipPath="url(#a)"><g clipPath="url(#b)"><path d="M115.441 314.129h76.102v76.101h-76.102Zm0 0"/></g></g><g clipPath="url(#c)"><g clipPath="url(#d)"><path d="M394.219 310.41h76.101v76.106H394.22Zm0 0"/></g></g><g clipPath="url(#e)"><g clipPath="url(#f)"><path d="M91.512 130.809h76.101v76.101H91.512Zm0 0"/></g></g><g clipPath="url(#g)"><g clipPath="url(#h)"><path d="M426.16 131.559h76.102v76.101H426.16Zm0 0"/></g></g></svg>
            </div>
            <div className="text-emerald-500 font-righteous text-3xl md:text-6xl">
              AI 
            </div>
            <div className="text-slate-900 font-righteous text-3xl md:text-6xl">
               -Daleel
            </div>
          </div>
          <div className="text-center text-sm md:text-md font-zilla-slab-italic">
            AI-powered al-Quran daleel search
          </div>
          <div className="pt-10">
            <div className="flex flex-col">
              {/* <div className="flex flex-col items-center text-xl">
                Features
              </div>
              <div className="flex flex-row items-center">
                <div className="bg-slate-200 text-center rounded-2xl w-36 md:w-64 md:h-20 mx-6 my-5 px-5 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-75">Search relevant verses</div>
                <div className="bg-slate-200 text-center rounded-2xl w-36 md:w-64 md:h-20 mx-6 my-5 px-5 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-75">Verse summarization</div>
              </div>
              <div className="flex flex-row items-center">
                <div className="bg-slate-200 text-center rounded-2xl w-36 md:w-64 md:h-20 mx-6 my-5 px-5 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-75">Semantic categorization</div>
                <div className="bg-slate-200 text-center rounded-2xl w-36 md:w-64 md:h-20 mx-6 my-5 px-5 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-75">Ranked indexing</div>
              </div> */}
            </div>
            <div className="flex flex-col items-center pt-10">
              <Link className="bg-slate-300 items-center mx-6 my-5 px-4 py-3 
              border-slate-400 rounded-full border border-dashed hover:bg-slate-200 transition-all duration-75
              text-center text-sm md:text-md font-zilla-slab-italic" href="main">
                Get started
              </Link>
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
