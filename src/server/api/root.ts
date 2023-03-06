import { brandRouter } from "~/server/api/routers/brand";
import { logRouter } from "~/server/api/routers/log";
import { perfumeRouter } from "~/server/api/routers/perfume";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  perfume: perfumeRouter,
  brand: brandRouter,
  log: logRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
