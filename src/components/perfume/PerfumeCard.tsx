import { Avatar } from "@mantine/core";
import { type Brand, type Perfume } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { paths } from "~/lib/paths";

interface PerfumeCardProps {
  perfume: Perfume & { brand: Brand };
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume }) => {
  if (!perfume) return null;

  return (
    <Link
      href={paths.perfume.view.replace(":id", perfume.id)}
      className="mb-4 flex items-center gap-4 rounded-lg border border-neutral-700 p-4"
    >
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
    </Link>
  );
};

export default PerfumeCard;
