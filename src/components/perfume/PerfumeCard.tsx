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

  console.log(perfume);

  return (
    <Link
      href={paths.perfume.view.replace(":id", perfume.id)}
      className="mb-4 flex items-center gap-4 rounded-lg border border-neutral-700 p-4"
    >
      <Avatar size={"xl"} radius="lg" bg={"white"} variant={"outline"}>
        {perfume.image ? (
          <Image src={perfume.image} fill className="p-2" alt={perfume.name} />
        ) : (
          <p>{perfume.name[0]}</p>
        )}
      </Avatar>
      <div>
        <p className="flex gap-x-1 font-bold">
          <span>{perfume.brand.name}</span>
          <span>{perfume.name}</span>
        </p>
        <p>Batch Code: {perfume.batchCode}</p>
      </div>
    </Link>
  );
};

export default PerfumeCard;
