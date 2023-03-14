import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { type FC } from 'react'


const NavBar: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="bg-slate-200 border-slate-500 border-b border-dashed h-12 items-center w-full flex-row px-2 hidden sm:flex">
        <div className="ml-2 flex flex-row gap-4 w-1/2 font-zilla-slab-italic">
            <Link className="hover:text-emerald-500" href="/">Home</Link>
            <Link className="hover:text-emerald-500" href="/main">Find Daleel</Link>
        </div>
        <div className="mr-1 flex gap-4 justify-end w-1/2 font-zilla-slab-italic">
            {(sessionData) ? (<div className="text-xs mr-1">Logged in as {sessionData.user.email}</div>) : (<></>)}
            {/* <Link className="text-xs self-center hover:text-emerald-500 border border-slate-500 px-1 bg-white border-dashed" href="/">LOG OUT</Link> */}
            <button
              className="text-xs self-center hover:text-emerald-500 border border-slate-500 px-1 bg-white border-dashed"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
            {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    </div>
  )
}

export default NavBar;