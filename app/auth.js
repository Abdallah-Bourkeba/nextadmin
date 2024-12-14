import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./lib/models";
import { authconfig } from "./authconfig";
import { connectDB } from "./lib/utils";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectDB();
    const { username, password } = credentials;

    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("No user found");
    } else if (user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Error logging in", error);
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authconfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials:", credentials);

        try {
          return await login(credentials);
        } catch (error) {
          console.error("Error logging in:", error);
          throw new Error("Error logging in", error);
        }
      },
    }),
  ],
});
