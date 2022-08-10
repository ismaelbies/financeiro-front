import { Banco } from './banco';

export interface ContaCorrente {
  idContaCorrente? : number | undefined
  nome: string
  banco: Banco
  agencia: number
  contaCorrente: number
  carteiraCobrancas?: number | null
  poupanca: boolean
  limite: number
  agenciaDv: string
  contaCorrenteDv: string
}
