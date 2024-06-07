import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private API = 'http://localhost:1337/api/produtos';
  private APIuser = 'http://localhost:1337/api/users';

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  getProdutos() : Observable<any>{
    return this.httpClient.get<any>(this.API);
  }
}
