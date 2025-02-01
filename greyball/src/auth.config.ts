import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import connection from '../db/connection';
import Users from './schemas/users';

export const authConfig: NextAuthConfig = {

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    callbacks: {

        authorized({ auth, request: { nextUrl } }) {
            console.log({ auth });
            // const isLoggedIn = !!auth?.user;

            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //   if (isLoggedIn) return true;
            //   return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //   return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
        },

        jwt({ token, user }) {
            if (user) {
                const { _doc }: any = user
                token.data = _doc;
            }

            return token;
        },

        session({ session, token, user }) {
            session.user = token.data as any;
            return session;
        },

    },

    providers: [
        Credentials({
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                await connection()

                const user = await Users.findOne({ email: { $gte: email }, password: { $gte: password } })

                if (!user) return null;

                //if (!bcryptjs.compareSync(password, user.password)) return null;

                const { password: _, ...rest } = user;

                return rest
            },
        }),
    ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);