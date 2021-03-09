/**
 * Corresponde a un mensaje del listado de registros de log en la BD
 */
export interface IResultModel {
  id: number
  fecha: Date
  vendedor: string
  tipo: string
  titulo: string
  mensaje: string
  json_parameters: string
}

export class ResultModel implements IResultModel {
  constructor(
    public id: number,
    public fecha: Date,
    public vendedor: string,
    public tipo: string,
    public titulo: string,
    public mensaje: string,
    public json_parameters: string
  ) {}
}
