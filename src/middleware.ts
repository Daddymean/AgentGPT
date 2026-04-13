import type { NextRequest } from "next/server";
import { ipAddress } from "@vercel/edge";
import { isAllowed } from "./server/redis";

export const config = {
  // Only run the middleware on agent routes
  matcher: "/api/agent/:path*",
};

async function shouldRateLimit(request: NextRequest): Promise<boolean> {
  const ip = request.ip ?? ipAddress(request) ?? "127.0.0.1";
  if (!ip) {
    return false;
  }

  return !(await isAllowed(ip));
}

const rateLimitedResponse = () =>
  new Response("Too many requests, please try again later.", {
    status: 429,
  });

// noinspection JSUnusedGlobalSymbols
export async function middleware(request: NextRequest) {
  if (await shouldRateLimit(request)) {
    return rateLimitedResponse();
  }
}
