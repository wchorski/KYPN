import { graphql, list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { decimal, relationship, select, text, timestamp, virtual, } from "@keystone-6/core/fields";
import { calcDurationInHours, calcEndTime } from "../../lib/dateCheck";
import { permissions, rules } from "../access";
import { Decimal } from "@keystone-6/core/types";



export const Availability:Lists.Availability = list({

  access: {
    filter: {
      query: rules.canViewAvailability,
      update: rules.canManageAvailability,
      delete: rules.canManageAvailability,
    },
    operation: {
      create: permissions.canCreateAvailability,
      query: () => true,
      update: permissions.canManageAvailability,
      delete: permissions.canManageAvailability,
    }
  },

  ui: {

    // todo hide these again
    // isHidden: true,
    listView: {
      initialColumns: ['start', 'end', 'durationInHours', 'employee', 'type', 'status'],
      initialSort: { field: 'start', direction: 'DESC'}
    },
  },


  fields: {
    typeof: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve() {
					return "availability"
				},
			}),
			ui: {
				itemView: { fieldMode: "hidden" },
			},
		}),
    start: timestamp({ validation: { isRequired: true } }),
    end: timestamp({validation: { isRequired: true } }),
    durationInHours: virtual({
      field: graphql.field({
        type: graphql.Decimal,
        async resolve(item:any, args, context) {
          return new Decimal(calcDurationInHours(item.start, item.end))
        },
      })
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
      //     resolvedData.user = { connect: { id: currentUserId } };
      //   }
      // } catch (err) { console.warn(err) }

      if (operation === 'create') {

        if(!resolvedData.employee) throw new Error('!!! No employee set for this Availability creation')

        if(resolvedData.start && resolvedData.end && resolvedData.end < resolvedData.start ){
          throw new Error('!!! Availability: End time is set before Start time')
        }
      }
    }
  }
})

