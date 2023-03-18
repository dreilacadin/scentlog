import { type Session } from "next-auth";
import { UserRole } from "~/server/auth";

export const MOCK_SESSION: Session = {
  user: {
    id: "clfdo3rxd0000e2t5go13fmqr",
    name: "Aiden Skye",
    email: "aidenskye@gmail.com",
    role: UserRole.user,
  },
  expires: new Date().toISOString(),
};
