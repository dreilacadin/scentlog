import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const logRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({
      description: "Lists all the perfume usage logs",
    })
    .query(async ({ ctx }) => {
      return await ctx.prisma.log.findMany();
    }),
  startLog: protectedProcedure
    .meta({
      description: "Log a perfume spray to get longevity",
    })
    .input(
      z.object({
        perfumeId: z.string().describe("PK of the Perfume being logged"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      if (!user)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must sign in to create a scent log",
        });

      return await ctx.prisma.log.create({
        data: {
          perfumeId: input.perfumeId,
          userId: user.id,
        },
        select: {
          perfume: {
            include: {
              brand: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  deleteLog: protectedProcedure
    .meta({
      description: "Delete a scent log",
    })
    .input(
      z.object({
        logId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.log.delete({
        where: { id: input.logId },
      });
    }),
});
