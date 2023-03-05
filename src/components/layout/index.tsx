import { HeaderResponsive } from "~/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderResponsive links={[]} />
      <main>{children}</main>
    </>
  );
}
