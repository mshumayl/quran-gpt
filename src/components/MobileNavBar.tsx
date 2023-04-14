/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { type FC } from 'react'
import { useRouter } from 'next/router';

const NavBar: FC = () => {
  const { data: sessionData } = useSession();
  const { asPath } = useRouter();

  return (
    <>
    {/* Top Nav */}
      <div className="fixed z-40 w-full top-0 bg-slate-50 border-slate-500 border-b border-x justify-center rounded-b-3xl shadow-lg border-dashed h-8 items-center flex-row px-2 flex sm:hidden">
            <div className="mr-0 sm:mr-1 text-xs flex flex-row gap-1 items-center justify-center w-2/3 font-zilla-slab-italic">
                {(sessionData) ? (<div className="text-xs mr-1">{sessionData.user.email}</div>) : (<></>)}
                <button
                  className="text-xs self-center rounded-md p-1 bg-slate-200 hover:bg-slate-300 transition-all shadow-inner"
                  onClick={sessionData ? () => void signOut({ callbackUrl: '/' }) : () => void signIn()}
                >
                {sessionData ? "Sign out" : "Sign in"}
                </button>
            </div>
      </div>
    {/* Bottom Nav */}
      <div className="fixed z-40 w-full bottom-0 bg-slate-50 border-slate-500 border-t border-x rounded-t-3xl shadow-lg border-dashed h-12 items-center grid grid-cols-3 flex-row px-2 sm:hidden transition-all">
        <Link className={`w-full h-full grid items-center justify-center rounded-full ${(asPath==="/") ? ("bg-slate-200 shadow-inner h-3/4"): ("")}`} href="/">
        <svg className={`w-6 h-6 stroke-1 ${(asPath==="/") ? ("fill-emerald-300 stroke-emerald-400 hover:fill-emerald-400 hover:stroke-emerald-500 "): ("fill-slate-300 stroke-slate-400 hover:fill-slate-400 hover:stroke-slate-500")} transition-all`} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
        </Link>
        <Link className={`w-full h-full grid items-center justify-center rounded-full ${(asPath==="/main") ? ("bg-slate-200 shadow-inner h-3/4"): ("")}`} href="/main">
          <svg className={`-my-1 w-10 h-10 ${(asPath==="/main") ? ("fill-emerald-400 stroke-emerald-400 hover:fill-emerald-500 hover:stroke-emerald-500 "): ("fill-slate-400 stroke-slate-400 hover:fill-slate-500 hover:stroke-slate-500")}  transition-all`} xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1080 1080"><path d="m719.05 549.78 69.49-39 43.67-24.48a51 51 0 1 0-34.43-60.95l-30.26 17L702.19 479l-79.73 44.7-73.29 41.09a14.88 14.88 0 0 1-14.54 0l-52.33-29.36-82.22-46.09-69.49-39L287 425.92a51 51 0 1 0-35.11 60.57l29.08 16.31 65.34 36.63L426 584.12 447.2 596a14.86 14.86 0 0 1 0 25.93l-.23.13-82.22 46.09-69.49 39-50 28-4.58 2.55a51 51 0 1 0 35.56 60.3l40-22.45L381.61 739l79.73-44.69 87.33-49 88.16-49.42ZM847.5 735.58a52.83 52.83 0 0 0-7.27.52l-37.38-21-65.33-36.63-79.73-44.7-16.6-9.3a10.23 10.23 0 0 0-10 0l-66.57 37.32 36.88 20.67 82.22 46.1 69.49 39L796.77 792a51 51 0 1 0 50.73-56.41Z"/><path d="M952 259.44c-10.42-16.18-30.78-22.14-47.88-12.56L866 268.24l-91.09 51-110.56 61.97-95.2 53.34q-8.5 4.76-17.07 9.45a25.56 25.56 0 0 1-24.87-.08l-7.86-4.4-91.09-51-110.57-61.97-95.21-53.34c-15.44-8.64-30.76-17.54-46.34-26l-.66-.37c-16-8.95-38.95-4.36-47.89 12.56-8.73 16.52-4.5 38.33 12.56 47.88l38.12 21.36 91.09 51 110.58 62 95.2 53.36c15.44 8.65 30.76 17.55 46.34 26l.67.37a35.2 35.2 0 0 0 11.57 4 34.76 34.76 0 0 0 19.85-2.1l.11-.05c.25-.1.5-.2.75-.32a33.34 33.34 0 0 0 4.67-2.43L595.6 500l91.09-51 110.58-62 95.2-53.33c15.43-8.65 31.08-17 46.34-26l.67-.38c15.98-8.92 22.67-32.17 12.52-47.85Z"/></svg>
        </Link>
        <Link className={`w-full h-full grid items-center justify-center rounded-full ${(asPath==="/savedVerses") ? ("bg-slate-200 shadow-inner h-3/4"): ("")}`} href="/savedVerses">
          <svg className={`h-7 w-7 ${(asPath==="/savedVerses") ? ("fill-emerald-300 stroke-emerald-400 hover:fill-emerald-400 hover:stroke-emerald-500 "): ("fill-slate-300 stroke-slate-400 hover:fill-slate-400 hover:stroke-slate-500")} transition-all`} width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C7.28 3 8.12 3 9.8 3h4.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C19 5.28 19 6.12 19 7.8V21l-7-4-7 4V7.8Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
    </>
    
  )
}

export default NavBar;