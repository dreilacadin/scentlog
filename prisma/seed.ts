import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { faker } from "@faker-js/faker";
import cuid from "cuid";
import { prisma } from "~/server/db";

type User = inferProcedureOutput<AppRouter["user"]["createUser"]>;
type Perfume = inferProcedureOutput<AppRouter["perfume"]["createPerfume"]>;
type Brand = inferProcedureOutput<AppRouter["brand"]["createBrand"]>;

const user = (): User => {
  const name = faker.name.firstName() + " " + faker.name.lastName();
  const email = faker.internet.email(name);

  return {
    id: cuid(),
    name,
    email,
    role: faker.helpers.arrayElement(["USER", "ADMIN"]),
    emailVerified: null,
    image: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: null,
  };
};

const brand = (): Brand => {
  const name = faker.company.name();
  const logo = faker.image.imageUrl();

  return {
    id: cuid(),
    name,
    logo,
  };
};

const perfume = (): Perfume => {
  const name = faker.commerce.productName();
  const brandId = brand().id;
  const batchCode = faker.random.alphaNumeric(5);
  const image = faker.image.imageUrl();

  return {
    id: cuid(),
    name,
    brandId,
    batchCode,
    image,
    owners: [],
  };
};

export async function seedDb() {
  const fakerRounds = 10;
  console.log("Seeding...");
  const admin = await prisma.user.findUnique({
    where: { email: "dreilacadin@gmail.com" },
  });
  for (let i = 0; i < fakerRounds; i++) {
    const newUser = await prisma.user.create({ data: user() });
    const newBrand = await prisma.brand.create({ data: brand() });
    if (admin) {
      await prisma.perfume.create({
        data: {
          ...perfume(),
          brandId: newBrand.id,
          owners: {
            connect: {
              id: admin.id,
            },
          },
        },
      });
    } else if (newUser) {
      await prisma.perfume.create({
        data: {
          ...perfume(),
          brandId: newBrand.id,
          owners: { connect: { id: newUser.id } },
        },
      });
    }
  }
}

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
