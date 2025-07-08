import { DefaultSession } from "next-auth";

// ✅ next-auth 확장
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickname: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    nickname: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nickname: string;
  }
}

// ✅ KakaoProfile 타입 정의 (확장 아님)
export interface KakaoProfile {
  id: string;
  properties?: {
    nickname?: string;
  };
  kakao_account?: {
    email?: string;
  };
}
