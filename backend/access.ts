import { permissionsList } from './schemas/permissions';
import { ListAccessArgs } from './types';
// At it's simplest, the access control returns a yes or no value depending on the users session

export function isLoggedIn({ session }: ListAccessArgs) {
    return !!session;
}

// export const roles = {
//   isLoggedIn({ session }: ListAccessArgs) {
//       return !!session;
//   },

//   isAdmin({session}:ListAccessArgs){
    
//     return true
//   }
// }

const generatedPermissions = Object.fromEntries(
    permissionsList.map((permission:any) => [
        permission,
        function ({ session }: ListAccessArgs) {          
            return !!session?.data.role?.[permission];
        },
    ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = { 
    ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {

  // can manage products, or just their own authored products
  canManageProducts({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) return true;
    
    // 2. If not, do they own this item?
    // todo query item.author and match session.user
    
    // return false
    return { user: { id: { equals: session?.itemId }} }
  },

  canManageBookings({ session }: ListAccessArgs) {
    // if (!isLoggedIn({ session })) return false;

    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageBookings({ session })) return true;
    
    // 2. If not, do they own this item?
    // todo query item.author and match session.user
    console.log('==== no manage bookings but do i own?');
    
    console.log({ customer: { id: { equals: session?.itemId }} });
    
    // return false
    return { customer:{ id:{ equals: session?.itemId } } }

  },

  canManageEvents({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    // console.log('=========== SESSION');
    // console.log({session});
    // todo why context return undefined?
    // console.log('=========== CONTEXT');
    // console.log({context});

    
    if(session?.data.isAdmin) return true
    // 1. compair against permissions checkbox
    if (permissions.canManageEvents({ session })) return true;
    
    // 2. If not, are they a host of this event?
    //todo have multiple hosts
    // todo query item.hosts.id and match session.user.id
    // return false
    return { 
      hosts: { 
        some: {
          id: { 
            in: [session?.itemId]
          }
        }
      } 
    }
  },
  canManageTickets({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    // console.log('=========== SESSION');
    // console.log({session});
    // todo why context return undefined?
    // console.log('=========== CONTEXT');
    // console.log({context});

    // 1. compair against permissions checkbox
    if (permissions.canManageTickets({ session })) return true;
    
    // 2. If not, are they a host of this event?
    // todo if ticket's event's host === session.user.id return true
    return { 
      event: {
        hosts: { 
          some: {
            id: { 
              in: [session?.itemId]
            }
          }
        } 
      }
    }
    // return { host: { id: { equals: session?.itemId }} }
  },


  canOrder({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) return true;
    
    // 2. If not, do they own this item?
    return { user: { id: {equals: session?.itemId} } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) return true;
    
    // 2. If not, do they own this item?
    return { order: { user: { id: {equals: session?.itemId} } } };
  },

  // AVAILABLE products can be viewed by all
  canReadProducts({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    
    if (permissions.canManageProducts({ session })) return true; // They can read everything!
    
    // They should only see available products (based on the status field)
    return { status: {equals: 'AVAILABLE'} };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isLoggedIn({ session })) return false;
    
    if (permissions.canManageUsers({ session })) return true;
    
    // Otherwise they may only update themselves!
    return { id: {equals: session?.itemId} };
  },
};