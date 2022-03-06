import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";

const bcrypt = require("bcrypt");

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials;
          const user = await prisma.admin.findFirst({
            where: {
              username,
            },
          });

          if (user?.password) {
            const checkPassword = await bcrypt.compare(
              password,
              user?.password
            );

            if (!checkPassword) {
              return null;
            } else {
              const { password, ...currentUser } = user;
              const myUser = { ...currentUser, sub: currentUser?.id };
              return myUser;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(`${url?.baseUrl}${process.env.BASE_PATH}`);
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      session.user.picture = token.picture;
      return session;
    },
    async jwt({ token, account, user, profile }) {
      if (account) {
        token.id = account?.providerAccountId;
        token.email = user?.email;
        token.name = user?.username;
        token.picture = user?.picture;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
});
