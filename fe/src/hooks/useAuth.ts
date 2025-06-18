/**
 * ✅ 전제 조건
- 로그인 시 백엔드에서 JWT 토큰을 cookie에 저장했다고 가정
- 사용자 정보를 저장한 API가 /auth/me 또는 /users/me 형태로 존재해야 함
- 클라이언트는 해당 API를 호출해 현재 로그인한 사용자 정보를 가져옴
 */

import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/api/auth";

interface User {
  id: string;
  nickname: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.warn("사용자 정보를 불러오는 데 실패했습니다.:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, loading };
};
