import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { UserService } from '../../services/user.service';

interface Transacao {
  createdAt: string;
  tipo: string;
  valor: number;
  day?: number;
}

@Component({
  selector: 'app-fatura',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css'],
})
export class FaturaComponent {
  user$!: any;
  transacao$!: Transacao[];
  totalValue: number = 0;

  constructor(
    private bancoService: BancoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.decodificaJWT();
    this.bancoService.fatura(this.user$.id).subscribe((response: any) => {
      this.transacao$ = response.transacaos;
      this.transacao$.forEach((transacao) => {
        let date = new Date(transacao.createdAt);
        transacao.day = date.getDate();
      });
    });
  }

  filterTransactions(selectedDay: number) {
    this.bancoService.fatura(this.user$.id).subscribe((response: any) => {
      this.transacao$ = response.transacaos;
      this.transacao$.forEach((transacao) => {
        let date = new Date(transacao.createdAt);
        transacao.day = date.getDate();
      });
      let filteredTransactions = this.transacao$.filter(
        (transacao) => transacao.day === selectedDay
      );

      this.totalValue = filteredTransactions.reduce((sum, transacao) => {
        return sum + Number(transacao.valor);
      }, 0);

      this.transacao$ = filteredTransactions;
    });
  }
}
