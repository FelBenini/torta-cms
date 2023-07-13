import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { userController } from "../mongodb/controllers/userController";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
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
        const authUser = await userController.getUserByName(credentials?.username as string)
        if (!authUser) {
          return null
        }
        if (!bcrypt.compareSync(credentials?.password as string, authUser.password)) {
          return null
        }
        const user = { id: authUser._id, name: authUser.username, email: authUser.role };
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/'
  },
};