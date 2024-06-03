import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacoesService } from './transacoes.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  saldoConta = 0;
  user$!: any;
  conta$!: any;

  private API = `http://localhost:1337/api/contas`;

  private APItransacao = 'http://localhost:1337/api/transacoes';

  constructor(
    private httpClient: HttpClient,
    private transacaoService: TransacoesService,
    private userService: UserService
  ) {}

  getSaldo(transacao: any) {
    this.user$ = this.userService.decodificaJWT();
    this.user$ = this.user$.id;

    this.userService.getUserId(this.user$).subscribe((response: any) => {
      console.log((this.user$ = response));
      this.user$ = response.id;
      this.conta$ = response.conta.id;
      console.log(this.conta$, this.user$);

      this.saldoConta = parseFloat(response.conta.saldo);

      this.fazerTransacao(transacao);
      this.transacaoService.criarTransacao(transacao, this.conta$);
    });
  }

  fazerTransacao(transacao: any) {
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
      .put(`${this.API}/${this.conta$}?populate=*`, data)
      .subscribe((response: any) => {
        window.location.reload();
      });
  }




  deposito(transacao: any) {
    this.saldoConta += parseFloat(transacao.valor);

    console.log(this.saldoConta, this.user$, this.conta$);

    const data = {
      data: {
        saldo: this.saldoConta,

        user: {
          id: this.user$,
          connect: [this.user$],
        },
        contas: {
          connect: [this.conta$],
        },
      },
    };

    this.httpClient
      .put(`${this.API}/${this.conta$}?populate=*`, data)
      .subscribe((response: any) => {
        window.location.reload();
      });
  }

  transferencia(transacao: any) {}
}
