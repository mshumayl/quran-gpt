import React, { ChangeEvent, useEffect, useState, type FC } from 'react'


const PromptInput: FC = ({  }) => {
  const [inputLength, setInputLength] = useState<number>(0);

  useEffect(() => {
    setInputLength
  }, [])

  return (
    <>
        <div className="flex flex-col justify-center">
              <label
              htmlFor="promptInput"
              className="flex mb-1 mx-1"
              >Prompt
              </label>
              <textarea
              rows={2}
              cols={50}
              id="promptInput"
              className="p-2 flex w-full h-24 rounded-lg text-sm border border-dashed border-slate-400"
              placeholder="Query the Quran"
              maxLength={200}
              onChange={(event) => setInputLength(event.target.value.length)}
               />
              <div className="text-end mx-2 my-1 text-xs text-slate-400">{inputLength}/200</div>
        </div>
    </>
  )
}

export default PromptInput;