import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { UsuarioLogin } from '../../types/Usuario.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

      formUser = new FormGroup({
        identifier : new FormControl(''),
        password: new FormControl('')
      })


    constructor(private authService: AuthService) { }

    ngOnInit(): void {

    }



login() {
  console.log(this.formUser.value as UsuarioLogin);
  
  this.authService.onlogin(this.formUser.value as UsuarioLogin);
}

}
