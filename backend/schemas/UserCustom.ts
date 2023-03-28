// import { createAuth } from '@keystone-6/auth';
// import { list } from '@keystone-6/core';

// import {
//   text,
//   relationship,
//   password,
//   timestamp,
//   select,
// } from '@keystone-6/core/fields';

// const { withAuth } = createAuth({
//   listKey: 'UserCustom',
//   identityField: 'email',
//   secretField: 'password',
//   initFirstItem: {
//     fields: ['name', 'email', 'password']
//   }
// })

// export const UserCustom = list({
//   access: {
//     create: () => true,
//     read: rules.canManageUsers,
//     update: rules.canManageUsers,
//     // only people with the permission can delete themselves!
//     // You can't delete yourself
//     delete: permissions.canManageUsers,
//   },
//   ui: {
//     // hide the backend UI from regular users
//     hideCreate: (args) => !permissions.canManageUsers(args),
//     hideDelete: (args) => !permissions.canManageUsers(args),
//   },
//   fields: {
//     name: text({ isRequired: true }),
//     email: text({ isRequired: true, isUnique: true }),
//     password: password(),
//     cart: relationship({
//       ref: "CartItem.user",
//       many: true,
//       ui: {
//         createView: { fieldMode: "hidden" },
//         itemView: { fieldMode: "read" },
//       },
//     }),
//     orders: relationship({ ref: "Order.user", many: true }),
//     role: relationship({
//       ref: "Role.assignedTo",
//     }),
//     products: relationship({
//       ref: "Product.user",
//       many: true,
//     }),
//     productImages: relationship({
//       ref: "ProductImage.user",
//       many: true,
//     }),
//   },
// });