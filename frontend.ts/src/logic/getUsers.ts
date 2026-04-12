import {ApiResponse} from "../dto/UsuarioDTO"

export async function apiRequest<T>(url:string, NombreApi:string): Promise<ApiResponse<T>>{
    try {
        const res = await fetch(url);

        if (!res.ok) {
            return {
                NombreApi:NombreApi,
                data:null,
                error: `Error a la hora de hacer la peticion: ${res.statusText}`,
                status: res.status
            }
        }

        const body: unknown = await res.json();

        if (body === null || body === undefined) {
            return{
                NombreApi:NombreApi,
                data:null,
                error: "Error en la petición",
                status: res.status
            };
        }

        return {
            NombreApi:NombreApi,
            data:body as T,
            error:null,
            status:res.status
        }
    } catch (error) {
        //se nos cayo el internet
        return{
            NombreApi:NombreApi,
            data:null,
            error:"fallo la conexion total, compre internet",
            status: 500
        };
    }
}

export class ApiService<T> {
    constructor(private endpoint: string) { }

    async getAll(): Promise<ApiResponse<T[]>> { // T[] porque normalmente esperas una lista
        try {
            const res = await fetch(this.endpoint);
            const data = await res.json();

            return {
                NombreApi: this.endpoint,
                data: res.ok ? data : null,
                error: res.ok ? null : "Error al obtener datos",
                status: res.status
            };

        } catch (error) {
            return {
                NombreApi: this.endpoint,
                data: null,
                error: "Error de red",
                status: 500
            };
        }
    }

    // Cambié id: number por id: string | number
    async getOne(id: string | number): Promise<ApiResponse<T>> {
        try {
            const res = await fetch(`${this.endpoint}/${id}`);
            const data = await res.json();

            return {
                NombreApi: this.endpoint,
                data: res.ok ? data : null,
                error: res.ok ? null : "Error al obtener recurso",
                status: res.status
            };

        } catch (error) {
            return {
                NombreApi: this.endpoint,
                data: null,
                error: "Error de red",
                status: 500
            };
        }
    }

    async create(body: Partial<T>): Promise<ApiResponse<T>> {
        try {
            const res = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            return {
                NombreApi: this.endpoint,
                data: res.ok ? data : null,
                error: res.ok ? null : "Error al crear recurso",
                status: res.status
            };
        } catch (error) {
            return {
                NombreApi: this.endpoint,
                data: null,
                error: "Error de red",
                status: 500
            };
        }
    }

    // Cambié id: number por id: string | number
    async update(id: string | number, body: Partial<T>): Promise<ApiResponse<T>> {
        try {
            const res = await fetch(`${this.endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            return {
                NombreApi: this.endpoint,
                data: res.ok ? data : null,
                error: res.ok ? null : "Error al actualizar recurso",
                status: res.status
            };
        } catch (error) {
            return {
                NombreApi: this.endpoint,
                data: null,
                error: "Error de red",
                status: 500
            };
        }
    }

    // Cambié id: number por id: string | number
    async delete(id: string | number): Promise<ApiResponse<T>> {
        try {
            const res = await fetch(`${this.endpoint}/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            return {
                NombreApi: this.endpoint,
                data: res.ok ? data : null,
                error: res.ok ? null : "Error al eliminar recurso",
                status: res.status
            };
        } catch (error) {
            return {
                NombreApi: this.endpoint,
                data: null,
                error: "Error de red",
                status: 500
            };
        }
    }
}