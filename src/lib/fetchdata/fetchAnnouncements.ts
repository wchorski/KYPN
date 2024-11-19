import { Announcement } from "@ks/types";
import { keystoneContext } from '@ks/context';

const now = new Date()

export default async function fetchAnnouncements(session:any){

  try {
    const announcements = await keystoneContext.withSession(session).query.Announcement.findMany({
      query: `
        start
        end
        colorTheme
        id
        link
        content {
          document
        }
      `,
      where: {
        AND: [
          {
            start: {
              lte: now.toISOString(),
            }
          },
          {
            end: {
              gte: now.toISOString(),
            }
          },
        ]
      },
      orderBy: [
        {
          start: 'desc'
        }
      ]
    }) as Announcement[]
    
    return { announcements }
    
  } catch (error) {
    console.log('!!! fetch announcements: ', error)
    return { error }
  }
}