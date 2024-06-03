import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  
  private API = 'http://localhost:1337/api/users';

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  isLogged() {
    return this.tokenService.hasToken();
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

  updateUser(id: any, usuario: { nome: string; email: string; cpf: string; sexo: string; password: string; }) {
    const data = {
      data: {
        username: usuario.nome,
        email: usuario.email,
        CPF: usuario.cpf,
        sexo: usuario.sexo,
        password: usuario.password,
      },
    };

    this.httpClient
      .put(`${this.API}/${id}`, data)
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
