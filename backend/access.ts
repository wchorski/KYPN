import { permissionsList } from './schemas/permissions';
import { ListAccessArgs } from './types';
// At it's simplest, the access control returns a yes or no value depending on the users session

export function isLoggedIn({ session }: ListAccessArgs) {
    return !!session;
}

export const roles = {
  isLoggedIn({ session }: ListAccessArgs) {
      return !!session;
  },

  isAdmin({session}:ListAccessArgs){
    
    return true
  }
}

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