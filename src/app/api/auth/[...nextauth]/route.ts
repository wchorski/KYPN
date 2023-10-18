// https://medium.com/@rezahedi/using-nextauth-authentication-provider-in-next-js-by-app-router-f50cb23282c9

import NextAuth from 'next-auth';
import { nextAuthOptions } from '../../../../../session';

// @ts-ignore
const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
