import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // validate refresh token and issue new access token
  // return NextResponse.redirect("http://localhost:9000/landing?token=" + appJwt);
}
