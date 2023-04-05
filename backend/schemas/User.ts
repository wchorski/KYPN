import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, password, relationship, text, timestamp } from "@keystone-6/core/fields";

export const User = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: text({ validation: { isRequired: true } }),

    email: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: 'unique',
    }),
    
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox(),

    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    posts: relationship({ ref: 'Post.author', many: true }),
    cart: relationship({
      ref: 'CartItem.user', 
      many: true, 
      ui: {
        createView: {fieldMode: 'hidden'},
        itemView: {fieldMode: 'hidden'}
      }
    }),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
    products: relationship({ ref: 'Product.user', many: true }),
    orders: relationship({ ref: 'Order.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      // todo add access control
      // access: {
      //     create: permissions.canManageUsers,
      //     update: permissions.canManageUsers,
      // },
    })
  },
})