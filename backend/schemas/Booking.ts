import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { calendarDay, relationship, text, } from "@keystone-6/core/fields";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // add 1 because getMonth() returns zero-based index
const day = now.getDate();
const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
console.log(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);

// const rightnow = new Date().toISOString()

export const Booking = list({

  access: allowAll,

  // todo hide these again
  // ui: {
  //   isHidden: true,
  // },


  fields: {
    date: calendarDay({ defaultValue: today }),
    service: relationship({ ref: 'Service.bookings', many: false }),
    employees: relationship({ ref: 'User.gigs', many: true }),
    customer: relationship({ ref: 'User.bookings', many: false }),

  },
})