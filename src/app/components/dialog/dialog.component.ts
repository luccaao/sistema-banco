import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { BancoService } from '../../services/banco.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface Transacao {
  createdAt: string;
  tipo: string;
  valor: number;
  day?: number;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  user$!: any;
  transacao$!: Transacao[];
  totalValue: number = 0;

  usuarioAtivo!: any;

  @Output() confirmEvent = new EventEmitter<void>();

  onConfirm() {
    this.confirmEvent.emit();
  }

  constructor(
    private bancoService: BancoService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.user$ = localStorage.getItem('id');
    this.userService.getUserId(this.user$).subscribe((response: any) => {
      this.usuarioAtivo = response;
      console.log(this.usuarioAtivo);
      
    })
    



    this.bancoService.fatura(this.user$).subscribe((response: any) => {
      this.transacao$ = response.transacaos;
    });
  }

  cancel(): void {
    this.dialogRef.close();
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
