import { apiRequest } from "../logic/getUsers";
import { Usuario } from "../models/Usuario";
import { ApiResponse } from "../dto/UsuarioDTO";

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

export class ApiService<T> {
    private baseUrl: string;
    private nombreApi: string;

    constructor(url: string, nombreApi: string = "API") {
        this.baseUrl = url;
        this.nombreApi = nombreApi;
    }

    async get(): Promise<ApiResponse<T>> {
        return apiRequest<T>(this.baseUrl, this.nombreApi);
    }

    async post(body: unknown): Promise<ApiResponse<T>> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return {
            NombreApi: this.nombreApi,
            data: data as T,
            error: response.ok ? null : "Error en la petición",
            status: response.status,
        };
    }

    async put(id: string | number, body: unknown): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return {
            NombreApi: this.nombreApi,
            data: data as T,
            error: response.ok ? null : "Error en la petición",
            status: response.status,
        };
    }

    async delete(id: string | number): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        return {
            NombreApi: this.nombreApi,
            data: data as T,
            error: response.ok ? null : "Error en la petición",
            status: response.status,
        };
    }
}

export const usuarioService = new ApiService<Usuario>(
    "http://localhost:3000/api/users",
    "Usuarios"
);
export const postService = new ApiService<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    "Posts"
);
export const characterService = new ApiService<CharacterResponse>(
    "https://rickandmortyapi.com/api/character",
    "Personajes"
);