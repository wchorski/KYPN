import type { Context } from '.keystone/types';

export async function seedDemoData(context: Context) {

  if ((await context.db.Role.count()) > 0) return;
  for (const role of [
    {
      name: 'admin',
      canManagePosts: true,
      canManageUsers: true,
      canManageRoles: true,
    },
    {
      name: 'client',
    },
  ] as const) {
    await context.db.Role.createOne({ data: role });
    console.log('+ ROLE CREATED => ', role.name);
  }

  if ((await context.db.User.count()) > 0) return;
  for (const user of [
    {
      name: 'Adam',
      authId: 'adam@m.lan',
      email: 'adam@m.lan',
      password: 'adam@m.lan',
      role: { connect: { name: 'admin'}}
    },
    {
      name: 'Cindy',
      authId: 'cindy@m.lan',
      email: 'cindy@m.lan',
      password: 'cindy@m.lan',
      role: { connect: { name: 'client'}}
    },
    {
      name: 'Eddy',
      authId: 'eddy@m.lan',
      email: 'eddy@m.lan',
      password: 'eddy@m.lan',
      role: { connect: { name: 'client'}}
    },
  ] as const) {
    await context.db.User.createOne({ data: user });
    console.log('+ USER CREATED => ', user.email);
  }

  if ((await context.db.Post.count()) > 0) return;
  for (const post of [
    {
      title: 'Sick Tricks',
      author: { connect: {email: 'adam@m.lan' } },
    },
    {
      title: 'Sick Flicks',
      author: { connect: {email: 'adam@m.lan' } },
    },
    {
      title: 'fluffy pillows Tricks',
      author: { connect: {email: 'cindy@m.lan' } } ,
    },
    {
      title: 'Hot Rods',
      author: { connect: {email: 'eddy@m.lan' } } ,
    },
  ] as const) {
    await context.db.Post.createOne({ data: post });
    console.log('+ POST CREATED => ', post.title);
  }
}
