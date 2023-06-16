import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserFunctions } from "../db/userFunctions";

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
        if (!authUser || authUser.password !== credentials?.password) {
          return null
        }
        const user = { id: "1", name: credentials?.username, email: 'admin' };
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/'
  }
};