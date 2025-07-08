import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn("kakao")}
        className="bg-yellow-400 px-6 py-3 rounded text-black font-bold"
      >
        카카오 로그인
      </button>
    </div>
  );
}
