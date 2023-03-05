import React from "react";
import { type Brand, type Perfume } from "@prisma/client";
import { Avatar } from "@mantine/core";
import Image from "next/image";

interface PerfumeCardProps {
  perfume: Perfume & { brand: Brand };
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume }) => {
  if (!perfume) return null;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-neutral-700 p-4">
      <Avatar variant={"outline"}>
        {perfume.image ? (
          <Image src={perfume.image} alt={perfume.name} />
        ) : (
          <p>{perfume.name[0]}</p>
        )}
      </Avatar>
      <div>
        <p className="flex gap-x-2">
          <span>{perfume.brand.name}</span>
          <span>{perfume.name}</span>
        </p>
        <p>Batch Code: {perfume.batchCode}</p>
      </div>
    </div>
  );
};

export default PerfumeCard;
