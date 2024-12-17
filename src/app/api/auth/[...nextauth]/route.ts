import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { URL } from "@/app/services/config";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
    // maxAge: 10,
  },
  pages: {
    signIn: "/",
    signOut: "/",
    // verifyRequest: "/auth/otp",
    // newUser: "/auth/signup",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {};

        try {
          // Make an API call to your backend to validate the user credentials
          const res = await fetch(``, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const resp = await res.json();

          // Check if the response indicates a successful login
          if (!resp.status) {
            return null; // Return null if the credentials are invalid
          }

          // Parse the JSON response from the API
          const user = resp.data.user;
          const token = resp.data.token;

          // Return the user object including the token
          return {
            id: user._id, // Required field by NextAuth
            name: user.userName,
            email: user.email,
            accessToken: token, // Store the token for later use
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; // Return null in case of any errors during the API call
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the JWT's access token to the session
      session.user.id = token.id;
      session.user.accessToken = token.accessToken; // Attach token to session for use in requests
      return session;
    },
  },
});

export { handler as GET, handler as POST };
