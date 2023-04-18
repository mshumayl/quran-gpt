import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, type FC } from 'react'
import { api } from '~/utils/api';



const Modal: FC = () => {


    return (
        <div className="fixed w-11/12 h-96 sm:w-5/6 md:w-4/5 lg:w-1/2 top-72 bg-white shadow-2xl rounded-2xl border border-dashed border-slate-400">
            Yes
        </div>
    );
}

export default Modal;