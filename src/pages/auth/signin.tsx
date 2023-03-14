/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { type AppProps } from "next/app";
import Head from "next/head";
import { signIn, getProviders } from "next-auth/react";
import Image from 'next/image';

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers }
  }
}

const SignIn = ({ providers }: { providers: AppProps }) => {

  const cmapMain: {[index: string]: unknown} = {
    "google": "bg-red-200",
    "discord": "bg-purple-200",
    "github": "bg-slate-300"
  }

  const cmapBorder: {[index: string]: unknown} = {
    "google": "border-red-400",
    "discord": "border-purple-400",
    "github": "border-slate-500"
  }

  
  const cmapHover: {[index: string]: unknown} = {
    "google": "hover:bg-red-300",
    "discord": "hover:bg-purple-300",
    "github": "hover:bg-slate-400"
  }

  const cmapDivide: {[index: string]: unknown} = {
    "google": "divide-red-300",
    "discord": "divide-purple-300",
    "github": "divide-slate-400"
  }



  return (
    <>
      <Head>
        <title>Log In - AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <div className="flex flex-col mt-32 w-2/3 md:w-1/3">
            <div className="flex self-center mb-32 w-full font-righteous text-2xl md:text-6xl justify-center">AI-Daleel</div>
            <div className="flex self-center mb-6 text-xs font-zilla-slab-italic text-gray-400">Sign in with</div>
            <div className="flex flex-col gap-4 w-full md:w-1/2 self-center">
                {Object.values(providers).map(({id, name}) => (
                    <button className={`rounded-lg ${cmapMain[id]} px-2 h-10 font-zilla-slab-italic border border-dashed 
                    ${cmapBorder[id]} ${cmapHover[id]} transition-all duration-75 shadow-md`}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    key={id}
                    onClick={() => 
                        signIn(id, {
                            callbackUrl: `/main`,
                        })
                    }
                    >
                      <div className={`flex flex-row divide-x divide-dashed ${cmapDivide[id]}`}>
                        <div className="flex w-1/3 justify-center">
                          <Image alt="image" src={`/icons/${id}.svg`} width="15" height="15" className=""/>
                        </div>
                        <div className="flex justify-center w-2/3">{name}</div>
                      </div>
                    </button>
                ))}
            </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
