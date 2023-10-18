import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: 'Manage Products: Can update and delete any product',
  }),
  canManageAddons: checkbox({
    defaultValue: false,
    label: 'Manage Add-ons: Can update and delete any addon',
  }),
  canManageBookings: checkbox({
    defaultValue: false,
    label: 'Manage Bookings: Can update and delete any booking',
  }),
  canManageAvailability: checkbox({
    defaultValue: false,
    label: 'Manage Availability: Can update and delete any availbility',
  }),
  canManageEvents: checkbox({
    defaultValue: false,
    label: 'Manage Events: Can update and delete any event',
  }),
  canManageAnnouncements: checkbox({
    defaultValue: false,
    label: 'Manage Events: Can update and delete any annoucement',
  }),
  canManageTickets: checkbox({
    defaultValue: false,
    label: 'Manage Tickets: Can update and delete any Ticket',
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
  canManageCategories: checkbox({
    defaultValue: false,
    label: 'Manage Categories: Can see and manage any category',
  }),
  canManageTags: checkbox({
    defaultValue: false,
    label: 'Manage Tags: Can see and manage any tag',
  }),
  canManageLocations: checkbox({
    defaultValue: false,
    label: 'Manage Locations: Can see and manage any location',
  }),
  canManagePages: checkbox({
    defaultValue: false,
    label: 'Manage Pages: Can see and manage any page',
  }),
  canManagePosts: checkbox({
    defaultValue: false,
    label: 'Posts: Can see and manage any post',
  }),
  canManageServices: checkbox({
    defaultValue: false,
    label: 'Manage Services: Can see and manage any service',
  }),
  canManageSubscriptionPlans: checkbox({
    defaultValue: false,
    label: 'Manage Subscription Plans: Can see and manage any Subscription Plan offered',
  }),
  canManageSubscriptionItems: checkbox({
    defaultValue: false,
    label: 'Manage Subscription Item: Can see and manage any current running subscriptions',
  }),
  canManageCoupons: checkbox({
    defaultValue: false,
    label: 'Manage Coupons: Can create / delete coupons',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];