import resetDB from "~/tests/helpers/reset-db";

afterEach(async () => {
  await resetDB();
});
