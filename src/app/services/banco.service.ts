import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TransacoesService } from './transacoes.service';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  saldoConta = 0;
  saldoTransferencia = 0;
  user$!: any;
  conta$!: any;

  private APIuser = 'http://localhost:1337/api/users';

  private API = `http://localhost:1337/api/contas`;

  private APItransacao = 'http://localhost:1337/api/transacoes';

  matSnackBar = inject(MatSnackBar);

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
    if (this.saldoConta > transacao.valor) {
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
          this.transacaoService.criarTransacao(transacao, this.conta$, 'SAQUE');
          this.matSnackBar.open('Saque realizado com sucesso', 'Fechar', {
            duration: 2000,
          });

          this.matSnackBar._openedSnackBarRef?.onAction().subscribe(() => {
            window.location.reload();
          });
        });
    } else {
      this.matSnackBar.open('Saldo insuficiente', 'Fechar', {
        duration: 2000,
      });
    }
  }

  deposito(transacao: any) {
    this.saldoConta += parseFloat(transacao.valor);

    console.log(this.saldoConta, this.user$, this.conta$);

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
        this.transacaoService.criarTransacao(
          transacao,
          this.conta$,
          'DEPÓSITO'
        );
        window.location.reload();
      });
  }

  transferencia(transacao: any) {
    if (this.saldoConta > transacao.valor) {
      const transacaoE = `TRANSFERÊNCIA ENVIADA PARA CONTA: ${transacao.numeroConta}`;
      this.transacaoService.criarTransacao(transacao, this.conta$, transacaoE);
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
        .subscribe((response: any) => {});

      this.userService.getAllUsers().subscribe((response: any) => {
        response.forEach((element: any) => {
          if (element.conta.numero == transacao.numeroConta) {
            this.saldoTransferencia = parseFloat(element.conta.saldo);
            this.saldoTransferencia += parseFloat(transacao.valor);
            const dataTRANS = {
              data: {
                saldo: this.saldoTransferencia,

                conta: {
                  connect: [element.id],
                },
              },
            };

            this.httpClient
              .put(`${this.API}/${element.conta.id}?populate=*`, dataTRANS)
              .subscribe((response: any) => {
                const transacaoR = `TRANSFERÊNCIA RECEBIDA DA CONTA:  ${this.conta$}`;
                this.transacaoService.criarTransacao(
                  transacao,
                  element.conta.id,
                  transacaoR
                );
                window.location.reload();
              });
          } else {
            console.log('Conta não encontrada');
          }
        });
      });
    } else {
      this.matSnackBar.open('Saldo insuficiente', 'Fechar', {
        duration: 2000,
      });
    }
  }

  fatura(user : any) {
    return this.httpClient.get(`${this.APIuser}/${user}?populate=*`)
  }
}
