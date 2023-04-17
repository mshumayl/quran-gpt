import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { type FC } from 'react'

// interface QuotaCountProps {

// }

const QuotaCount: FC = () => {
    const { data: session } = useSession(); //Change to a proper query

    return (
        <div className="grid grid-cols-3 space-x-2 transition-all text-xs mr-2">
            <div className="grid grid-rows-2 mx-1">
                <div>Q</div>
                <div>2</div>
            </div>
            <div className="grid grid-rows-2 mx-1">
                <div>Q</div>
                <div>5</div>
            </div>
            <div className="grid grid-rows-2 mx-1">
                <div>Q</div>
                <div>3</div>
            </div>
        </div>
    )
}

export default QuotaCount;