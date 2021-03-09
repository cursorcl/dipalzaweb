export interface ISellerCodeModel {
    codigo: string;
}

export class SellerCodeModel implements ISellerCodeModel {
    constructor(
        public codigo: string
    ){}
}