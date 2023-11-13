import { list } from "@keystone-6/core";
// @ts-ignore
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../access";
import { permissionFields } from "./permissions";
// import { permissionFields } from "./authFields";


export const Role:Lists.Role = list({
  // todo modern keystone 6 way of doing permissions
  // access: allowAll, 
  access: {
    operation: {
      query: () => true,  
      // query: permissions.canManageRoles,  
      create: permissions.canManageRoles,
      delete: permissions.canManageRoles,
      update: permissions.canManageRoles,
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ validation: { isRequired: true}, isIndexed: 'unique' }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', 
      many: true,
      ui: {
        itemView: { fieldMode: 'edit' },
      },
    }),

  }
})