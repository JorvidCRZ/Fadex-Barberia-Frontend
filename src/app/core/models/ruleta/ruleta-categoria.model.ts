export interface RuletaCategoriaResponse {
    id: number;
    idRuleta: number;
    nombreRuleta: string;
    idCategoria: number;
    nombreCategoria: string;
}

export interface RuletaCategoriaRequest {
    idRuleta: number;
    idCategoria: number;
}

export interface RuletaCategoriaFiltro {
    idRuleta?: number;
    idCategoria?: number;
}

//para  realcionar ruleta con categoria, se necesita el id de la ruleta y el id de la categoria, por eso se crea esta interfaz