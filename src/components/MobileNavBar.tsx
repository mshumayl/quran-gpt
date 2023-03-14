import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { type FC } from 'react'


const NavBar: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="bg-slate-200 border-slate-500 border-b border-dashed h-14 items-center w-full flex-row px-2 flex sm:hidden">
        <div className="ml-2 flex flex-col gap-1 w-1/3 font-zilla-slab-italic text-xs">
            <Link className="" href="/">Home</Link>
            {/* <Link className="hover:text-emerald-500" href="/main">Find Daleel</Link> */}
        </div>
        <div className="mr-0 sm:mr-1 text-xs flex flex-col gap-1 justify-end items-end w-2/3 font-zilla-slab-italic">
            {(sessionData) ? (<div className="text-xs mr-1">{sessionData.user.email}</div>) : (<></>)}
            <button
              className="mr-1 border border-slate-500 px-1 bg-white hover:bg-slate-50 border-dashed"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
            {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    </div>
  )
}

export default NavBar;