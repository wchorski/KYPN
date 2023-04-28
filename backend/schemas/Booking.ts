import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { calendarDay, relationship, text, timestamp, } from "@keystone-6/core/fields";
import { mailBookingCreated } from "../lib/mail";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // add 1 because getMonth() returns zero-based index
const day = now.getDate();
const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
// console.log(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || 'no_email_set'

// const rightnow = new Date().toISOString()

export const Booking = list({

  access: allowAll,

  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },


  fields: {
    // date: calendarDay({ validation: { isRequired: true } }),
    dateTime: timestamp({ validation: { isRequired: true } }),
    service: relationship({ ref: 'Service.bookings', many: false }),
    employees: relationship({ ref: 'User.gigs', many: true }),
    customer: relationship({ ref: 'User.bookings', many: false }),
    notes: text({
      ui: {
        displayMode: 'textarea'
      }
    }),

  },
  hooks: {
    afterOperation: async ({ operation, resolvedData, item, context }: { operation: any, resolvedData: any, item: any, context: any }) => {
      if (operation === 'create') {
        let customer = {
          name: 'non registered user',
          email: 'non registered user'
        }
        if (item.customer) {
          customer = await context.db.User.findOne({ where: { id: item.customer.id } })
        }
        console.log({ item });
        console.log({ resolvedData });
        mailBookingCreated(
          item.id,
          EMAIL_ADDRESS,
          customer.name,
          customer.email,
          item.notes,

        )

      }

    },
  }
})