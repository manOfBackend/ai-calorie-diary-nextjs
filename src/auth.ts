/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import NextAuth, { type DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signInSchema } from './lib/validations/auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession['user'];
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
    error?: string;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const refreshedTokens = await response.json();

    console.log('Access token refreshed:', refreshedTokens);
    // 기존 토큰을 유지하면서 새로운 값들만 업데이트
    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpiresAt: refreshedTokens.accessTokenExpiresAt,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        console.log('Initial login, setting token:', {
          trigger,
          tokenExpiresAt: user.accessTokenExpiresAt,
        });

        return {
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiresAt: Number(user.accessTokenExpiresAt),
        };
      }

      console.log('Current token state:', {
        trigger,
        tokenId: token.id,
        tokenExpiresAt: token.accessTokenExpiresAt
          ? new Date(token.accessTokenExpiresAt).toISOString()
          : 'no expiry',
        currentTime: new Date().toISOString(),
        isExpired: token.accessTokenExpiresAt
          ? Date.now() > token.accessTokenExpiresAt
          : false,
      });

      if (
        token.accessTokenExpiresAt &&
        Date.now() > token.accessTokenExpiresAt
      ) {
        console.log('Token expired, attempting refresh');
        const refreshedToken = await refreshAccessToken(token);
        console.log('Token refreshed:', {
          oldExpiresAt: new Date(token.accessTokenExpiresAt).toISOString(),
          newExpiresAt: new Date(
            refreshedToken.accessTokenExpiresAt as number
          ).toISOString(),
        });
        // 완전히 새로운 토큰 객체를 반환
        return {
          id: refreshedToken.id,
          email: refreshedToken.email,
          accessToken: refreshedToken.accessToken,
          refreshToken: refreshedToken.refreshToken,
          accessTokenExpiresAt: Number(refreshedToken.accessTokenExpiresAt),
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            email: token.email,
          },
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          error: token.error,
        };
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.errorCode || 'Login failed');
          }

          return {
            id: data.user.id,
            email: data.user.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessTokenExpiresAt: data.accessTokenExpiresAt,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
});
