import { type PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";

jest.mock("~/server/db", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = mockDeep<PrismaClient>();
