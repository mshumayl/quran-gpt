import { useSession } from 'next-auth/react';
import React, { type FC } from 'react'

interface NotesProps {
    notes?: string;
}

const Notes: FC<NotesProps> = ({ notes }) => {
  const { data: sessionData } = useSession();

  return (
    <>
        <div>
            Notes
        </div>
    </>
  )
}

export default Notes;