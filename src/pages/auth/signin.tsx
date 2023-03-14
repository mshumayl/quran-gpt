/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { type AppProps } from "next/app";
import Head from "next/head";
import { signIn, getProviders } from "next-auth/react";

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers }
  }
}

const SignIn = ({ providers }: { providers: AppProps }) => {

  const colorMap: {[index: string]: unknown} = {
    "google": "red",
    "discord": "purple"
  }

  Object.values(providers).map(({ id }) => (
    console.log(colorMap[id])
  ))

  return (
    <>
      <Head>
        <title>Log In - AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <div className="flex flex-col mt-32">
            <div className="flex self-center mb-32 font-zilla-slab-italic text-2xl">Sign in to AI-Daleel</div>
            <div className="flex self-center mb-6 text-xs font-zilla-slab-italic text-gray-400">Sign in using</div>
            <div className="flex flex-col gap-4">
                {Object.values(providers).map((provider) => (
                    <button className="rounded-lg bg-slate-200 px-2 py-4 font-zilla-slab-italic border border-dashed border-slate-400"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    key={provider.id}
                    onClick={() => 
                        signIn(provider.id, {
                            callbackUrl: `/main`,
                        })
                    }
                    >
                        {provider.name}
                    </button>
                ))}
            </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
