import { Flex, Avatar, Box, Text } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import AppSpinner from "~/components/spinners/AppSpinner";
import { greetTimeOfDay } from "~/lib/helpers/greetTImeOfDay";

const UserSession = () => {
  const { data: session, status } = useSession();

  function handleSignInToDiscord() {
    signIn("discord").catch(console.log);
  }

  if (status === "loading") {
    return <AppSpinner />;
  }

  if (!session) {
    return <button onClick={handleSignInToDiscord}>Login with discord</button>;
  }

  return (
    <Flex align={"center"} justify={"space-between"} gap={14}>
      <Flex align={"center"} gap={16}>
        <div className="rounded-3xl border border-yellow-500">
          <Avatar
            radius="xl"
            variant="outline"
            size="lg"
            color={"yellow"}
            src={session.user.image}
          />
        </div>

        <Box>
          <Text fz="sm" c="dimmed">
            Good {greetTimeOfDay()}
          </Text>
          <Text variant="gradient" fz="lg" fw="bold">
            {session.user.name}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserSession;
