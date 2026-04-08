import {ApiService} from "../logic/getUsers";

export const usuarioService = new ApiService<Usuario>(
    "https://jsonplaceholder.typicode.com/users"
);
export const postService = new ApiService<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
);
export const characterService = new ApiService<CharacterResponse>(
    "https://rickandmortyapi.com/api/character"
);