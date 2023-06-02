import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, relationship, select, text, timestamp, } from "@keystone-6/core/fields";
import { calcEndTime } from "../lib/dateCheck";



export const Availability:Lists.Availability = list({

  access: allowAll,


  ui: {

    // todo hide these again
    // isHidden: true,
    listView: {
      initialColumns: ['start', 'end', 'employee', 'type', 'status'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({}),
    durationInHours: decimal({
      // defaultValue: '23.9',
      precision: 5,
      scale: 2,
      validation: {
        // isRequired: true,
        // max: '24',
        min: '.25',
      },
    }),
    employee: relationship({ ref: 'User.availability', many: false }),
    type: select({
      options: [
        { label: 'Vacation', value: 'VACATION' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Sick', value: 'SICK' },
      ],
      defaultValue: 'VACATION',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    status: select({
      options: [
        { label: 'Requested', value: 'REQUESTED' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Denied', value: 'DENIED' },
      ],
      defaultValue: 'APPROVED',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'edit' }
      }
    }),
    dateCreated: timestamp({defaultValue: { kind: 'now' },}),
    dateModified: timestamp({defaultValue: { kind: 'now' },}),
    
  },
  hooks: {
    beforeOperation: async ({ operation, resolvedData, context, item }) => {
      // try {
      //   if (resolvedData && !resolvedData.user) {
      //     const currentUserId = await context.session.itemId;
      //     // console.log({ currentUserId });
      //     resolvedData.user = { connect: { id: currentUserId } };
      //   }
      // } catch (err) { console.warn(err) }

      if (operation === 'create') {

        if(!resolvedData.end){
          resolvedData.end = calcEndTime(String(resolvedData.start), String(resolvedData.durationInHours))
          console.log('avail schema , ', {resolvedData});
          
        }

        if(resolvedData.start && resolvedData.end < resolvedData.start ){
          throw new Error('End time is set before Start time')
        }
      }
    }
  }
})

