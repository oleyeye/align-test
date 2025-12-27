import { generateAppJwt } from "@/utils/jwt";
import { retrieveToken, storeToken } from "@/utils/storage";
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

  const accessToken: Token = await tokenResponse.json();
  storeToken(accessToken);
  const userInfo = await getUserInfo();
  console.log("User Info:", userInfo);
  const appJwt = generateAppJwt(userInfo);
  console.log("Generated JWT:", appJwt);
  return NextResponse.redirect("http://localhost:9000/landing?token=" + appJwt);
}

async function getUserInfo(): Promise<User> {
  // Implement user info retrieval logic here
  const token = retrieveToken();
  if (!token) {
    throw new Error("No token available");
  }
  const url = "https://api.github.com/user";
  const githubRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
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
