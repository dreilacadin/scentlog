import {
  type inferProcedureInput,
  type inferProcedureOutput,
} from "@trpc/server";
import cuid from "cuid";
import { appRouter, type AppRouter } from "~/server/api/root";
import { UserRole } from "~/server/auth";
import { MOCK_SESSION } from "~/tests/helpers/globals";
import { prismaMock } from "~/tests/helpers/prismaMock";

let mockSession = MOCK_SESSION;

const caller = appRouter.createCaller({
  session: mockSession,
  prisma: prismaMock,
});

describe("Perfume Router Unit Tests", () => {
  it("should get all the perfumes", async () => {
    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
    });
    type Output = inferProcedureOutput<AppRouter["perfume"]["getAll"]>;
    const mockOutput: Output = [
      {
        id: cuid(),
        name: "YSL Y EDP",
        brandId: cuid(),
        brand: {
          id: cuid(),
          name: "YSL",
          logo: "test logo url",
        },
        batchCode: "12345",
        image: "test image url",
      },
      {
        id: cuid(),
        name: "Sauvage EDP",
        brandId: cuid(),
        brand: {
          id: cuid(),
          name: "Dior",
          logo: "test logo url",
        },
        batchCode: "12345",
        image: "test image url",
      },
    ];
    prismaMock.perfume.findMany.mockResolvedValue(mockOutput);
    const res = await caller.perfume.getAll();

    expect(res).toHaveLength(mockOutput.length);
    expect(res).toStrictEqual(mockOutput);
    expect(res && res[0]).toHaveProperty("brand");
  }),
    it("should create a perfume", async () => {
      type Input = inferProcedureInput<AppRouter["perfume"]["createPerfume"]>;

      const input: Input = {
        name: "y edp",
        brand: "ysl",
        batchCode: "12345",
        image: "test image url",
      };

      const brand = await prismaMock.brand.findFirst({
        where: { name: input.brand },
      });

      prismaMock.perfume.create.mockResolvedValue({
        id: cuid(),
        name: input.name,
        brandId: brand?.id || cuid(),
        batchCode: input.batchCode,
        image: input.image,
      });

      const res = await caller.perfume.createPerfume(input);

      expect(res).toHaveProperty("id"); /* means perfume is created */
      expect(res).toHaveProperty("name");
      expect(res).toHaveProperty("image");
    }),
    it("should delete a perfume", async () => {
      mockSession = {
        ...mockSession,
        user: { ...mockSession.user, role: UserRole.admin },
      };
      type Input = inferProcedureInput<AppRouter["perfume"]["createPerfume"]>;

      const input: Input = {
        name: "y edp",
        brand: "ysl",
        batchCode: "12345",
        image: "test image url",
      };

      const brand = await prismaMock.brand.findFirst({
        where: { name: input.brand },
      });

      prismaMock.perfume.create.mockResolvedValue({
        id: cuid(),
        name: input.name,
        brandId: brand?.id || cuid(),
        batchCode: input.batchCode,
        image: input.image,
      });

      const perfume = await caller.perfume.createPerfume(input);

      prismaMock.perfume.delete.mockResolvedValue(perfume);

      const res = await caller.perfume.deletePerfume({ id: perfume.id });

      expect(res).toBeTruthy(); /* means perfume is deleted */
    });
});
