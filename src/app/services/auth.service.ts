import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../types/Usuario.model';
import { Router } from '@angular/router';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:1337/api/auth/local';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  onlogin(usuario: UsuarioLogin) {
    this.httpClient.post(this.API, usuario).subscribe((response : any) => {   
       this.tokenService.setToken(response.jwt)
       this.router.navigate(['home'])
       window.location.reload();
       window.location.href = 'http://localhost:4200/home';
      
    });
  }
}
