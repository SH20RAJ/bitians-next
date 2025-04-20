import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq, and } from "drizzle-orm";
import { accounts, users, sessions, verificationTokens } from "@/lib/db/schema";
import crypto from "crypto";

export function createCustomAdapter(db) {
  // Start with the base adapter
  const baseAdapter = DrizzleAdapter(db);

  // Create a custom adapter with all required methods
  return {
    // User methods
    createUser: async (userData) => {
      try {
        console.log("Creating user:", userData);

        // Generate a unique ID if not provided
        const userId = userData.id || crypto.randomUUID();

        // Insert the user into the users table
        await db.insert(users).values({
          id: userId,
          name: userData.name,
          email: userData.email,
          emailVerified: userData.emailVerified,
          image: userData.image
        });

        // Fetch the created user
        const createdUser = await db
          .select()
          .from(users)
          .where(eq(users.id, userId))
          .get();

        console.log("Created user:", createdUser);
        return createdUser;
      } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
      }
    },

    getUser: async (id) => {
      try {
        console.log("Getting user by ID:", id);
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, id))
          .get();

        return user || null;
      } catch (error) {
        console.error("Error in getUser:", error);
        throw error;
      }
    },

    getUserByEmail: async (email) => {
      try {
        console.log("Getting user by email:", email);
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .get();

        return user || null;
      } catch (error) {
        console.error("Error in getUserByEmail:", error);
        throw error;
      }
    },

    getUserByAccount: async (providerData) => {
      try {
        console.log("Looking up account with provider:", providerData.provider, "and ID:", providerData.providerAccountId);

        // Find the account
        const account = await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.provider, providerData.provider),
              eq(accounts.providerAccountId, providerData.providerAccountId)
            )
          )
          .get();

        if (!account) {
          console.log("No account found");
          return null;
        }

        console.log("Account found:", account);

        // Find the user
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, account.userId))
          .get();

        console.log("User found:", user);
        return user || null;
      } catch (error) {
        console.error("Error in getUserByAccount:", error);
        throw error;
      }
    },

    updateUser: async (userData) => {
      try {
        console.log("Updating user:", userData);

        await db
          .update(users)
          .set({
            name: userData.name,
            email: userData.email,
            emailVerified: userData.emailVerified,
            image: userData.image
          })
          .where(eq(users.id, userData.id));

        const updatedUser = await db
          .select()
          .from(users)
          .where(eq(users.id, userData.id))
          .get();

        return updatedUser;
      } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
      }
    },

    deleteUser: async (userId) => {
      try {
        console.log("Deleting user:", userId);
        await db.delete(users).where(eq(users.id, userId));
      } catch (error) {
        console.error("Error in deleteUser:", error);
        throw error;
      }
    },

    // Account methods
    linkAccount: async (accountData) => {
      try {
        console.log("Linking account:", accountData);

        // Insert the account
        await db.insert(accounts).values({
          provider: accountData.provider,
          providerAccountId: accountData.providerAccountId,
          userId: accountData.userId,
          type: accountData.type,
          refresh_token: accountData.refresh_token,
          access_token: accountData.access_token,
          expires_at: accountData.expires_at,
          token_type: accountData.token_type,
          scope: accountData.scope,
          id_token: accountData.id_token,
          session_state: accountData.session_state
        });

        return accountData;
      } catch (error) {
        console.error("Error in linkAccount:", error);
        throw error;
      }
    },

    unlinkAccount: async ({ provider, providerAccountId }) => {
      try {
        console.log("Unlinking account:", provider, providerAccountId);

        await db
          .delete(accounts)
          .where(
            and(
              eq(accounts.provider, provider),
              eq(accounts.providerAccountId, providerAccountId)
            )
          );
      } catch (error) {
        console.error("Error in unlinkAccount:", error);
        throw error;
      }
    },

    // Session methods
    createSession: async (sessionData) => {
      try {
        console.log("Creating session:", sessionData);

        await db.insert(sessions).values({
          id: sessionData.id || crypto.randomUUID(),
          sessionToken: sessionData.sessionToken,
          userId: sessionData.userId,
          expires: sessionData.expires
        });

        const session = await db
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionData.sessionToken))
          .get();

        return session;
      } catch (error) {
        console.error("Error in createSession:", error);
        throw error;
      }
    },

    getSessionAndUser: async (sessionToken) => {
      try {
        console.log("Getting session and user:", sessionToken);

        const session = await db
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .get();

        if (!session) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, session.userId))
          .get();

        if (!user) {
          return null;
        }

        return {
          session,
          user
        };
      } catch (error) {
        console.error("Error in getSessionAndUser:", error);
        throw error;
      }
    },

    updateSession: async (sessionData) => {
      try {
        console.log("Updating session:", sessionData);

        await db
          .update(sessions)
          .set({
            expires: sessionData.expires
          })
          .where(eq(sessions.sessionToken, sessionData.sessionToken));

        const session = await db
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionData.sessionToken))
          .get();

        return session;
      } catch (error) {
        console.error("Error in updateSession:", error);
        throw error;
      }
    },

    deleteSession: async (sessionToken) => {
      try {
        console.log("Deleting session:", sessionToken);
        await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
      } catch (error) {
        console.error("Error in deleteSession:", error);
        throw error;
      }
    },

    // Verification token methods
    createVerificationToken: async (tokenData) => {
      try {
        console.log("Creating verification token:", tokenData);

        await db.insert(verificationTokens).values({
          identifier: tokenData.identifier,
          token: tokenData.token,
          expires: tokenData.expires
        });

        const verificationToken = await db
          .select()
          .from(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, tokenData.identifier),
              eq(verificationTokens.token, tokenData.token)
            )
          )
          .get();

        return verificationToken;
      } catch (error) {
        console.error("Error in createVerificationToken:", error);
        throw error;
      }
    },

    useVerificationToken: async ({ identifier, token }) => {
      try {
        console.log("Using verification token:", identifier, token);

        const verificationToken = await db
          .select()
          .from(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, identifier),
              eq(verificationTokens.token, token)
            )
          )
          .get();

        if (!verificationToken) {
          return null;
        }

        await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, identifier),
              eq(verificationTokens.token, token)
            )
          );

        return verificationToken;
      } catch (error) {
        console.error("Error in useVerificationToken:", error);
        throw error;
      }
    }
  };
}
