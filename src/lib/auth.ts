import { GetUser } from "@/actions/actions";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        user = await GetUser(credentials.username);
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration

          console.log("User not found.");
          throw new Error("User not found.");
        }
        const match = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!match) {
          throw new Error("User not found.");
        }
        //Return values matters to have something in the session token
        //https://github.com/nextauthjs/next-auth/discussions/2762
        return {
          name: user.userName,
        };
      },
    }),
  ],
});
