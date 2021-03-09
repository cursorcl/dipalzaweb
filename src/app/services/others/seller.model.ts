import { ISearchedModel } from "app/utils/search/serached-model";

export interface ISellerModel {
    codigo: string;
    rut: string;
    nombre: string;
}

export class SellerModel implements ISellerModel, ISearchedModel {
    constructor(
        public codigo: string,
        public rut: string,
        public nombre: string
    ){}
}