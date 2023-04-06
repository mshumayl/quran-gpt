import { useSession } from 'next-auth/react';
import React, { useState, type FC } from 'react'

interface NotesProps {
    notes?: string;
}

const Notes: FC<NotesProps> = ({ notes }) => {
  const { data: sessionData } = useSession();

  const [ noteValue, setNoteValue ] = useState("");

  

  return (
    <div className="w-screen px-20">
        <div className="w-full p-10 bg-white rounded-xl shadow-inner border border-dashed border-slate-400">
            <div>
                Notes
            </div>
            <textarea className="appearance-none resize-none w-full min-h-full" onChange={(event) => {
                setNoteValue(event.target.value);
              }}>
            </textarea>
            <div className="bg-slate-200">{noteValue}</div>
        </div>
    </div>
  )
}

export default Notes;