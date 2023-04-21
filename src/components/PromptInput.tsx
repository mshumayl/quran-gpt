/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, type FC, type FormEvent  } from 'react'
import { api } from '~/utils/api';
// import VerseCard from './VerseCard';

// Dynamic import with SSR: false to avoid hydration issues. Refer to https://github.com/mshumayl/quran-gpt/issues/7.
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Toaster from './Toaster';
const VerseCard = dynamic(() => import("./VerseCard"), {ssr: false})

const PromptInput: FC = ({  }) => {
 
  type responseType = {
    "surah": number,
    "verse": number
  }[]
  
  const defaultResponse: responseType = [{"surah": 0, "verse": 0}];

  const [inputValue, setInputValue] = useState<string>("");
  const [inputLength, setInputLength] = useState<number>(0);
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [displayLoader, setDisplayLoader] = useState<boolean>(false);
  const [toasterResult, setToasterResult] = useState<string>("");
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<responseType>(() => {
    // Assign cachedResponse if useState is being run on client-side
    const cachedResponse = (
      typeof window !== "undefined" && localStorage.getItem("cached_response") !== null && localStorage.getItem("cached_response") !== undefined) 
      ? JSON.parse(localStorage.getItem("cached_response") || `${defaultResponse}`)
      : `${defaultResponse}`;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cachedResponse;
  });
  
  const maxInputLength = 140;

  const submitApi = api.openai.submitPrompt.useMutation();
  const logApi = api.openai.logUserSearch.useMutation();

  const { data: session } = useSession(); // To get quota

  //Reset toaster after timeout
  useEffect(() => {
    console.log(toasterResult)
    if (toasterResult !== "") {
      const timeout = setTimeout(() => {
        setToasterResult("")
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [toasterResult])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Check quota. useSession is only run on page refresh, so newly exhausted quotas can only be checked on server-side.
    if (session?.user.searchQuota !== 0) {
      setDisplayLoader((prevState) => !prevState);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      //TODO: Once there is a proper response object for submitPrompt, remove the eslint escape above
      const res = await submitApi.mutateAsync({ userPrompt: inputValue });
  
      if (res.result === "SEARCH_SUCCESS" && res.respObj !== undefined) {
        
        setAiResponse(res.respObj);

        setToasterResult(res.result);
        setToasterMessage(res.message);

        //logSearch here. 
        //Logging can be improved by doing it on client side.
        //However need to make sure that the logging db IO does not slow down response time.
        const logRes = await logApi.mutateAsync({ prompt: inputValue, result: res.result, respObj: JSON.stringify(res.respObj) });

      } else if (res.result && res.message) {

        setToasterResult(res.result);
        setToasterMessage(res.message);

        //logSearch here
        const logRes = await logApi.mutateAsync({ prompt: inputValue, result: res.result });

      } else {

        const result = "UNEXPECTED"
        const message = "Unexpected input. Please try again."
        setToasterResult(result);
        setToasterMessage(message);

        //logSearch here
        const logRes = await logApi.mutateAsync({ prompt: inputValue, result: res.result });

      }

      setDisplayLoader((prevState) => !prevState);
      
    } else {

      const result = "NO_SEARCH_QUOTA"
      const message = "You have run out of search quota for the day. Please try again tomorrow."
      setToasterResult(result);
      setToasterMessage(message);

    }
  }

  const handleClear = () => {
    setAiResponse(defaultResponse);
  }

  const placeholder = [
    "Ruling on smoking cigarettes", 
    "Importance of striving towards knowledge", 
    "அறிவை நோக்கிச் செல்வதன் முக்கியத்துவம்",
    "Hukum berpuasa di bulan Ramadhan", 
    "Abraham's sacrifice",
    "Story of Yusuf and his brothers", 
    "Di manakah bahtera Nabi Nuh mendarat",
    "Birth of Jesus",
    "Lan tanaalul birra hatta tunfiqu",
    "Inna fatahna laka fathan mubina",
    "Longest verse in the Quran",
    "Story of David vs Goliath",
    "Wasaari'uu ila maghfiratin min rabbikum",
    "قصة موسى ضد فرعون",
    "Politics in Islam",
    "அரசியல் மற்றும் தலைமைத்துவம்",
    "关于禁食的裁决",
    "善待孤儿"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevState) => {
        const newIdx = Math.floor(Math.random() * (placeholder.length))
      
        if (newIdx !== prevState) {
          return newIdx
        } else {
          return placeholder.length % newIdx
        }

      })
    }, 3000)
    return (() => clearInterval(interval))
  })

  useEffect(() => {
    setInputLength(inputValue.length);
  }, [inputValue]);

  //Save in localStorage
  useEffect(() => {
    localStorage.setItem("cached_response", JSON.stringify(aiResponse));
  }, [aiResponse]);

  return (
    <>
        <form onSubmit={handleSubmit} id="promptForm" name="promptForm" className="flex flex-col justify-center">
              <label htmlFor="promptInput" className="flex mb-1 mx-1 font-zilla-slab">Search</label>
              <textarea
              form="promptForm"
              rows={2}
              cols={50}
              id="promptInput"
              className="transition-all p-2 flex w-full h-24 rounded-lg text-sm border border-dashed border-slate-400 shadow-inner"
              placeholder={placeholder[placeholderIndex]}
              maxLength={maxInputLength}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}>
              </textarea>
              <div className="text-end mx-2 my-1 text-xs text-slate-400">{inputLength}/{maxInputLength}</div>
              {/* Submit button */}
              <button type="submit" className="transition-all m-10 p-2 flex flex-col items-center bg-emerald-400 
              rounded-lg border border-dashed border-emerald-600 
              hover:bg-emerald-300 active:bg-emerald-200 text-md 
              shadow-lg translate-x-1 -translate-y-1 
              hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md
              active:translate-x-0 active:-translate-y-0 active:shadow-inner
              text-white tracking-widest
              font-zilla-slab">
                  Submit
              </button>
        </form>
        
        {/* Clear results button */}
        {(aiResponse.length === 3) 
        ? (<button onClick={handleClear} className="underline underline-offset-2 flex flex-col items-center text-sm font-zilla-slab-italic text-slate-600 hover:text-emerald-500">Clear results</button>) 
        : (<></>)}
        
        <ul className="flex flex-col items-center w-full gap-10 mt-10">
          {/* Check if aiResponse is a valid array of objects before mapping. */}
           {aiResponse && aiResponse.map && aiResponse.map(({ surah, verse }) => {
              return ((displayLoader) 
                ? (<div key={`${surah}_${verse}`} className="animate-ping font-zilla-slab text-xs h-max w-max text-slate-500 my-4 rounded-lg bg-slate-200 mt-10 py-1 px-2">Thinking...</div>) 
                : (surah !== 0) 
                ? (
                  <Link href={`verse/${surah}_${verse}`} className="flex items-center">
                    <VerseCard surah={surah} verse={verse}/>
                  </Link>
                ) 
                : (<></>)
              );}
            )}
        </ul>

        <div className="z-50">
          <Toaster status={toasterResult} message={toasterMessage}/>
        </div>
    </>
  )
}

  export default PromptInput;