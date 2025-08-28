import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    /**
     * Supabase の匿名キー
     */
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    /**
     * Supabase の URL
     */
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),

    /**
     * Vercel の URL
     */
    NEXT_PUBLIC_VERCEL_URL: z.string().url().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DEBUG_MESSAGE: process.env.DEBUG_MESSAGE,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    /**
     * Prisma Client がデータベースへ接続するためのデータベース接続先
     */
    DATABASE_URL: z.string().url(),
    DEBUG_MESSAGE: z.string().optional(),
    /**
     * Prisma CLI がデータベースの操作をするためのデータベース接続先
     */
    DIRECT_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
