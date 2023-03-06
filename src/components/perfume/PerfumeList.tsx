import PerfumeCard from "~/components/perfume/PerfumeCard";
import AppSpinner from "~/components/spinners/AppSpinner";
import { api } from "~/utils/api";

interface PerfumeListProps {
  userId: string;
}

const PerfumeList: React.FC<PerfumeListProps> = ({ userId }) => {
  const { data: perfumes, error } = api.perfume.getUserPerfumes.useQuery({
    userId,
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!perfumes) {
    return <AppSpinner />;
  }

  return (
    <div>
      {perfumes.map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
};

export default PerfumeList;
