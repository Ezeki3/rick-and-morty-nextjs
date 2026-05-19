"use client";

import Image from "next/image";
import Link from "next/link";
import { CharacterBase } from "@/types/character";
import StatusBadge from "@/components/ui/StatusBadge";

export default function CharacterCard({ character }: { character: CharacterBase }) {
  return (
    <Link
      href={`/characters/${character.id}`}
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors">
          {character.name}
        </h3>
        <StatusBadge status={character.status} />
        <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
          <span>{character.species}</span>
          <span>{character.gender}</span>
        </div>
      </div>
    </Link>
  );
}
