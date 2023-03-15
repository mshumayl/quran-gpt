/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, type FC, type FormEvent  } from 'react'
import { api } from '~/utils/api';
import VerseCard from './VerseCard';

const PromptInput: FC = ({  }) => {
  type responseType = {
    "surah": number,
    "verse": number
  }[]

  const defaultResponse = [{"surah": 0, "verse": 0}, {"surah": 0, "verse": 0}, {"surah": 0, "verse": 0}]

  const [inputValue, setInputValue] = useState<string>("");
  const [inputLength, setInputLength] = useState<number>(0);
  const [aiResponse, setAiResponse] = useState<responseType>(() => {
        const cachedResponse = (typeof window !== "undefined") ? localStorage.getItem("cached_response") : ""; //Because of SSR, need to check if code is running client-side
    const parsedCachedResponse = JSON.parse(cachedResponse || "");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return parsedCachedResponse || defaultResponse;
  });
  const [displayLoader, setDisplayLoader] = useState<boolean>(false);
  
  const maxInputLength = 140

  const submitApi = api.openai.submitPrompt.useMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setDisplayLoader((prevState) => !prevState)
    e.preventDefault();
    console.log(inputValue);
    console.log(displayLoader)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const res = await submitApi.mutateAsync({ userPrompt: inputValue })
    // console.log(res)
    const json = JSON.parse(res.response.replace(/[\n\r]/g, ''))
    // console.log(json)

    setAiResponse(json)
    setDisplayLoader((prevState) => !prevState)
    console.log(displayLoader)
  }

  useEffect(() => {
    setInputLength(inputValue.length);
  }, [inputValue])

  //Save in localStorage
  useEffect(() => {
    localStorage.setItem("cached_response", JSON.stringify(aiResponse));
  }, [aiResponse]);
  
  // useEffect(() => {
  //   const aiResponse = localStorage.getItem("cached_response");
  //   if (aiResponse) {
  //     setAiResponse(JSON.parse(aiResponse));
  //   }
  // }, []);

  return (
    <>
        <form onSubmit={handleSubmit} id="promptForm" name="promptForm" className="flex flex-col justify-center">
              <label htmlFor="promptInput" className="flex mb-1 mx-1 font-zilla-slab-italic">Prompt</label>
              <textarea
              form="promptForm"
              rows={2}
              cols={50}
              id="promptInput"
              className="p-2 flex w-full h-24 rounded-lg text-sm border border-dashed border-slate-400"
              placeholder="Query the Quran"
              maxLength={maxInputLength}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}>
              </textarea>
              <div className="text-end mx-2 my-1 text-xs text-slate-400">{inputLength}/{maxInputLength}</div>
              <button type="submit" className="m-10 p-2 flex flex-col items-center bg-slate-300 rounded-lg border border-dashed border-slate-400 
              hover:bg-slate-200 active:bg-slate-400 text-sm font-zilla-slab-italic">
                  Submit
              </button>
        </form>
        <ul className="flex flex-col items-center w-full">
           {aiResponse.map(({ surah, verse }) => {
              return ((displayLoader) ? 
                (<div key={`${surah}_${verse}`} className="animate-ping font-zilla-slab-italic text-xs h-max w-max text-slate-500 my-4 rounded-lg bg-slate-200 py-1 px-2">Thinking...</div>) : (surah !== 0 ) ?
                (<VerseCard surah={surah} verse={verse}/>) 
                : (<></>)
              );}
            )}
        </ul>
    </>
  )
}

  export default PromptInput;