import { Tipo } from "./tipo"

export interface FormaPagamento {
  idTipoFormaPagamento?: number,
  descricao: string,
  status: {
    id? : number,
    codigo: string,
    descricao: string
  },
  tipo: {
    id? : number,
    codigo: string,
    descricao: string
  }
}

