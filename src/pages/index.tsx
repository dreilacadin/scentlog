import { ScrollArea, Tabs, type TabsValue, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PerfumeList from "~/components/perfume/PerfumeList";
import AppSpinner from "~/components/spinners/AppSpinner";
import UserSession from "~/components/user/UserSession";

const Home = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<TabsValue>("perfumes");

  if (status === "loading") {
    return <AppSpinner />;
  }

  if (session) {
    return (
      <>
        <UserSession />
        <div className="pt-8">
          <Tabs
            value={activeTab}
            onTabChange={(value) => setActiveTab(value)}
            variant="pills"
          >
            <Tabs.List grow>
              <Tabs.Tab value="perfumes">My Perfumes</Tabs.Tab>
              <Tabs.Tab value="logs">My Logs</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>

        {activeTab === "perfumes" ? (
          <div className="pt-8">
            <Title order={2} mb={16}>
              My Perfumes:
            </Title>

            <ScrollArea h={520}>
              <PerfumeList userId={session.user.id} />
            </ScrollArea>
          </div>
        ) : (
          <div className="pt-8">
            <Title order={2} mb={16}>
              My Logs:
            </Title>
          </div>
        )}
      </>
    );
  }
};

export default Home;
