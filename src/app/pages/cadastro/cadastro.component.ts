import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cadastro',
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
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  hide = true;
  user$!: any;

  selectedCategoria: string = '';

  constructor(private userService: UserService) {}

  formUser = new FormGroup({
    nome: new FormControl(''),
    CPF: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    sexo: new FormControl(''),
  });

  onCategoriaChange($event: any) {
    this.selectedCategoria = $event.target.value;
  }

  submit() {
    console.log(this.formUser.value);
    this.userService.criaUsuario(this.formUser.value);
  }
}
