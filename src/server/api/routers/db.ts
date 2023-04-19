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
    message?: string;
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
    .mutation(async ({ ctx, input }) => {

        let res: RespT;

        //Check bookmark quota here
        const quotas = await prisma.user.findUnique({
            where: {
                id: ctx.session?.user.id
            },
            select: {
                bookmarkQuota: true
            }
        })

        //Return straight away. Do not deduct the quota.
        if (quotas?.bookmarkQuota !== undefined && quotas?.bookmarkQuota <= 0) {
            res = { result: "OUT_OF_BOOKMARK_QUOTA", message: "You have used up all your bookmark quota. Remove existing bookmarks to add more."}
            return res
        } else if (quotas?.bookmarkQuota === undefined) {
            res = { result: "UNABLE_TO_RETRIEVE_QUOTA", message: "Error retrieving bookmarks quota. Please try again." }
            return res 
        }

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
            res = { result: "SAVE_SUCCESS", message: `Verse successfully bookmarked. You have ${quotas.bookmarkQuota-1} bookmark quota remaining.` } //Modify toast to display quota
        } else {
            res = { result: "SAVE_EXISTS" }
        }
        
        //Reduce bookmark quota here
        //Finally, deduct quota
        if (quotas && quotas.bookmarkQuota) {
            const prevQuota: number = quotas.bookmarkQuota

            const newQuota = prevQuota - 1
            console.log(`${prevQuota} - 1 = ${newQuota}`)

            await prisma.user.update({
                where: {
                    id: ctx.session?.user.id
                },
                data: {
                    bookmarkQuota: newQuota
                }
            })
        }
        
        return res
    }),

    removeSnippet: protectedProcedure
    .input(z.object( { verseId: z.string(), userId: z.string(), id: z.string() } ))
    .mutation(async ({ ctx, input }) => {
        
        let res: RespT;

        //Get bookmarkQuota, no need to do any checking
        const quotas = await prisma.user.findUnique({
            where: {
                id: ctx.session?.user.id
            },
            select: {
                bookmarkQuota: true
            }
        })

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

        if (deleteSnippet && quotas) {
            res = { result: "REMOVE_SUCCESSFUL", message: `Verse bookmark removed. You have ${quotas.bookmarkQuota+1} bookmark quota remaining.` }
        } else {
            res = { result: "SAVED_VERSE_NOT_FOUND"}
        }

        //Perform quota addition
        if (quotas) {
            const prevQuota: number = quotas.bookmarkQuota

            const newQuota = prevQuota + 1
            console.log(`${prevQuota} + 1 = ${newQuota}`)

            await prisma.user.update({
                where: {
                    id: ctx.session?.user.id
                },
                data: {
                    bookmarkQuota: newQuota
                }
            })
        }

        return res
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

        interface isVerseSavedRespT extends RespT {
            savedVerseUid: string | undefined;
        }
        
        let response: isVerseSavedRespT
        
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

    getNotes: protectedProcedure
    .input(z.object({ snippetId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        
        interface getNoteRespT extends RespT {
            data?: {
                content: string,
                id: string,
                createdAt: Date
            }[]
        }
        
        let response: getNoteRespT;

        if (ctx.session.user.id !== input.userId) {
            response = { result: "USER_NOT_AUTHORIZED" };
            return response
        } else {
            const dbRes = await prisma.userNotes.findMany({
                where: {
                    snippetId: input.snippetId
                }, 
                select: {
                    id: true,
                    content: true,
                    createdAt: true
                }
            })

            if ( dbRes.length === 0 ) {
                response = { result: "NO_SAVED_NOTES" }
                return response
            } else {
                response = { result: "NOTES_RETRIEVED", data: dbRes }
                return response
            }
        }
    }),

    deleteNote: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .mutation(async ({ ctx, input }) => {

        const userId = ctx.session.user.id
        const noteId = input.noteId
        let deleteNoteResp: RespT;
        
        const noteOwner = await prisma.userNotes.findUnique({
            where: { 
                id: noteId
            },
            include: {
                savedSnippets: true
            }
        })

        if (noteOwner && noteOwner.savedSnippets.userId === userId) {
            const deletedNote = await prisma.userNotes.delete({
                where: {
                    id: noteId
                }
            })
            deleteNoteResp = { result: "NOTE_DELETED" }
        } else {
            deleteNoteResp = { result: "USER_UNAUTHORIZED_NOT_NOTE_OWNER" }
        }

        return deleteNoteResp
    }),

    addNote: protectedProcedure
    .input(z.object({ snippetId: z.string(), userId: z.string(), verseId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {

        let addNoteResp: RespT;
        let snippetId = input.snippetId;
        let savePrefix = ""; //Prefix to prepend on addNoteResp result on successful save + add note

        //Check bookmark quota here
        const quotas = await prisma.user.findUnique({
            where: {
                id: ctx.session?.user.id
            },
            select: {
                bookmarkQuota: true
            }
        })

        //Return straight away. Do not deduct the quota.
        if (quotas?.bookmarkQuota !== undefined && quotas?.bookmarkQuota <= 0) {
            addNoteResp = { result: "OUT_OF_BOOKMARK_QUOTA", message: "You have used up all your bookmark quota. Remove existing bookmarks to add more."}
            return addNoteResp
        } else if (quotas?.bookmarkQuota === undefined) {
            addNoteResp = { result: "UNABLE_TO_RETRIEVE_QUOTA", message: "Error retrieving bookmarks quota. Please try again." }
            return addNoteResp
        }

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

                //Bookmark reduction logic here
                //Reduce bookmark quota here
                //Finally, deduct quota
                if (quotas && quotas.bookmarkQuota) {
                    const prevQuota: number = quotas.bookmarkQuota

                    const newQuota = prevQuota - 1
                    console.log(`${prevQuota} - 1 = ${newQuota}`)

                    await prisma.user.update({
                        where: {
                            id: ctx.session?.user.id
                        },
                        data: {
                            bookmarkQuota: newQuota
                        }
                    })
                }

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
    }),

    getQuotas: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
        
        interface getQuotasRespT extends RespT {
            data: {
                searchQuota: number;
                generateQuota: number;
                bookmarkQuota: number;
            }
        }
        
        let res: getQuotasRespT;

        //Check bookmark quota here

        try {
            const quotas = await prisma.user.findUnique({
                where: {
                    id: ctx.session?.user.id
                },
                select: {
                    searchQuota: true,
                    generateQuota: true,
                    bookmarkQuota: true,
                }
            })

            if (quotas) {
                
                res = {
                    result: "QUOTAS_OBTAINED",
                    data: {
                        searchQuota: quotas?.searchQuota,
                        generateQuota: quotas?.generateQuota,
                        bookmarkQuota: quotas?.bookmarkQuota
                    }
                }        

            } else {
                
                res = {
                    result: "QUOTAS_NOT_FOUND",
                    data: {
                        searchQuota: 0,
                        generateQuota: 0,
                        bookmarkQuota: 0
                    }
                }

            }
            
        } catch (e) {
            res = {
                result: "QUOTAS_NOT_FOUND",
                data: {
                    searchQuota: 0,
                    generateQuota: 0,
                    bookmarkQuota: 0
                }
            }
        }
        
        return res
    }),

    setUserNotification: protectedProcedure
    .input(z.object({ isNotify: z.boolean() }))
    .mutation(async ({ ctx, input }) => {

        let res: RespT;

        const userId = ctx.session.user.id;

        if (userId) {
            const upsertUserNotification = await prisma.notifyUser.upsert({
                where: {
                    userId: userId,
                },
                update: {
                    modalDisplayed: true,
                    isInNotifyList: input.isNotify
                },
                create: {
                    userId: userId,
                    modalDisplayed: true,
                    isInNotifyList: input.isNotify
                }
            })

            if (input.isNotify) {
                res = { result: "UPDATE_YES_NOTIFY" }
            } else {
                res = { result: "UPDATE_NO_NOTIFY" }
            }

        } else {
            res = { result: "USER_SESSION_INVALID" }
        }
        
        return res
    })
});
