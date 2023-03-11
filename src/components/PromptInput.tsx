/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, type FC, type FormEvent  } from 'react'
import { api } from '~/utils/api';

const PromptInput: FC = ({  }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputLength, setInputLength] = useState<number>(0);
  const [aiResponse, setAiResponse] = useState<string>("");
  
  const submitApi = api.openai.submitPrompt.useMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const res = await submitApi.mutateAsync({ userPrompt: inputValue })
    // console.log(res)
    const json = JSON.parse(res.response.replace(/[\n\r]/g, ''))
    console.log(json)

    setAiResponse(res.response.replace(/[\n\r]/g, ''))
  }

  useEffect(() => {
    setInputLength(inputValue.length);
  }, [inputValue])

  return (
    <>
        <form onSubmit={handleSubmit} id="promptForm" name="promptForm" className="flex flex-col justify-center">
              <label htmlFor="promptInput" className="flex mb-1 mx-1">Prompt</label>
              <textarea
              form="promptForm"
              rows={2}
              cols={50}
              id="promptInput"
              className="p-2 flex w-full h-24 rounded-lg text-sm border border-dashed border-slate-400"
              placeholder="Query the Quran"
              maxLength={200}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}>
              </textarea>
              <div className="text-end mx-2 my-1 text-xs text-slate-400">{inputLength}/200</div>
              <button type="submit" className="m-10 p-2 flex flex-col items-center bg-slate-300 rounded-lg border border-dashed border-slate-400">
                  Submit
              </button>
        </form>
        <span className="m-10 bg-red-300 w-full text-sm flex flex-col">Response: {aiResponse}</span>
    </>
  )
}

export default PromptInput;