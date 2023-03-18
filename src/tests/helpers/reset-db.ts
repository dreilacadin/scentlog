// src/tests/helpers/reset-db.ts

import { prisma } from "~/server/db";

const resetDB = async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.brand.deleteMany(),
    prisma.perfume.deleteMany(),
  ]);
};

export default resetDB;
