import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import PromptInput from "~/components/PromptInput";

const Main: NextPage = () => {


  return (
    <>
      <Head>
        <title>AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col pt-2 items-start bg-slate-100">
        <Link className="flex w-full ml-3 text-slate-600 font-zilla-slab-italic" href="/">Back</Link>
        <div className="flex flex-col w-full items-center gap-2 px-4 py-16">
          <div className="font-righteous text-3xl md:text-6xl">
            AI-Daleel
          </div>
          <div className="text-center text-sm md:text-md font-zilla-slab-italic">
            AI-powered al-Quran daleel search
          </div>
          <div className="mt-10 md:p-10 w-full md:w-2/3 flex flex-col items-center">
              <PromptInput/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
