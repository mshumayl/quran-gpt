/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { env } from "~/env.mjs";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

type openAiRespT = {
    result: string,
    message?: string
}

export const openAiRouter = createTRPCRouter({
  submitPrompt: publicProcedure
    .input(z.object({ userPrompt: z.string() }))
    .mutation(async ({ input }) => {

        interface searchRespT extends openAiRespT {
            respObj: {
                "surah": number,
                "verse": number
            }[]
        }

        let res: searchRespT;

        const defaultRes = [{"surah": 0, "verse": 0}, {"surah": 0, "verse": 0}, {"surah": 0, "verse": 0}];

        //Query quota from User table
        //Check if 0
        //If not 0, carry out procedure and reduce searchQuota by 1
        //Might be the best moment to also refactor response object

        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: env.OPENAI_SECRET_KEY,
        })
        const openai = new OpenAIApi(configuration);

        const prompt = `Do not respond with anything else other than a JSON response. Do not explain your response. 
        Give me a JSON response specifying the surah numbers and the verse numbers three verses in the Quran that relates with the following themes: 
        "${input.userPrompt}". 
        Your JSON response needs to strictly follow the following format: 
        "[{"surah": 1, "verse": 1}, {"surah": 1, "verse": 1}, {"surah": 1, "verse": 1}]".`



        const openAiRes = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0301",
            messages: [{"role": "user", "content": prompt}]
        })

        const data = await openAiRes.data.choices[0].message.content;

        //Try to parse into array of object
        try {
            console.log("DATA", data);
            const respObj = JSON.parse(data.replace(/[\n\r]/g, '') as string);

            if (JSON.stringify(respObj) === JSON.stringify(defaultRes)) {
                res = { result: "INVALID_PROMPT", respObj: respObj }
            } else if (respObj.length > 3) {
                res = { result: "LENGTH_MOD_PROMPT_INJECTION", respObj: defaultRes }
            } else {
                res = { result: "SEARCH_SUCCESS", respObj: respObj }
            }
        } 
        catch (e) {
            console.log(e)
            res = { result: "BROKEN_RESPONSE_ARRAY", respObj: defaultRes }
        }

        return res

    }),
    
    generateNote: protectedProcedure
    .input(z.object({ surahNumber: z.string(), verseNumber: z.string(), verseTranslation: z.string() }))
    .mutation(async ({ ctx, input }) => {

        let res: openAiRespT = {
            result: ""
        }

        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: env.OPENAI_SECRET_KEY,
        })
        const openai = new OpenAIApi(configuration);

        const prompt = `Please generate a summary or commentary of the Quran Surah ${input.surahNumber}, Verse ${input.verseNumber}. 
        The verse translation is
        "${input.verseTranslation}"
        Respond with a commentary on the context and themes of this verse. 
        Respond in less than 140 words.
        Do not respond with a translation or a paraphrase.
        Do not tell me the surah and verse numbers.`

        console.log(prompt);

        if (ctx.session.user) {
            try {
                const openAiRes = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo-0301",
                    messages: [{"role": "user", "content": prompt}]
                })
                const openAiMessage = await openAiRes.data.choices[0].message.content;

                res = {
                    result: "AI_RESPONSE_RECEIVED",
                    message: openAiMessage
                }
            } catch (e) {
                console.log(e)
                res = {
                    result: "GENERATE_NOTE_ERROR",
                }
            }
        } else {
            res = {
                result: "USER_NOT_AUTHORIZED"
            }
        }
        
        return res
    })
});
