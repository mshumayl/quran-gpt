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


        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: env.OPENAI_SECRET_KEY,
        })
        const openai = new OpenAIApi(configuration);

        const prompt = `Do not respond with anything else other than a JSON response. Do not explain your response. 
        Give me a JSON response specifying the surah numbers and the verse numbers three verses in the Quran that relates with the following keywords: 
        "${input.userPrompt}". 
        Your JSON response needs to strictly follow the following format: 
        "[{"surah": 1, "verse": 1}, {"surah": 1, "verse": 1}, {"surah": 1, "verse": 1}]".`

        try {
            const res = await openai.createChatCompletion({
                model: "gpt-3.5-turbo-0301",
                messages: [{"role": "user", "content": prompt}]
            })

            const data = await res.data.choices[0].message.content;

            console.log(data)

            return {
                response: data ? data : `[{"surah": 0, "verse": 0}]`
            }
        } catch(e) {
            return {e}
        }
    }),
    
    generateNote: protectedProcedure
    .input(z.object({ surahNumber: z.string(), verseNumber: z.string() }))
    .mutation(async ({ ctx, input }) => {

        let res: openAiRespT = {
            result: ""
        }

        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: env.OPENAI_SECRET_KEY,
        })
        const openai = new OpenAIApi(configuration);

        const prompt = `Please generate a summary of the Quran Surah ${input.surahNumber}, Verse ${input.verseNumber}. 
        Do not respond with a translation. Just summarize the context and themes of this verse. Respond in less than 140 words.
        Do not tell me the surah and verse numbers.`

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
