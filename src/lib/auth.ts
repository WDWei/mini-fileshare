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
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        user = await GetUser(credentials.email);
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration

          //await createUser(credentials);
          console.log("User not found.");
          throw new Error("User not found.");
        }
        //const hashedPassword = await bcrypt.hash(password, 10);
        const match = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!match) {
          throw new Error("User not found.");
        }
        //NEEDS A RETURN VALUE (PREVIOUSLY WAS NOT RETURNED)
        return user;
      },
    }),
  ],
});
