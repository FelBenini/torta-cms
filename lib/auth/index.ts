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
  }
};