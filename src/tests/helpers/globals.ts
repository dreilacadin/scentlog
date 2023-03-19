import { type Context } from "~/server/api/trpc";
import { type Session } from "next-auth";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { UserRole } from "~/server/auth";

export const MOCK_SESSION: Session = {
  user: {
    id: "clfdo3rxd0000e2t5go13fmqr",
    name: "Aiden Skye",
    email: "aidenskye@gmail.com",
    role: UserRole.admin,
  },
  expires: new Date().toISOString(),
};

export const ctx = (session?: Session) => {
  return createInnerTRPCContext({ session: session ?? null });
};

export const caller = (ctx: () => Context) => {
  return appRouter.createCaller(ctx());
};
