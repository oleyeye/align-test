import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = "secret";

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET);

    return {
      isValid: true,
      expired: false,
      payload,
      error: null,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        expired: true,
        payload: null,
        error: "token expired",
        expiredAt: error.expiredAt,
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        isValid: false,
        expired: false,
        payload: null,
        error: `token invalid: ${error.message}`,
      };
    } else {
      return {
        isValid: false,
        expired: false,
        payload: null,
        error: "unknow error",
      };
    }
  }
};

export const extractToken = (headers: Headers): string | null => {
  const authHeader = headers.get("Authorization");

  if (!authHeader) return null;

  const [bearer, token] = authHeader.split(" ");

  return bearer?.toLowerCase() === "bearer" && token ? token : null;
};

export const generateAppJwt = (data: any): string => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      data: data,
    },
    SECRET
  );
  return token;
};

export const validateToken = (request: NextRequest) => {
  const token = extractToken(request.headers);
  return verifyToken(token || "");
};
