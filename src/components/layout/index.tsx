import { Container } from "@mantine/core";
import { HeaderResponsive } from "~/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderResponsive links={[]} />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
