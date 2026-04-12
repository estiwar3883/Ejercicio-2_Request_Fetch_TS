export type Usuario = {
    id: number | string; // Permite ambos tipos de ID
    name: string;
    email: string;
};

type Post = {
    id: number;
    title: string;
    body: string;
};

type Character = {
    id: number;
    name: string;
    status: string;
};

type CharacterResponse = {
    results: Character[];
};