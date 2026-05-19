"use client";

import Image from "next/image";
import Link from "next/link";
import { CharacterBase } from "@/types/character";
import StatusBadge from "@/components/ui/StatusBadge";

export default function CharacterListItem({ character }: { character: CharacterBase }) {
  return (
    <Link
      href={`/characters/${character.id}`}
      className="group flex items-center gap-4 bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-green-500/50 transition-all duration-200 hover:shadow-md hover:shadow-green-500/10"
    >
      <Image
        src={character.image}
        alt={character.name}
        width={64}
        height={64}
        className="w-16 h-16 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
          {character.name}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <StatusBadge status={character.status} />
          <span className="text-xs text-gray-400">{character.species}</span>
        </div>
      </div>
      <span className="text-xs text-gray-500 shrink-0 hidden sm:block">
        {character.gender}
      </span>
    </Link>
  );
}
