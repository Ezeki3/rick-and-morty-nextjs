"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Link from "next/link";
import { CharacterBase } from "@/types/character";
import { useFavoritesStore } from "@/store/favorites";
import StatusBadge from "@/components/ui/StatusBadge";

export default function SortableItem({
  character,
  index,
}: {
  character: CharacterBase;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: character.id });

  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-green-500/30 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300 transition-colors px-1 shrink-0 touch-none"
        aria-label="Drag to reorder"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      </button>

      <span className="text-gray-500 text-sm font-mono w-5 text-center shrink-0">
        {index + 1}
      </span>

      <Link
        href={`/characters/${character.id}`}
        className="flex items-center gap-3 flex-1 min-w-0 group"
      >
        <Image
          src={character.image}
          alt={character.name}
          width={56}
          height={56}
          className="w-14 h-14 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
            {character.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={character.status} />
            <span className="text-xs text-gray-400">{character.species}</span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => removeFavorite(character.id)}
        className="shrink-0 p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
        aria-label="Remove from favorites"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
