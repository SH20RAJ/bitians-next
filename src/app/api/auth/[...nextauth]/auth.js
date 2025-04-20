import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/lib/db';
import { createCustomAdapter } from '@/lib/auth/custom-adapter';

export const authOptions = {
  adapter: createCustomAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      // Add user ID to the session from the token
      if (session.user) {
        session.user.id = token.sub;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user ID to the JWT token
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.isVerified = user.isVerified;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
