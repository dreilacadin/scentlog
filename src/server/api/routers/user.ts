import { z } from "zod";
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
  createUser: protectedProcedure
    .meta({ description: "Create a new user" })
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
});
