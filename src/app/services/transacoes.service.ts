import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TransacoesService {

  user$! : any;

  private API = `http://localhost:1337/api/contas`;

  private APItransacao = 'http://localhost:1337/api/transacoes';

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  getAllTransacoes(id: string): Observable<any> {
     return this.httpClient.get<any>(`${this.API}/${id}?populate=*`);
  }

  criarTransacao(transacao: any, id: string, tipoC: string) {
    this.user$ =  this.userService.decodificaJWT();
    

    const connect_body = {
      data: {
        valor: transacao.valor,
        tipo: tipoC,
        user: {
          connect: [this.user$.id
          ],
        },
        contas: {
          connect: [id],
        },
      },
    };

    this.httpClient
      .post<any>(`${this.APItransacao}?populate=*`, connect_body)
      .subscribe((response: any) => {
        
        
      });
  }
}
