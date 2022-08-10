import { FormaPagamento } from './forma-pagamento';
import { Favorecido } from './favorecido';
import { CartaoCredito } from './cartao-credito';
import { ContaCorrente } from './conta-corrente';
export interface Conta {
  idConta?: number | undefined
  nome: string
  dataAbertura: Date
  valorSaldoAbertura: number
  saldo: number
  codigoIntegracao: string
  visivel: boolean
  saldoContas: number
  saldoFluxoCaixa: number
  taxaCartao: number
  prazoPagamentoDiaUtil: number
  prazoPagamentoDiaCorrido: number
  tipo: {
    id: number
    codigo: string
    descricao: string
  }
  status: {
    id: number
    codigo: string
    descricao: string
  }
  contaCorrente: ContaCorrente
  cartaoCredito: CartaoCredito
  tipoFormaPagamentos?: FormaPagamento[]
  favorecido?: Favorecido | null
}
