// https://medium.com/@rezahedi/using-nextauth-authentication-provider-in-next-js-by-app-router-f50cb23282c9

import NextAuth from 'next-auth';
import { nextAuthOptions } from '../../../../session';

//@ts-ignore
export default  NextAuth(nextAuthOptions);
