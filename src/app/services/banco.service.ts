import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacoesService } from './transacoes.service';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  saldoConta = 0;
  user$!: any;

  private API = `http://localhost:1337/api/contas`;

  private APItransacao = 'http://localhost:1337/api/transacoes';

  constructor(
    private httpClient: HttpClient,
    private transacaoService: TransacoesService
  ) {}

  getSaldo(id: string, transacao: any) {
    return this.httpClient
      .get(`${this.API}/${id}`)
      .subscribe((response: any) => {
        this.user$ = id;

        this.saldoConta = parseFloat(response.data.attributes.saldo);

        this.fazerTransacao(transacao, id);
        this.transacaoService.criarTransacao(transacao, id);
      });
  }

  fazerTransacao(transacao: any, id: string) {
    // this.user$ = id
    switch (transacao.categoria) {
      case 'DEPÓSITO':
        return this.deposito(transacao);
      case 'SAQUE':
        return this.saque(transacao);
      case 'TRANSFERÊNCIA':
        return this.transferencia(transacao);
    }
  }

  saque(transacao: any) {
    this.saldoConta -= parseFloat(transacao.valor);

    const data = {
      data: {
        saldo: this.saldoConta,

        user: {
          connect: [this.user$],
        },
      },
    };

    this.httpClient
      .put(`${this.API}/${this.user$}?populate=*`, data)
      .subscribe((response: any) => {
      
        window.location.reload();
        
      });

  }

  deposito(transacao: any) {
    this.saldoConta += parseFloat(transacao.valor);
    console.log(this.saldoConta);
    

    const data = {
      data: {
        saldo: this.saldoConta,

        user: {
          id: this.user$,
          connect: [this.user$],
        },
        contas: {
          
          connect: [this.user$],
        }
      },
    };

    this.httpClient
      .put(`${this.API}/${this.user$}?populate=*`, data)
      .subscribe((response: any) => {
        window.location.reload();
      });

  }

  transferencia(transacao: any) {}
}
