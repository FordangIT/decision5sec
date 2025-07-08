import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { KakaoProfile } from "@/types/next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const kakaoProfile = profile as KakaoProfile;
        token.id = kakaoProfile.id;
        token.nickname = kakaoProfile.properties?.nickname;
      }
      return token;
    },

    async session({
      session,
      token
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.user.id = token.id as string;
      session.user.nickname = token.nickname as string;
      return session;
    }
  }
};

export default NextAuth(authOptions);
