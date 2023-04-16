import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { type FC } from 'react'

interface ToasterProps {
    status: string;
    message?: string;
}

const Toaster: FC<ToasterProps> = ({ status, message }) => {
  const { data: sessionData } = useSession();

  if (status === "SAVE_SUCCESS") {
    return (
        <div className="bg-emerald-200 m-10 p-4 rounded-3xl right-0 bottom-0 fixed shadow-2xl border border-dashed border-emerald-500 transition-all">
            <div className="items-center flex flex-row gap-2">
                <svg className="w-6 h-6 stroke-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                <div className="font-zilla-slab-italic text-emerald-700">Successfully added bookmark.</div>
            </div>
        </div>
    )
  } else if (status === "SAVE_EXISTS") {
    return (
        <div className="bg-sky-200 m-10 p-4 rounded-3xl right-0 bottom-0 fixed shadow-2xl border border-dashed border-sky-500 transition-all">
            <div className="items-center flex flex-row gap-2">
                <svg className="w-6 h-6 stroke-sky-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                <div className="font-zilla-slab-italic text-sky-700">Verse already bookmarked.</div>
            </div>
        </div>
    )
  } else if (status === "SAVE_FAILED") {
    return (
        <div className="bg-rose-200 m-10 p-4 rounded-3xl right-0 bottom-0 fixed shadow-2xl border border-dashed border-rose-500 transition-all">
            <div className="items-center flex flex-row gap-2">
                <svg className="w-6 h-6 stroke-rose-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                <div className="font-zilla-slab-italic text-rose-700">Bookmark unsuccessful.</div>
            </div>
        </div>
    )
  } else if (status === "REMOVE_SUCCESSFUL") {
    return (
        <div className="bg-emerald-200 m-10 p-4 rounded-3xl right-0 bottom-0 fixed shadow-2xl border border-dashed border-emerald-500 transition-all">
            <div className="items-center flex flex-row gap-2">
                <svg className="w-6 h-6 stroke-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                <div className="font-zilla-slab-italic text-emerald-700">Successfully removed bookmark.</div>
            </div>
        </div>
    )
  } else if (status !== "" && message) { //To be used in PromptInput to feedback results.
    return (
        <div className="bg-sky-200 m-10 p-4 rounded-3xl right-0 bottom-0 fixed shadow-2xl border border-dashed border-sky-500 transition-all">
            <div className="items-center flex flex-row gap-2">
            <svg className="w-6 h-6 stroke-sky-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z"/></svg>
                <div className="font-zilla-slab-italic text-sky-700">{message}</div>
            </div>
        </div>
    )
  } else {
    return (
        <>
        </>
    )
  }
  
}

export default Toaster;