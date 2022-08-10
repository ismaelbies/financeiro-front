import { ContaCorrente } from './conta-corrente';
export interface CartaoCredito {
  idCartaoCredito?: number | undefined,
  contaCorrente: ContaCorrente,
  nome: string,
  bandeira: string,
  diaFechamento: number,
  diaVencimento: number,
  valorLimiteCredito: number,
  nomeTitular?: string,
  numero?: string,
  numeroFinal?: string,
  codigoSeguranca?: string
}
