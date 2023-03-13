/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { type AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { GetSessionParams, signIn, getProviders } from "next-auth/react";

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers }
  }
}

const SignIn = ({ providers }: { providers: AppProps }) => {
  return (
    <>
      <Head>
        <title>Log In - AI-Daleel</title>
        <meta name="description" content="AI-powered al-Quran daleel search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-screen flex-col pt-2 items-start bg-slate-100">
        <div>
            <div>
                {Object.values(providers).map((provider) => (
                    <button
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    key={provider.id}
                    onClick={() => 
                        signIn(provider.id, {
                            callbackUrl: `/main`,
                        })
                    }
                    >
                        Sign In with Google
                    </button>
                ))}
            </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
