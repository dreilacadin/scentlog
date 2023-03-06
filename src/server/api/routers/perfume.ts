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
  getUserPerfumes: protectedProcedure
    .meta({ description: "List all perfumes of a user" })
    .input(
      z.object({
        userId: z.string().describe("Id of User"),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.perfume.findMany({
        where: {
          owners: {
            some: {
              id: input.userId,
            },
          },
        },
        include: {
          brand: true,
        },
      });
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
      const { user } = ctx.session;
      // If user is logged in when creating a perfume, attach user to created perfume
      if (user) {
        return await ctx.prisma.perfume.create({
          data: {
            name: input.name,
            brand: {
              create: {
                name: input.brand,
              },
            },
            batchCode: input.name,
            owners: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }

      // else just create a perfume as per normal
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
  viewPerfume: publicProcedure
    .meta({ description: "View a perfume" })
    .input(
      z.object({
        id: z.string().describe("Id of Perfume"),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.perfume.findUnique({
        where: { id: input.id },
        include: {
          brand: true,
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
