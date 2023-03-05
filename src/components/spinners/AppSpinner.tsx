import { Center, Container, Loader } from "@mantine/core";
import React from "react";

const AppSpinner = () => {
  return (
    <Container>
      <Center>
        <Loader />
      </Center>
    </Container>
  );
};

export default AppSpinner;
