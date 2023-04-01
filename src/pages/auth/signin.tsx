/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
        <link rel="icon" href="/ai-daleel.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <div className="flex flex-col mt-32 w-4/5 md:w-2/3">
            <div className="flex flex-row w-full  justify-center">
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
            <div className="flex self-center mt-6 mb-6 text-xs font-zilla-slab-italic text-gray-400">Sign in with</div>
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
