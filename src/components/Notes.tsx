/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, type FC, useEffect } from 'react'
import { api } from '~/utils/api';

interface NotesProps {
    userId: string;
    verseId: string;
}

//Callbacks passed as prop
interface SubmitNoteButtonProps {
    setSavedNoteValue: React.Dispatch<React.SetStateAction<savedNoteType>>;
    newNoteValue: string;
    userId: string;
    snippetId: string;
    verseId: string;
}

type savedNoteType = {
  note?: string,
  saveTime?: string
}[]

const SubmitNoteButton: FC<SubmitNoteButtonProps> = ({ setSavedNoteValue, newNoteValue, userId, snippetId, verseId }) => {

  const submitNoteApi = api.db.addNote.useMutation();

  const handleNewNote = async () => {
    //Append newNoteValue to savedNoteValue array
    setSavedNoteValue(previous => [...previous, {note: newNoteValue}])
    console.log("setSavedNoteValue")
    //Send newNoteValue to addNote API (which is possible as the procedure can defined first before running mutateAsync.)
    const res = await submitNoteApi.mutateAsync({ 
      userId: userId, 
      snippetId: snippetId,
      verseId: verseId, 
      content: newNoteValue 
    });

    console.log("submitNoteApi response: ", res)
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <button className="w-max bg-green-200" onClick={handleNewNote}>
        Submit
    </button>
  )
}

const Notes: FC<NotesProps> = ({ userId, verseId }) => {

  const [ savedNoteValue, setSavedNoteValue ] = useState<savedNoteType>([{}]);
  const [ newNoteValue, setNewNoteValue ] = useState(""); //This is used to decide whether or not to render submit button

  let snippetId = "";

  const snippet = api.db.getSnippetId.useQuery({ userId: userId, verseId: verseId  }).data

  if (snippet !== undefined) {
    snippetId = snippet[0]?.id ?? ""; //Assign to "" if indexed array is undefined
  }

  //This useEffect runs on page load. A function will useQuery to get all saved notes.
  //If result set is not empty, update savedNoteValue with result set.
  //The dependency array is empty [] to only run on page load.
  useEffect(() => {
    console.log("useEffect for page load")
    console.log("Fetch saved verse from db")
    

    if (snippet && snippet.length != 0) {
      console.log("Saved verse exists in table.")
      console.log(snippet)
      
      //HERE: Query saved notes for id = snippetId. 
      
      //HERE: setSavedNoteValue to the above result. Need to parse.
    }
  }, [snippet])

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
          {(newNoteValue.length > 0) 
          ? (<SubmitNoteButton 
          setSavedNoteValue={setSavedNoteValue} 
          newNoteValue={newNoteValue} 
          userId={userId} 
          snippetId={snippetId}
          verseId={verseId}/>) 
          : (<></>)}
        </div>
    </div>
  )
}

export default Notes;