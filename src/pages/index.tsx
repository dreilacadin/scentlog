import { Avatar, Box, Container, Flex, Text } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import PerfumeList from "~/components/perfume/PerfumeList";
import AppSpinner from "~/components/spinners/AppSpinner";

const Home = () => {
  const { data: session, status } = useSession();

  function handleSignInToDiscord() {
    signIn("discord").catch(console.log);
  }

  // const createPerfume = api.perfume.createPerfume.useMutation();

  // function callMutate() {
  //   createPerfume.mutate({
  //     name: "Y EDP",
  //     brand: "YSL",
  //     batchCode: "38W803M",
  //   });
  // }

  if (status === "loading") {
    return <AppSpinner />;
  }

  return (
    <Container>
      {session ? (
        <>
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
                {/* TODO: Make this dynamic depending on time of day */}
                <Text fz="sm" c="dimmed">
                  Good day
                </Text>
                <Text variant="gradient" fz="lg" fw="bold">
                  {session.user.name}
                </Text>
              </Box>
            </Flex>
            <button
              onClick={() => {
                signOut().catch(console.log);
              }}
            >
              Logout
            </button>
          </Flex>

          <div className="pt-6">
            <PerfumeList />
          </div>
        </>
      ) : (
        <button onClick={handleSignInToDiscord}>Login with discord</button>
      )}
    </Container>
  );
};

export default Home;
