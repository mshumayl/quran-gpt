import { useSession } from 'next-auth/react';
import React, { useState, type FC, useEffect } from 'react'

interface NotesProps {
    notes?: string;
}

const SubmitNoteButton: FC = ({  }) => {

  return (
    <div className="w-max bg-green-200" onClick={() => {console.log("Append savedNoteValue arr here")}}>
        Submit
    </div>
  )
}

const Notes: FC<NotesProps> = ({ notes }) => {
  const { data: sessionData } = useSession();

  type savedNoteType = {
    note: string,
    saveTime: string
  }[]

  const [ savedNoteValue, setSavedNoteValue ] = useState<savedNoteType>([{note: "", saveTime: ""}]);
  const [ newNoteValue, setNewNoteValue ] = useState(""); //This is used to decide whether or not to render submit button
  
  //This useEffect runs on page load. A function will useQuery to get all saved notes.
  //If result set is not empty, update savedNoteValue with result set.
  //The dependency array is empty [] to only run on page load.
  useEffect(() => {
    console.log("useEffect for page load")
    console.log("Fetch saved verse from db")
    console.log("If saved verse not empty, setSavedNoteValue")
    //setSavedNoteValue
  }, [])

  return (
    <div className="w-full min-h-screen">
        <div className="w-full min-h-fit font-zilla-slab-italic text-xl mb-2">
          My Notes
        </div>
        <div className="w-full bg-white rounded-xl shadow-inner border border-dashed border-slate-400">
            <textarea className="m-1 p-1 appearance-none resize-none w-11/12 outline-none" placeholder={`Add note...`} onChange={(event) => {
                setNewNoteValue(event.target.value);
              }}>
            </textarea>
            {/* <div className="bg-slate-200">{noteValue}</div> */}
        </div>
        <div className="">
          {(newNoteValue.length > 0) ? (<SubmitNoteButton/>) : (<></>)}
        </div>
    </div>
  )
}

export default Notes;