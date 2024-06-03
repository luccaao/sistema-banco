import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css',
})
export class MinhaContaComponent {

  hide = true;
  user$!: any;


  usuario : {
    nome: string;
    email: string;
    cpf: string;
    sexo: string;
    password: string;
  } = {
    nome: '',
    email: '',
    cpf: '',
    sexo: '',
    password: ''
  }
  

  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isLogged()) {
      this.router.navigate(['']);
    }

    this.user$ = this.userService.decodificaJWT();
    this.userService.getUserId(this.user$.id).subscribe((response: any) => {
      this.user$ = response;
    });
  }

   alterarDados() {
     console.log(this.usuario);
      this.userService.updateUser(this.user$.id, this.usuario)
     
   }

  
}
