import { faker } from "@faker-js/faker";
import { type inferProcedureInput } from "@trpc/server";
import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { MOCK_SESSION } from "~/tests/helpers/globals";

let ctx = createInnerTRPCContext({ session: MOCK_SESSION });
let caller = appRouter.createCaller(ctx);

describe("Perfume Router Integration tests", () => {
  it("should create a perfume and assign to logged in user", async () => {
    const { user } = MOCK_SESSION;
    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    const loggedInUser = await caller.user.me();

    type Input = inferProcedureInput<AppRouter["perfume"]["createPerfume"]>;

    const input: Input = {
      name: faker.commerce.productName(),
      batchCode: faker.random.alphaNumeric(10),
      image: faker.image.imageUrl(),
      brand: faker.company.name(),
    };

    const perfume = await caller.perfume.createPerfume(input);

    expect(newUser).toStrictEqual(loggedInUser);
    expect(perfume).toHaveProperty("owners");
    expect(perfume.owners[0]?.email).toBe(loggedInUser?.email);
  });
  it("create perfume should fail if there is no logged in user", async () => {
    ctx = createInnerTRPCContext({ session: null });
    caller = appRouter.createCaller(ctx);

    type Input = inferProcedureInput<AppRouter["perfume"]["createPerfume"]>;

    const input: Input = {
      name: faker.commerce.productName(),
      batchCode: faker.random.alphaNumeric(10),
      image: faker.image.imageUrl(),
      brand: faker.company.name(),
    };

    await expect(caller.perfume.createPerfume(input)).rejects.toThrowError(
      "UNAUTHORIZED"
    );
  });
});
