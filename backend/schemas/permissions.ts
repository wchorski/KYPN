import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: 'Manage Products: Can update and delete any product',
  }),
  canManageEvents: checkbox({
    defaultValue: false,
    label: 'Manage Events: Can update and delete any event',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'View Users: Can query any User',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'Manage Users: Can edit any User',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'Manage Roles: Can create / read / update / delete any Role',
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: 'Manage Cart: Can see and manage any Cart or Cart Item',
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: 'Manage Orders: Can see and manage any Order',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];