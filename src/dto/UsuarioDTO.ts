//fetch
export interface ApiResponse<T> {
    NombreApi: string;
    data:T | null;  //esto es el cuerpo del body en caso tal de que salga bien
    error:string | null; //error en caso tal de que salga mal
    status:number;  //codigo http [200, 400, 401, 500]
}