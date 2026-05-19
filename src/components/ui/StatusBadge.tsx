import { CharacterStatus } from "@/types/character";

const statusConfig: Record<
  CharacterStatus,
  { color: string; dot: string }
> = {
  Alive: { color: "text-green-400 bg-green-400/10", dot: "bg-green-400" },
  Dead: { color: "text-red-400 bg-red-400/10", dot: "bg-red-400" },
  unknown: { color: "text-gray-400 bg-gray-400/10", dot: "bg-gray-400" },
};

export default function StatusBadge({ status }: { status: CharacterStatus }) {
  const config = statusConfig[status] ?? statusConfig.unknown;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
