import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FC } from 'react'


const NavBar: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="bg-slate-200 border-slate-500 border-b border-dashed h-12 items-center w-full flex-row px-2 flex sm:hidden">
        <div className="ml-2 flex flex-col gap-1 w-1/2 font-zilla-slab-italic text-xs">
            <Link className="hover:text-emerald-500" href="/">Home</Link>
            <Link className="hover:text-emerald-500" href="/main">Find Daleel</Link>
        </div>
        <div className="mr-1 flex gap-4 justify-end w-1/2 font-zilla-slab-italic">
            {(sessionData) ? (<div className="text-xs mr-1">{sessionData.user.email}</div>) : (<></>)}
        </div>
    </div>
  )
}

export default NavBar;