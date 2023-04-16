import { prisma } from '../../db';
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
    .mutation(async ({ ctx, input }) => {

        interface searchRespT extends openAiRespT {
            respObj?: {
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
        console.log(ctx.session?.user.id)

        //quotas.searchQuota is the count needed. 
        //Using ctx might be more performant, but it might not reflect the latest value as it is only fetched on client page load.
        const quotas = await prisma.user.findUnique({
            where: {
                id: ctx.session?.user.id
            },
            select: {
                searchQuota: true
            }
        })

        //Return straight away. Do not deduct the quota.
        if (quotas?.searchQuota !== undefined && quotas?.searchQuota <= 0) {
            res = { result: "OUT_OF_SEARCH_QUOTA" }
            return res
        } else if (quotas?.searchQuota === undefined) {
            res = { result: "UNABLE_TO_RETRIEVE_QUOTA" }
            return res 
        }

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
            console.log("DATA: ", data);
            const respObj = JSON.parse(data.replace(/[\n\r]/g, '') as string);

            if (JSON.stringify(respObj) === JSON.stringify(defaultRes)) {
                res = { result: "INVALID_PROMPT" }
            } else if (respObj.length > 3) {
                res = { result: "LENGTH_MOD_PROMPT_INJECTION" }
            } else {
                res = { result: "SEARCH_SUCCESS", respObj: respObj }
            }
        }
        catch (e) {
            console.log(e)
            res = { result: "BROKEN_RESPONSE_ARRAY" }
        }

        //Deduct quota
        if (quotas && quotas.searchQuota) {
            const prevQuota: number = quotas.searchQuota

            const newQuota = prevQuota - 1
            console.log(`${prevQuota} - 1 = ${newQuota}`)

            await prisma.user.update({
                where: {
                    id: ctx.session?.user.id
                },
                data: {
                    searchQuota: newQuota
                }
            })
        }

        return res

    }),
    
    generateNote: protectedProcedure
    .input(z.object({ surahNumber: z.string(), verseNumber: z.string(), verseTranslation: z.string() }))
    .mutation(async ({ ctx, input }) => {

        let res: openAiRespT = {
            result: ""
        }

        const quotas = await prisma.user.findUnique({
            where: {
                id: ctx.session?.user.id
            },
            select: {
                generateQuota: true
            }
        })

        //Return straight away. Do not deduct the quota.
        if (quotas?.generateQuota !== undefined && quotas?.generateQuota <= 0) {
            res = { result: "OUT_OF_GENERATE_QUOTA" }
            return res
        } else if (quotas?.generateQuota === undefined) {
            res = { result: "UNABLE_TO_RETRIEVE_QUOTA" }
            return res 
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

        //Finally, deduct quota
        if (quotas && quotas.generateQuota) {
            const prevQuota: number = quotas.generateQuota

            const newQuota = prevQuota - 1
            console.log(`${prevQuota} - 1 = ${newQuota}`)

            await prisma.user.update({
                where: {
                    id: ctx.session?.user.id
                },
                data: {
                    generateQuota: newQuota
                }
            })
        }
        
        return res
    })
});
