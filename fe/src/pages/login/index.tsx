import React from "react";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

export default function LoginPage() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-xl mb-4 font-bold">카카오 로그인</h1>
      <a href={KAKAO_AUTH_URL}>
        <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded">
          카카오로 로그인
        </button>
      </a>
    </div>
  );
}
