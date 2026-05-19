"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "@/lib/queries";
import { CharacterResponse } from "@/types/character";
import { useFavoritesStore } from "@/store/favorites";
import StatusBadge from "@/components/ui/StatusBadge";
import ErrorMessage from "@/components/ui/ErrorMessage";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-gray-700 last:border-0">
      <span className="text-gray-400 text-sm w-40 shrink-0">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, loading, error } = useQuery<CharacterResponse>(GET_CHARACTER, {
    variables: { id },
  });

  const { isFavorite, addFavorite, removeFavorite, favorites } =
    useFavoritesStore();
  const favorited = isFavorite(id);
  const isFull = favorites.length >= 5 && !favorited;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="flex gap-6">
          <div className="w-48 h-48 rounded-2xl bg-gray-700 shrink-0" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-6 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.character) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <ErrorMessage message={error?.message ?? "Character not found"} />
      </div>
    );
  }

  const c = data.character;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors mb-8"
      >
        ← Back to characters
      </Link>

      <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <Image
            src={c.image}
            alt={c.name}
            width={192}
            height={192}
            className="w-48 h-48 rounded-xl object-cover shrink-0 mx-auto sm:mx-0"
          />
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-white">{c.name}</h1>
            <StatusBadge status={c.status} />
            <p className="text-gray-400 text-sm">
              {c.species} · {c.gender}
            </p>
            <button
              onClick={() =>
                favorited ? removeFavorite(id) : addFavorite(id)
              }
              disabled={isFull}
              title={isFull ? "Favorites list is full (max 5)" : undefined}
              className={`mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                favorited
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/30"
                  : isFull
                  ? "bg-gray-700 text-gray-500 border border-gray-600 cursor-not-allowed"
                  : "bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30"
              }`}
            >
              <span>{favorited ? "★" : "☆"}</span>
              {favorited
                ? "Remove from favorites"
                : isFull
                ? "Favorites full (5/5)"
                : "Add to favorites"}
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Details
          </h2>
          <div className="bg-gray-900/50 rounded-xl px-4">
            <DetailRow label="Origin" value={c.origin.name} />
            <DetailRow label="Last location" value={c.location.name} />
            <DetailRow
              label="Episodes"
              value={`Appears in ${c.episode.length} episode${c.episode.length !== 1 ? "s" : ""}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
