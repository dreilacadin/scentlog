import React from "react";
import PerfumeCard from "~/components/perfume/PerfumeCard";
import AppSpinner from "~/components/spinners/AppSpinner";
import { api } from "~/utils/api";

const PerfumeList = () => {
  const { data: perfumes, error } = api.perfume.getAll.useQuery();
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
