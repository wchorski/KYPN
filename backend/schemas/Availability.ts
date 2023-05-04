import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { decimal, relationship, select, text, timestamp, } from "@keystone-6/core/fields";



export const Availability = list({

  access: allowAll,


  ui: {

    // todo hide these again
    // isHidden: true,
    listView: {
      initialColumns: ['dateTime', 'employee', 'type', 'status'],
      initialSort: { field: 'dateTime', direction: 'DESC'}
    },
  },


  fields: {
    dateTime: timestamp({ validation: { isRequired: true } }),
    durationInHours: decimal({
      defaultValue: '24',
      precision: 5,
      scale: 2,
      validation: {
        isRequired: true,
        max: '24',
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
    dateCreated: timestamp({defaultValue: String(new Date().toISOString())}),
    dateModified: timestamp({defaultValue: String(new Date().toISOString())}),
    
  },
})