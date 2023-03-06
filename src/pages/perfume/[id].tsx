import { useRouter } from "next/router";
import AppSpinner from "~/components/spinners/AppSpinner";
import { api } from "~/utils/api";

const PerfumeView = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, error, status } = api.perfume.viewPerfume.useQuery({ id });

  if (status === "loading") return <AppSpinner />;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default PerfumeView;
