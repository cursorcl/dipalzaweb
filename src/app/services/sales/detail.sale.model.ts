export interface IDetailSaleModel {
    indice: number;
    rut: string;
    codigo: string;
    vendedor: string,
    fila: number,
    articulo: string,
    cantidad: number,
    neto: number;
    descuento: number;
    codigo_ila: string,
    ila: number;
    carne: number;
    iva: number;
    precio: number,
    numeros: string,
    correlativos: string,
    pesos: string,
    fecha: Date
}

export class DetailSaleModel implements IDetailSaleModel {
    constructor(
        public indice: number,
        public rut: string,
        public codigo: string,
        public vendedor: string,
        public fila: number,
        public articulo: string,
        public cantidad: number,
        public neto: number,
        public descuento: number,
        public codigo_ila: string,
        public ila: number,
        public carne: number,
        public iva: number,
        public precio: number,
        public numeros: string,
        public correlativos: string,
        public pesos: string,
        public fecha: Date
    ){}
}