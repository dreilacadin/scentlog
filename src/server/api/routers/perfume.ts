import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";
import { errorHandler } from "~/server/utils/error";
import { protectedProcedure, publicProcedure } from "./../trpc";

export const perfumeRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({ description: "List all perfumes" })
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.perfume.findMany({
          include: {
            brand: true,
          },
        });
      } catch (error) {
        errorHandler(error);
      }
    }),
  createPerfume: protectedProcedure
    .meta({ description: "Create a perfume" })
    .input(
      z.object({
        name: z.string().describe("perfume name"),
        brand: z.string().describe("perfume brand"),
        batchCode: z.string().describe("perfume batch code"),
        image: z.string().nullable().describe("perfume image url"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.perfume.create({
        data: {
          name: input.name,
          brand: {
            create: {
              name: input.brand,
            },
          },
          batchCode: input.name,
        },
      });
    }),
  deletePerfume: protectedProcedure
    .meta({ description: "Delete a perfume" })
    .input(
      z.object({
        id: z.string().describe("Id of Perfume"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.perfume.delete({
        where: { id: input.id },
      });
    }),
});
