/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, type FC, type FormEvent, useRef } from 'react'
import { api } from '~/utils/api';

interface NotesProps {
    userId: string;
    verseId: string;
}

type savedNoteType = {
  note?: string,
  saveTime?: string
}[]

const SubmitNoteButton: FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <button className="w-max bg-green-200" type="submit">
        Submit
    </button>
  )
}

const Notes: FC<NotesProps> = ({ userId, verseId }) => {

  const [ savedNoteValue, setSavedNoteValue ] = useState<savedNoteType>([{}]);
  const [ newNoteValue, setNewNoteValue ] = useState(""); //This is used to decide whether or not to render submit button
  const newNoteRef = useRef<HTMLFormElement>(null);

  let snippetId = "";

  const snippet = api.db.getSnippetId.useQuery({ userId: userId, verseId: verseId  }).data

  if (snippet !== undefined) {
    snippetId = snippet[0]?.id ?? ""; //Assign to "" if indexed array is undefined
  }

  const getNotesApi = api.db.getNotes.useMutation()
  
  //This useEffect runs on page load. A function will useQuery to get all saved notes.
  //If result set is not empty, update savedNoteValue with result set.
  useEffect(() => {

    //This async function is required as await can only be run inside an async function, but useEffect cannot be async.
    async function getNotesFetcher() {
      const dbNotes = await getNotesApi.mutateAsync({ userId: userId, snippetId: snippetId })
      
      if ( dbNotes?.result === "NOTES_RETRIEVED" ) {
          const contents = dbNotes?.data?.map(({content}) => {
            return { note: content }
          })

          if (contents !== undefined) {
            setSavedNoteValue(contents)
          }
      }
    }

    void getNotesFetcher();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snippetId])


  const submitNoteApi = api.db.addNote.useMutation();

  const handleNewNote = async (event: FormEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.preventDefault();
    
    //Append newNoteValue to savedNoteValue array
    setSavedNoteValue(previous => [...previous, {note: newNoteValue}])

    if (newNoteRef.current !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      newNoteRef.current.reset();
      setNewNoteValue("");
    }

    //Send newNoteValue to addNote API (which is possible as the procedure can defined first before running mutateAsync.)
    const res = await submitNoteApi.mutateAsync({ 
      userId: userId, 
      snippetId: snippetId,
      verseId: verseId, 
      content: newNoteValue 
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console.log("submitNoteApi response: ", res)
  }

  return (
    <div className="w-full min-h-screen">
        <div className="w-full min-h-fit font-zilla-slab-italic text-xl mb-2">
          My Notes
        </div>
        <div className="">
          {savedNoteValue.map(({note}) => {
            if (note !== undefined) { //This is required because the first element of savedNoteValue is empty (If there is no fetch)
              return (<div className="my-1 py-1 px-2 align-center text-sm rounded-md bg-slate-200 shadow-inner border border-dashed border-slate-300 text-slate-400" key={note}>{note}</div>)
            }
          })}
        </div>
        <form ref={newNoteRef} onSubmit={handleNewNote}>
          <div className="w-full bg-white rounded-xl shadow-inner border border-dashed border-slate-400">
              <textarea name="noteInput" className="m-1 p-1 appearance-none resize-none w-11/12 outline-none" placeholder={`Add note...`} onChange={(event) => {
                  setNewNoteValue(event.target.value);
                }}>
              </textarea>
              {/* <div className="bg-slate-200">{noteValue}</div> */}
          </div>
          <div className="">
            {(newNoteValue.length > 0) 
            ? (<SubmitNoteButton/>) 
            : (<></>)}
          </div>
        </form>
    </div>
  )
}

export default Notes;