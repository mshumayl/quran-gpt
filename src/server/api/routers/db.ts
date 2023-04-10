/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { prisma } from '../../db'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

//Response type -- to make it easier and more standardized for client to parse.
type RespT = {
    result: string;
}

export const dbRouter = createTRPCRouter({
  fetchVerse: publicProcedure
    .input(z.object({ surahNumber: z.string(), verseNumber: z.string() }))
    .query(async ({ input }) => {
        
        const { surahNumber, verseNumber } = input;
        const id = `${surahNumber}_${verseNumber}`

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
            return (`SAVE_SUCCESS`)
        } else {
            return (`SAVE_EXISTS`)
        }
    }),

    removeSnippet: protectedProcedure
    .input(z.object( { verseId: z.string(), userId: z.string(), id: z.string() } ))
    .mutation(async ( { input } ) => {
        
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
        return (`REMOVE_SUCCESSFUL`)
    }),

    fetchUserSavedSnippets: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {

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

    getSnippetId: protectedProcedure
    .input(z.object({ userId: z.string(), verseId: z.string() }))
    .query( async ({ input }) => {

        const snippet = await prisma.savedSnippets.findMany({ 
            where: {
                AND: {
                    userId: input.userId, 
                    verseId: input.verseId
                }
            },
            select: {
                id: true
            }
         })

         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         return snippet
    }),

    //Practically the same with getSnippetId. Use this for future use cases, and retire getSnippetId.
    isVerseSaved: protectedProcedure
    .input(z.object({ userId: z.string(), verseId: z.string() }))
    .query(async ({ input }) => {

        interface IIsVerseSavedResp extends RespT {
            savedVerseUid: string | undefined;
        }
        
        let response: IIsVerseSavedResp
        
        const dbRes = await prisma.savedSnippets.findMany({
            where: {
                AND: {
                    userId: input.userId,
                    verseId: input.verseId
                }
            },
            select: {
                id: true
            }
        })

        if (dbRes.length === 1) {
           response = { result: "SAVED_VERSE_EXISTS", savedVerseUid: dbRes[0]?.id }
        } else if (dbRes.length > 1) {
            response = { result: "REDUNDANT_SAVED_VERSE", savedVerseUid: undefined }
        } else {
            response = { result: "VERSE_NOT_SAVED", savedVerseUid: undefined }
        }

        return response
    }),

    addNote: protectedProcedure
    .input(z.object({ snippetId: z.string(), userId: z.string(), verseId: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {

        let addNoteResp: RespT;
        let snippetId = input.snippetId;
        let savePrefix = ""; //Prefix to prepend on addNoteResp result on successful save + add note

        //If snippetId is an empty string, save the snippet first.
        //At this stage, there is a huge loophole. If a user immediately adds a second note on an auto-saved verse, the verse will re-save.
        if (snippetId === "") {
            //Check redundant save
            const redundantSaveResp = await prisma.savedSnippets.findFirst({
                where: {
                    AND: { 
                        userId: input.userId,
                        verseId: input.verseId
                    }
                },
                select: {
                    id: true
                }
            }) 

            if (redundantSaveResp === null) {
                console.log("Verse have not been saved. Creating new save...")
                const saveSnippetDbResp = await prisma.savedSnippets.create({
                    data: {
                        userId: input.userId,
                        verseId: input.verseId
                    },
                })
    
                snippetId = saveSnippetDbResp.id
                savePrefix = "SAVE_AND_"
            } else {
                console.log("Verse previously saved. Skipping to save note.")
                snippetId = redundantSaveResp.id
            }
        }

        //Check if the snippetId belongs to the userId.
        const snippet = await prisma.savedSnippets.findUnique({ 
            where: {
                id: snippetId
            },
            select: {
                userId: true
            }
         })

        if (snippet?.userId === input.userId) {
            //Insert into Notes
            const note = await prisma.userNotes.create({
                data: {
                    snippetId: snippetId,
                    content: input.content
                },
            })
            console.log("Inserted into UserNotes: ", note)
            addNoteResp = { result: `${savePrefix}ADD_NOTE_SUCCESS` };
        } else {
            addNoteResp = { result: "USER_UNAUTHORIZED_TO_ADD_NOTE" };
        }
        
        return addNoteResp
    })
});
