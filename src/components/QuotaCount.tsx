import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, type FC } from 'react'
import { api } from '~/utils/api';

interface QuotaCountProps {
    setModalVisibleCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuotaCount: FC<QuotaCountProps> = ({ setModalVisibleCallback }) => {

    let searchQuota = 0;
    let generateQuota = 0;
    let bookmarkQuota = 0;
    
    const quotas = api.db.getQuotas.useQuery({}).data

    if (quotas) {
        searchQuota = quotas.data.searchQuota;
        generateQuota = quotas.data.generateQuota;
        bookmarkQuota = quotas.data.bookmarkQuota;

        if (searchQuota !== 0 && generateQuota !== 0 && bookmarkQuota !== 0) {
            const modalDisplayed = localStorage.getItem("modal_displayed")

            if (modalDisplayed === null || modalDisplayed === "false") { //If modal_displayed is false or undefined
                setModalVisibleCallback(true)
                localStorage.setItem("modal_displayed", "true")
            }
        }
    }

    return (
        <>
            <div className="grid grid-cols-3 transition-all text-xs mr-2 font-sans">
                <div className="group grid grid-rows-2 mx-1 justify-items-center">
                    <div className="grid">
                        <svg className={`h-4 w-4 fill-emerald-500 stroke-emerald-500 transition-all`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" /></svg>
                    </div>
                    <div className="grid bg-slate-300 py-0.5 px-2 rounded-full font-zilla-slab-italic">
                        {searchQuota}
                    </div>
                    <span
                        className="font-zilla-slab-italic fixed hidden group-hover:flex top-28 -translate-y-full w-36 px-2 py-1 bg-gray-700 rounded-lg justify-center text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:-top-[30%] after:-translate-x-1/2 after:border-8 after:border-x-transparent  after:border-b-gray-700">
                        {`Remaining AI Search quota: ${searchQuota}`}
                    </span>
                </div>
                <div className="group grid grid-rows-2 mx-1 justify-items-center">
                    <div className="grid">
                        <svg className={`h-4 w-4 fill-emerald-500 stroke-emerald-500 transition-all`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" /></svg>
                    </div>
                    <div className="grid bg-slate-300 py-0.5 px-2 rounded-full font-zilla-slab-italic">
                        {generateQuota}
                    </div>
                    <span
                        className="font-zilla-slab-italic fixed hidden group-hover:flex top-28 -translate-y-full w-36 px-2 py-1 bg-gray-700 rounded-lg justify-center text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:-top-[30%] after:-translate-x-1/2 after:border-8 after:border-x-transparent  after:border-b-gray-700">
                        {`Remaining AI Note quota: ${generateQuota}`}
                    </span>
                </div>
                <div className="group grid grid-rows-2 mx-1 justify-items-center">
                    <div className="grid">
                        <svg className={`h-4 w-4 fill-emerald-500 stroke-emerald-500 transition-all`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C7.28 3 8.12 3 9.8 3h4.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C19 5.28 19 6.12 19 7.8V21l-7-4-7 4V7.8Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div className="grid bg-slate-300 py-0.5 px-2 rounded-full font-zilla-slab-italic">
                        {bookmarkQuota}
                    </div>
                    <span
                        className="font-zilla-slab-italic fixed hidden group-hover:flex top-28 -translate-y-full w-36 px-2 py-1 bg-gray-700 rounded-lg justify-center text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:-top-[30%] after:-translate-x-1/2 after:border-8 after:border-x-transparent  after:border-b-gray-700">
                        {`Remaining bookmark slots: ${bookmarkQuota}`}
                    </span>
                </div>
            </div>
        </>
    );
}

export default QuotaCount;