import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Loader,
  Text,
} from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Home = () => {
  const { data: session, status } = useSession();

  function handleSignInToDiscord() {
    signIn("discord").catch(console.log);
  }

  const createPerfume = api.perfume.createPerfume.useMutation();

  function callMutate() {
    createPerfume.mutate({
      name: "Y EDP",
      brand: "YSL",
      batchCode: "38W803M",
    });
  }

  if (status === "loading") {
    return (
      <Container>
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <Container>
      {session ? (
        <>
          <Flex align={"center"} gap={14}>
            <div className="rounded-lg border border-neutral-700">
              <Avatar
                radius="lg"
                variant="outline"
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
          <div className="pt-6">
            <button onClick={callMutate}>Add Perfume</button>
          </div>
        </>
      ) : (
        <button onClick={handleSignInToDiscord}>Login with discord</button>
      )}
    </Container>
  );
};

export default Home;
