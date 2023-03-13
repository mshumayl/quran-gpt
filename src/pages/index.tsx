/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, GetSessionParams, signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import NavBar from "~/components/NavBar";
import { AppProps } from "next/app";
import MobileNavBar from "~/components/MobileNavBar";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <NavBar/><MobileNavBar/>
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-20">
          <div className="font-righteous text-3xl md:text-6xl">
            AI-Daleel
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

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
