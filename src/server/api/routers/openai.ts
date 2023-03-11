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
                response: data ? data : "Something is wrong. No response returned."
            }
        } catch(e) {
            return {e}
        }
        
    }),
});
