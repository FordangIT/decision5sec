import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      {session ? (
        <>
          <p>안녕하세요, {session.user.nickname}님!</p>
          <img
            src={session.user.image}
            alt="프로필"
            className="w-16 h-16 rounded-full"
          />
          <button onClick={() => signOut()}>로그아웃</button>
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
}
