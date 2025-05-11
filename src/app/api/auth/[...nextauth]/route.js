import NextAuth from "next-auth";
import { authOptions } from "./auth";
import '../../../../lib/crypto-polyfill';

// Temporarily disable edge runtime for auth routes due to crypto module issues
// export const runtime = 'edge';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
