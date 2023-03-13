import Link from 'next/link';
import React, { FC } from 'react'

const NavBar: FC = ({  }) => {
  return (
    <div className="bg-slate-200 border-slate-500 border-b border-dashed h-12 items-center w-full flex flex-row px-2 ">
        <div className="ml-2 flex gap-4 w-2/3 font-zilla-slab-italic">
            <Link className="invisible sm:visible hover:text-emerald-500" href="/">Home</Link>
            <Link className="invisible sm:visible hover:text-emerald-500" href="/main">Find Daleel</Link>
        </div>
        <div className="mr-2 flex gap-4 justify-end w-1/3 font-zilla-slab-italic">
            <div className="invisible sm:visible text-sm mr-4">Logged in as</div>
            <Link className="text-xs self-center hover:text-emerald-500 sm:border sm:border-slate-500 sm:px-1 sm:bg-white sm:border-dashed" href="/">LOG OUT</Link>
        </div>
    </div>
  )
}

export default NavBar;