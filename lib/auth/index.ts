import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserFunctions } from "../db/userFunctions";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const authUser = await UserFunctions.getUserByName(credentials?.username)
        if (!authUser) {
          return null
        }
        if (!bcrypt.compareSync(credentials?.password as string, authUser.password)) {
          return null
        }
        const user = { id: authUser._id, name: credentials?.username, email: authUser.role };
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
};