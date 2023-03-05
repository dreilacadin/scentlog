import { TRPCError } from "@trpc/server";
import { type Context } from "~/server/api/trpc";
import { UserRole } from "~/server/auth";

export function isAdmin(ctx: Context) {
  if (ctx.session?.user.role !== UserRole.admin) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Access Denied" });
  }

  return true;
}
