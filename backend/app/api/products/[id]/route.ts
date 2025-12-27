import { mockProducts } from "@/mockData";
import { validateToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/products/[id]">
) {
  const result = validateToken(request);
  if (result.isValid === false) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const { id } = await ctx.params;
  const product = mockProducts.find((p) => p.id === parseInt(id, 10));
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
