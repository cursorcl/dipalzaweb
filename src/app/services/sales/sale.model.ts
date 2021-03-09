/**
 * Corresponde a un item del listado de ventas pendientes en la BD
 */
export interface ISalesModel {
    rut: string;
    codigo: string;
    nombre: string;
    fecha: Date;
    neto: number;
    descuento: number;
    totalila: number;
    carne: number;
    iva: number;
    codigo_vendedor: string;
    nombre_vendedor: string;
}

export class SalesModel implements ISalesModel {
    constructor(
        public rut: string,
        public codigo: string,
        public nombre: string,
        public fecha: Date,
        public neto: number,
        public descuento: number,
        public totalila: number,
        public carne: number,
        public iva: number,
        public codigo_vendedor: string,
        public nombre_vendedor: string
    ){}
}