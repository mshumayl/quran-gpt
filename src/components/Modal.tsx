import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, type FC } from 'react'
import { api } from '~/utils/api';


interface ModalProps {
    setModalVisibleCallback: React.Dispatch<React.SetStateAction<boolean>>;
}


const Modal: FC<ModalProps> = ({ setModalVisibleCallback }) => {
    
    const setNotificationApi = api.db.setUserNotification.useMutation();

    const handleYesNotification = () => {
        const res = setNotificationApi.mutateAsync({ isNotify: true });
        localStorage.setItem("modal_displayed", "true")

        setModalVisibleCallback(false);
    }
    
    const handleNoNotification = () => {
        const res = setNotificationApi.mutateAsync({ isNotify: false });
        localStorage.setItem("modal_displayed", "true")

        setModalVisibleCallback(false);
    }

    return (
        <div className="max-h-screen min-h-fit fixed w-11/12 sm:w-5/6 md:w-4/5 lg:w-1/2 bg-white shadow-2xl rounded-2xl border border-dashed border-slate-400 p-10 justify-center content-center">
            <div className="font-zilla-slab text-lg md:text-xl text-emerald-500 flex justify-center mt-2">You have exhausted your daily quota for AI Search and AI Generate.</div>
            <div className="font-zilla-slab text-slate-600 text-md md:text-lg flex justify-center mt-8">However, we have good news! AI-Daleel Premium subscription is coming soon, which will provide you with more AI Search and AI Generate quotas.</div>
            <div className="font-zilla-slab text-slate-600 text-md md:text-lg flex justify-center mt-5">Would you like to be notified when the Premium subscription is available? Keep up-to-date and never miss out on the latest features!</div>
            <div className="grid justify-center mt-8 gap-2">
                <button onClick={handleYesNotification} className="justify-center text-md md:text-lg text-white font-jost bg-emerald-400 hover:bg-emerald-500 py-1 px-2 rounded-lg">Notify Me</button>
                <button onClick={handleNoNotification} className="justify-center text-sm md:text-md text-slate-500 font-zilla-slab-italic mt-4">No Thanks</button>
            </div>
        </div>
    );
}

export default Modal;