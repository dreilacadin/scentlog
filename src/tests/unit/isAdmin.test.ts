import { UserRole } from "~/server/auth";
import { isAdmin } from "~/server/utils/isAdmin";
import { ctx, MOCK_SESSION } from "~/tests/helpers/globals";

describe("isAdmin", () => {
  it("should return true if user logged in user is admin", () => {
    const result = isAdmin(ctx(MOCK_SESSION));

    expect(result).toBe(true);
  });

  it("should throw an error if user is not admin", () => {
    const anonymousCtx = ctx({
      ...MOCK_SESSION,
      user: {
        ...MOCK_SESSION.user,
        role: UserRole.user,
      },
    });

    function callIsAdmin() {
      isAdmin(anonymousCtx);
    }

    expect(callIsAdmin).toThrowError(/Access Denied/);
  });
});
