export interface IPositionRegister {
    code: string;
    rut: string;
    name: string;
    date: Date;
    latitude: number;
    longitude: number;
    position: string;
    speed?: number;
}

export class PositionRegister implements IPositionRegister {
    constructor(
        public code: string,
        public rut: string,
        public name: string,
        public date: Date,
        public latitude: number,
        public longitude: number,
        public position: string,
        public speed?: number
        ) {}

}