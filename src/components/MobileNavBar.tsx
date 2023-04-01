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
        <Link className={`w-full h-full grid items-center justify-center rounded-full ${(asPath==="/") ? ("bg-slate-200"): ("")}`} href="/">
        <svg className={`w-6 h-6 stroke-1 ${(asPath==="/") ? ("fill-emerald-300 stroke-emerald-400 hover:fill-emerald-400 hover:stroke-emerald-500 "): ("fill-slate-300 stroke-slate-400 hover:fill-slate-400 hover:stroke-slate-500")} transition-all`} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
        </Link>
        <Link className={`w-full h-full grid items-center justify-center rounded-full ${(asPath==="/main") ? ("bg-slate-200"): ("")}`} href="/main">
          <svg className={`w-10 h-10 ${(asPath==="/main") ? ("fill-emerald-400 stroke-emerald-400 hover:fill-emerald-500 hover:stroke-emerald-500 "): ("fill-slate-400 stroke-slate-400 hover:fill-slate-500 hover:stroke-slate-500")}  transition-all`} xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 600 450"><defs><clipPath id="a"><path d="M115.441 314.129h76.102v76.101h-76.102Zm0 0"/></clipPath><clipPath id="b"><path d="M153.492 314.129c-21.015 0-38.05 17.035-38.05 38.05 0 21.016 17.035 38.051 38.05 38.051 21.016 0 38.051-17.035 38.051-38.05 0-21.016-17.035-38.051-38.05-38.051"/></clipPath><clipPath id="c"><path d="M394.219 310.41h76.101v76.106H394.22Zm0 0"/></clipPath><clipPath id="d"><path d="M432.27 310.41c-21.016 0-38.051 17.04-38.051 38.05 0 21.017 17.035 38.056 38.05 38.056 21.016 0 38.051-17.04 38.051-38.055 0-21.012-17.035-38.05-38.05-38.05"/></clipPath><clipPath id="e"><path d="M91.512 130.809h76.101v76.101H91.512Zm0 0"/></clipPath><clipPath id="f"><path d="M129.563 130.809c-21.016 0-38.051 17.035-38.051 38.05 0 21.016 17.035 38.051 38.05 38.051 21.016 0 38.051-17.035 38.051-38.05 0-21.016-17.035-38.051-38.05-38.051"/></clipPath><clipPath id="g"><path d="M426.16 131.559h76.102v76.101H426.16Zm0 0"/></clipPath><clipPath id="h"><path d="M464.21 131.559c-21.015 0-38.05 17.035-38.05 38.05 0 21.016 17.035 38.051 38.05 38.051 21.017 0 38.052-17.035 38.052-38.05 0-21.016-17.035-38.051-38.051-38.051"/></clipPath></defs><path fill="none" strokeLinecap="round" strokeWidth="26" d="m13.002 13 214.447-.001" transform="matrix(1.26912 -.73273 .73406 1.27144 158.187 325.026)"/><path fill="none" strokeLinecap="round" strokeWidth="26" d="M13 13.001 125.39 13" transform="matrix(-1.27877 -.71307 .71501 -1.28225 293.62 285.237)"/><path fill="none" strokeLinecap="round" strokeWidth="51" d="m25.501 25.502 105.922-.003" transform="matrix(-.63736 -.39602 .39582 -.63704 419.292 361.43)"/><path fill="none" strokeLinecap="round" strokeWidth="71" d="m35.5 35.5 280.157.003" transform="matrix(-.64847 -.37615 .37632 -.64876 305.966 200.911)"/><path fill="none" strokeLinecap="round" strokeWidth="71" d="m35.5 35.501 278.988-.002" transform="matrix(.64448 -.38366 .38365 .64445 262.341 155.038)"/><g clipPath="url(#a)"><g clipPath="url(#b)"><path d="M115.441 314.129h76.102v76.101h-76.102Zm0 0"/></g></g><g clipPath="url(#c)"><g clipPath="url(#d)"><path d="M394.219 310.41h76.101v76.106H394.22Zm0 0"/></g></g><g clipPath="url(#e)"><g clipPath="url(#f)"><path d="M91.512 130.809h76.101v76.101H91.512Zm0 0"/></g></g><g clipPath="url(#g)"><g clipPath="url(#h)"><path d="M426.16 131.559h76.102v76.101H426.16Zm0 0"/></g></g></svg>
        </Link>
        <Link className={`w-full h-full grid items-center justify-center rounded-full ${(asPath==="/savedVerses") ? ("bg-slate-200"): ("")}`} href="/savedVerses">
          <svg className={`h-7 w-7 ${(asPath==="/savedVerses") ? ("fill-emerald-300 stroke-emerald-400 hover:fill-emerald-400 hover:stroke-emerald-500 "): ("fill-slate-300 stroke-slate-400 hover:fill-slate-400 hover:stroke-slate-500")} transition-all`} width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C7.28 3 8.12 3 9.8 3h4.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C19 5.28 19 6.12 19 7.8V21l-7-4-7 4V7.8Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
    </>
    
  )
}

export default NavBar;