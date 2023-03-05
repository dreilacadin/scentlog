import { z } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";
import { errorHandler } from "~/server/utils/error";
import { isAdmin } from "~/server/utils/isAdmin";
import { protectedProcedure, publicProcedure } from "./../trpc";

export const brandRouter = createTRPCRouter({
  getAll: publicProcedure
    .meta({
      description: "List all perfume brands",
    })
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.brand.findMany();
      } catch (error) {
        errorHandler(error);
      }
    }),
  createBrand: protectedProcedure
    .input(
      z.object({
        name: z.string().describe("Brand name"),
        logo: z.string().nullable().describe("image url of brand logo"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isAdmin(ctx);
      return await ctx.prisma.brand.create({
        data: {
          name: input.name,
          logo: input.logo,
        },
      });
    }),
  updateBrand: protectedProcedure
    .meta({ description: "Update brand details" })
    .input(
      z.object({
        id: z.string().describe("brand id to update"),
        logo: z.string().optional().describe("logo url"),
        name: z.string().optional().describe("new brand name"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      isAdmin(ctx);
      return await ctx.prisma.brand.update({
        where: { id: input.id },
        data: {
          logo: input.logo,
          name: input.name,
        },
        select: {
          name: true,
          logo: true,
          perfumes: true,
        },
      });
    }),
});
