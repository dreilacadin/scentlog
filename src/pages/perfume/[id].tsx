import { Container, Flex, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import AppSpinner from "~/components/spinners/AppSpinner";
import { api } from "~/utils/api";

const PerfumeView = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, error, status } = api.perfume.viewPerfume.useQuery({ id });

  if (status === "loading" || !data) return <AppSpinner />;

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <div className="flex flex-col gap-y-4">
        <Image mx="auto" radius="md" src={data?.image} alt="Random image" />
        <div>
          <h1 className="text-2xl">
            {data.name} by {data.brand?.name}
          </h1>
          <Text c="dimmed">Batch code: {data.batchCode}</Text>
        </div>
      </div>
    </Container>
  );
};

export default PerfumeView;
