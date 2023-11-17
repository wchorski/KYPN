import { Announcement } from "@ks/types";
import { keystoneContext } from '@ks/context';

const now = new Date()

export default async function fetchAnnouncements(){

  try {
    const announcements = await keystoneContext.query.Announcement.findMany({
      query: `
        start
        end
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

    console.log({announcements});
    
    return { announcements }
    
  } catch (error) {
    console.log('!!! fetch announcements: ', error)
    return { error }
  }
}