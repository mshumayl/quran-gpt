import { getSession } from "next-auth/react"

export async function getClientQuota() {
    const res = await getSession()

    if (res) {
      //console.log(res.user.bookmarkQuota) 
      //These client-side quotas are for better UX and responsiveness. Actual check still happens at each server endpoint (ctx).
      return {
        clientQuotas: {
          search: res.user.searchQuota,
          generate: res.user.generateQuota,
          bookmark: res.user.bookmarkQuota
        }
      }
    }
  }