import { Nivel } from "./nivel";

export interface Desenvolvedor {
    id: number;
    nivel_id: number;
    nome: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    nivel?: Nivel;
}
