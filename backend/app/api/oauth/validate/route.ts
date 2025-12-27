import { validateToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const result = validateToken(request);
  if (result.isValid === false) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  return NextResponse.json({message: 'authenticated'});
}
