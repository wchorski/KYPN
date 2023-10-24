import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  canManageProducts: checkbox({
    defaultValue: false,
    label: 'Products Manager: Can update and delete any product',
  }),
  canReadProducts: checkbox({
    defaultValue: false,
    label: 'Products Viewer: Read any product (even if the product is "Draft" or "Private") ',
  }),
  canManageAddons: checkbox({
    defaultValue: false,
    label: 'Add-ons Manager: Can update and delete any addon',
  }),
  canManageBookings: checkbox({
    defaultValue: false,
    label: 'Bookings Manager: Can update and delete any booking',
  }),
  canManageAvailability: checkbox({
    defaultValue: false,
    label: 'Availability Manager: Can update and delete any availbility',
  }),
  canManageEvents: checkbox({
    defaultValue: false,
    label: 'Events Manager: Can update and delete any event',
  }),
  canManageAnnouncements: checkbox({
    defaultValue: false,
    label: 'Events Manager: Can update and delete any annoucement',
  }),
  canManageTickets: checkbox({
    defaultValue: false,
    label: 'Tickets Manager: Can update and delete any Ticket',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'Users Viewer: Can query any User',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'Users Manager: Can edit any User',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'Roles Manager: Can create / read / update / delete any Role',
  }),
  canManageCart: checkbox({
    defaultValue: false,
    label: 'Cart Manager: Can see and manage any Cart or Cart Item',
  }),
  canManageOrders: checkbox({
    defaultValue: false,
    label: 'Orders Manager: Can see and manage any Order',
  }),
  canManageCategories: checkbox({
    defaultValue: false,
    label: 'Categories Manager: Can see and manage any category',
  }),
  canManageTags: checkbox({
    defaultValue: false,
    label: 'Tags Manager: Can see and manage any tag',
  }),
  canManageLocations: checkbox({
    defaultValue: false,
    label: 'Locations Manager: Can see and manage any location',
  }),
  canManagePages: checkbox({
    defaultValue: false,
    label: 'Pages Manager: Can see and manage any page',
  }),
  canManagePosts: checkbox({
    defaultValue: false,
    label: 'Posts Manager: Can see and manage any post',
  }),
  canManageServices: checkbox({
    defaultValue: false,
    label: 'Services Manager: Can see and manage any service',
  }),
  canManageSubscriptionPlans: checkbox({
    defaultValue: false,
    label: 'Subscription Plans Manager: Can see and manage any Subscription Plan offered',
  }),
  canManageSubscriptionItems: checkbox({
    defaultValue: false,
    label: 'Subscription Item Manager: Can see and manage any current running subscriptions',
  }),
  canManageCoupons: checkbox({
    defaultValue: false,
    label: 'Coupons Manager: Can create / delete coupons',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];