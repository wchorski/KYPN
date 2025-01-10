import { Booking } from "@ks/types";
import { keystoneContext } from "@ks/context";
import { Session } from "next-auth";

export default async function fetchBookings(
  dateSelectedString: string,
  query:string,
  session: Session|null
) {
  const dateSelected = new Date(dateSelectedString);

  try {
    const bookings = (await keystoneContext
      .withSession(session)
      .query.Booking.findMany({
        query,
        where: {
          AND: [
            {
              start: {
                gte: dateSelected.toISOString(),
                lt: new Date(
                  dateSelected.getFullYear(),
                  dateSelected.getMonth() + 24
                ).toISOString(),
              },
            },
          ],
        },
        orderBy: [
          {
            start: "asc",
          },
        ],
      })) as Booking[];

    // const count = await keystoneContext.withSession(session).query.Booking.count({
    //   where: {
    //     AND: [
    //       {
    //         start: {
    //           gte: dateSelected.toISOString(),
    //           lt: new Date(dateSelected.getFullYear(), dateSelected.getMonth() + 24).toISOString()
    //         },
    //       },
    //     ]
    //   },
    // }) as number

    return { bookings };
  } catch (error) {
    // console.log('!!! fetch bookings: ', error)
    return { error };
  }
}

// const query = `
//   typeof
//   id
//   summary
//   start
// `;
// email
// phone
// name
// dateCreated
// dateModified
// addonsCount
// end
// google
// status
// notes
// price
// addons {
//   id
//   excerpt
//   name
//   price
// }
// customer {
//   id
//   email
//   phone
//   name
//   nameLast
// }
// employees {
//   id
//   name
//   email
//   image
// }
// location {
//   id
//   name
//   address
// }
// service {
//   id
//   name
// }
