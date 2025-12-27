import { generateAppJwt, generateRefreshToken } from "@/utils/jwt";
import { TokenStorage } from "@/utils/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  console.log("Authorization code received:", code);
  const clientId = "Ov23lixlnHTHd4uw1bxF";
  const clientSecret = "496fa21a3d258bcc5b466b546f774b949ae2bafa";
  const tokenRequestUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  const tokenResponse = await fetch(tokenRequestUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  });

  const token: Token = await tokenResponse.json();
  const userInfo = await getUserInfo(token.access_token);
  TokenStorage.storeToken(userInfo.id, {
    tokenValue: token.access_token,
    tokenType: "access_token",
    expiredAt: Date.now() + 3600 * 1000,
    application: "github",
  });
  console.log("User Info:", userInfo);
  const appJwt = generateAppJwt(userInfo);
  const appRefreshToken = generateRefreshToken();
  console.log("Generated JWT:", appJwt);
  console.log("Generated Refresh:", appRefreshToken);
  TokenStorage.storeToken(userInfo.id, {
    tokenValue: appRefreshToken,
    tokenType: "refresh_token",
    expiredAt: Date.now() + 7 * 24 * 3600 * 1000,
    application: "web",
  });
  return NextResponse.redirect("http://localhost:9000/landing?token=" + appJwt);
}

async function getUserInfo(accessToken: string): Promise<User> {
  // Implement user info retrieval logic here
  if (!accessToken) {
    throw new Error("No token available");
  }
  const url = "https://api.github.com/user";
  const githubRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const data = await githubRes.json();
  return {
    login: data.login,
    id: data.id,
    email: data.email,
  };
}
