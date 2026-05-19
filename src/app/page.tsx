"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/lib/queries";
import { CharactersResponse } from "@/types/character";
import CharacterCard from "@/components/characters/CharacterCard";
import CharacterListItem from "@/components/characters/CharacterListItem";
import SearchBar from "@/components/characters/SearchBar";
import ViewToggle, { ViewMode } from "@/components/characters/ViewToggle";
import Pagination from "@/components/characters/Pagination";
import SpeciesChart from "@/components/characters/SpeciesChart";
import { GridSkeletons, ListSkeletons } from "@/components/ui/LoadingSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("grid");

  const { data, loading, error } = useQuery<CharactersResponse>(
    GET_CHARACTERS,
    {
      variables: { page, filter: search ? { name: search } : {} },
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const characters = data?.characters?.results ?? [];
  const info = data?.characters?.info;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchBar value={search} onChange={handleSearch} />
        <div className="flex items-center gap-3 shrink-0">
          {info && (
            <p className="text-sm text-gray-400">
              {info.count} character{info.count !== 1 ? "s" : ""}
            </p>
          )}
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {error && <ErrorMessage message={error.message} />}

      {!error && characters.length > 0 && (
        <SpeciesChart characters={characters} />
      )}

      {loading ? (
        view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <GridSkeletons />
          </div>
        ) : (
          <ListSkeletons />
        )
      ) : !error && characters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-gray-400">No characters found for &quot;{search}&quot;</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters.map((char: (typeof characters)[0]) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {characters.map((char: (typeof characters)[0]) => (
            <CharacterListItem key={char.id} character={char} />
          ))}
        </div>
      )}

      {info && info.pages > 1 && !loading && (
        <Pagination
          currentPage={page}
          totalPages={info.pages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
