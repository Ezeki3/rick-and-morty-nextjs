"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS_BY_IDS } from "@/lib/queries";
import { CharactersByIdsResponse, CharacterBase } from "@/types/character";
import { useFavoritesStore } from "@/store/favorites";
import SortableItem from "@/components/favorites/SortableItem";

export default function FavoritesPage() {
  const { favorites, reorder } = useFavoritesStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const { data, loading } = useQuery<CharactersByIdsResponse>(
    GET_CHARACTERS_BY_IDS,
    {
      variables: { ids: favorites },
      skip: favorites.length === 0,
    }
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = favorites.indexOf(String(active.id));
    const to = favorites.indexOf(String(over.id));
    if (from !== -1 && to !== -1) reorder(from, to);
  }

  if (!hydrated) return null;

  if (favorites.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl mb-4 block">☆</span>
        <h2 className="text-xl font-semibold text-white mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Browse characters and add up to 5 to your favorites list.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded-xl text-sm font-medium hover:bg-green-500/30 transition-colors"
        >
          Browse characters
        </Link>
      </div>
    );
  }

  const characterMap = new Map<string, CharacterBase>(
    (data?.charactersByIds ?? []).map((c) => [c.id, c])
  );

  const orderedCharacters = favorites
    .map((id) => characterMap.get(id))
    .filter((c): c is CharacterBase => !!c);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Favorites</h1>
          <p className="text-sm text-gray-400 mt-1">
            {favorites.length}/5 · Drag to reorder
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-green-400 transition-colors"
        >
          ← Back
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {favorites.map((id) => (
            <div
              key={id}
              className="bg-gray-800 rounded-xl h-20 animate-pulse border border-gray-700"
            />
          ))}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={favorites}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {orderedCharacters.map((character, index) => (
                <SortableItem
                  key={character.id}
                  character={character}
                  index={index}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
