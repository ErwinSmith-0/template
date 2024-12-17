// src/types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string; // Add accessToken to user in session
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    accessToken: string; // Add accessToken to User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string; // Add accessToken to JWT
  }
}
