import { useSession } from 'next-auth/react';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { env } from "~/env.mjs";
import { PrismaClient } from '@prisma/client'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const dbRouter = createTRPCRouter({
  fetchVerse: publicProcedure
    .input(z.object({ surahNumber: z.string(), verseNumber: z.string() }))
    .query(async ({ input }) => {
        
        const { surahNumber, verseNumber } = input;
        const id = `${surahNumber}_${verseNumber}`

        //TODO: Shutdown connection after query
        const prisma = new PrismaClient();

        const querySurahName = await prisma.surahMetadata.findUnique({
            where: { 
                id: surahNumber
            },
            select: {
                surahTName: true
            }
        })

        const queryVerseText = await prisma.verses.findUnique({
            where: {
                id: id
            },
            select: {
                verseText: true,
                verseTranslation: true
            }
        })

        const surahName = querySurahName?.surahTName;
        const verseText = queryVerseText?.verseText;
        const verseTranslation = queryVerseText?.verseTranslation;

        return ({ surahName, verseText, verseTranslation })
    }),

    fetchDetails: publicProcedure
    .input(z.object({ surahNumber: z.string() }))
    .query(async ({ input }) => {
        
        const { surahNumber } = input;

        //TODO: Shutdown connection after query
        const prisma = new PrismaClient();

        const querySurahMetadata = await prisma.surahMetadata.findUnique({
            where: { 
                id: surahNumber
            },
            select: {
                surahTName: true,
                surahName: true,
                surahEName: true,
                surahType: true
            }
        })

        const surahTName = querySurahMetadata?.surahTName
        const surahName = querySurahMetadata?.surahName
        const surahEName = querySurahMetadata?.surahEName
        const surahType = querySurahMetadata?.surahType

        return ({ surahTName, surahName, surahEName, surahType })
    }),

    saveSnippet: protectedProcedure
    .input(z.object( { verseId: z.string(), userId: z.string() } ))
    .mutation(( { input } ) => {

        try {
            console.log("SERVER: Run saveSnippet")
            console.log(input.verseId, input.userId)
        } catch (e) {
            console.log("Error!")
            console.log(e)
        }
    })
});
