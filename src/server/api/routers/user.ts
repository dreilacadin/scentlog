import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure
    .meta({ description: "Get current user" })
    .query(async ({ ctx }) => {
      const { user } = ctx.session;
      return await ctx.prisma.user.findUnique({
        where: { id: user.id },
      });
    }),
});
