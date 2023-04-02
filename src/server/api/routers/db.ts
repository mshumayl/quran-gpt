/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { PrismaClient } from '@prisma/client'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

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
    .mutation(async ( { input } ) => {

        //TODO: Shutdown connection after query
        const prisma = new PrismaClient();

        //TODO: Check if there exists a previous save
        const existingSave = await prisma.savedSnippets.findMany({
            where: { 
                userId: input.userId,
                verseId: input.verseId
            },
        })

        if (existingSave.length === 0) {
            const snippet = await prisma.savedSnippets.create({
                data: {
                    userId: input.userId,
                    verseId: input.verseId
                },
            })
            console.log(snippet)
            return (`Verse successfully bookmarked.`)
        } else {
            return (`This verse has been bookmarked previously.`)
        }
    }),

    removeSnippet: protectedProcedure
    .input(z.object( { verseId: z.string(), userId: z.string(), id: z.string() } ))
    .mutation(async ( { input } ) => {
        
        //TODO: Shutdown connection after query
        const prisma = new PrismaClient();

        //Using deleteMany instead of delete to check all params for extra safety
        const deleteSnippet = await prisma.savedSnippets.deleteMany({
            where: {
                AND: {
                    id: input.id,
                    verseId: input.verseId,
                    userId: input.userId
                },
            },
        })

        console.log(deleteSnippet)
        return (`Bookmark removed.`)
    }),

    fetchUserSavedSnippets: protectedProcedure
    .input(z.object( { userId: z.string() } ))
    .query(async ( {input} ) => {
        console.log("In fetchUserSavedSnippets")
        const prisma = new PrismaClient();

        const userSavedSnippets = await prisma.savedSnippets.findMany({
            where: { 
                userId: input.userId
            },
            select: {
                verseId: true,
                id: true,
            }
        })
        console.log(userSavedSnippets)
        return ({ userSavedSnippets })
    }),
});
