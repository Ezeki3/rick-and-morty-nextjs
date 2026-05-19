export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface CharacterBase {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  gender: CharacterGender;
  image: string;
}

export interface CharacterDetail extends CharacterBase {
  origin: { name: string };
  location: { name: string };
  episode: { id: string }[];
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersResponse {
  characters: {
    info: CharactersInfo;
    results: CharacterBase[];
  };
}

export interface CharacterResponse {
  character: CharacterDetail;
}

export interface CharactersByIdsResponse {
  charactersByIds: CharacterBase[];
}
