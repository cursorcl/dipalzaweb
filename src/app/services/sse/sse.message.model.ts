
  // información general
  // Message(INFO, título, descripción)
  export const INFO = 'INFO';
  // error en el procesamiento
  // Message(ERROR, título, descripción)
  export const ERROR = 'ERROR';
  // indicador de avance
  // Message(PROGRESS, título, descripción, nro_registro=[nro. registro en proceso], nro_total_registros=[total de registros a procesar])
  export const PROGRESS = 'PROGRESS';
  // mensaje cuando se prcesa una factura
  // Message(BILL, título, descripción, nro_factura=[número de factura], nro_id=[identificador])
  export const BILL = 'BILL';
  // mensaje que indica inicio de procesamiento de vendedor
  // Message(INIT, título, descripción)
  export const INIT = 'INIT';
  // mensaje que indica fin de procesamiento de vendedor
  // Message(FINISH, título, descripción)
  export const FINISH = 'FINISH';
  // mensaje que indica la ausencia de un producto
  // Message(MISSING, título, descripción, requirement_diff=[faltantes], product_code=[código producto])
  export const MISSING = 'MISSING';

export interface ISSEMessageModel {
    code: string;
    type: string;
    title: string;
    description: string;
}

export class SSEMessageModel implements ISSEMessageModel {
    constructor(
        public type: string,
        public code: string,
        public title: string,
        public description: string,
    ){

    }
}