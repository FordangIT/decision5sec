import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).send("Authorization code missing");
  }

  try {
    // 1. 인가 코드를 access_token으로 교환
    const tokenRes = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        code
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenRes.data;

    // 2. 사용자 정보 요청
    const userRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const user = userRes.data;

    // 3. 사용자 정보 처리 (예: DB 저장, 세션 생성 등)
    console.log("✅ 카카오 사용자:", user);

    // 👉 여기에서 쿠키 저장 또는 리디렉션 가능
    res.redirect("/mypage");
  } catch (error: any) {
    console.error(
      "❌ 카카오 로그인 실패:",
      error.response?.data || error.message
    );
    res.status(500).send("로그인 실패");
  }
}
