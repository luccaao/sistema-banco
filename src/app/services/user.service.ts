import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  alterarRole(id: any, user$: any) {
    throw new Error('Method not implemented.');
  }
  private API = 'http://localhost:1337/api/users';
  private APIregister = 'http://localhost:1337/api/auth/local/register';
  private APIconta = 'http://localhost:1337/api/contas';

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  matSnakerBar = inject(MatSnackBar);



  isLogged() {
     const logado =  this.tokenService.hasToken();
     return logado
  
  }

  onLogout() {
    this.tokenService.removeToken();
    this.router.navigate(['login']);
  }

  decodificaJWT() {
    const token = this.tokenService.getToken();
    const name = jwtDecode(token!);
    return name;
  }

  getUserId(id: string) {
    return this.httpClient.get(`${this.API}/${id}?populate=*`);
  }

  updateUser(
    id: any,
    usuario: {
      username: string;
      email: string;
      CPF: string;
      sexo: string;
      password: string;
      
    }
  ) {
    const data = {
      
        username: usuario.username,
        email: usuario.email,
        CPF: usuario.CPF,
        sexo: usuario.sexo,
        password: usuario.password,
        
      
    };
    

     this.httpClient
       .put(`${this.API}/${id}`, data)
       .subscribe((response: any) => {
          this.matSnakerBar.open('Dados alterados com sucesso', 'Fechar', {
            duration: 2000,
          });
       });
  }



  criarConta(conta: any) {
    console.log(conta.user.id);

    const data = {
      data: {
        numero: Math.floor(Math.random() * 1000000),
        saldo: 0,
        user: {
          connect: [conta.user.id],
        },
      },
    };

    this.httpClient
      .post(`${this.APIconta}`, data)
      .subscribe((response: any) => {
        console.log(response.data.id);

        this.httpClient
          .put(`${this.APIconta}/${response.data.id}?populate=*`, data)
          .subscribe((response: any) => {
            console.log(response);
          });
      });
  }

  getAllUsers() {
    return this.httpClient.get(`${this.API}?populate=*`);
  }

  criaUsuario(usuario: any) {
    console.log(usuario);

    const data = {
      id: Math.floor(Math.random() * 1000000),
      username: usuario.nome,
      email: usuario.email,
      CPF: usuario.CPF,
      sexo: usuario.sexo,
      password: usuario.password,
    };

    this.httpClient
      .post(`${this.APIregister}`, data)
      .subscribe((response: any) => {
        console.log(response);

        this.criarConta(response);
      });
  }

  


}
