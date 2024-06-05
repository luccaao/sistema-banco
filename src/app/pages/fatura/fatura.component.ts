import { Component } from '@angular/core';
import { BancoService } from '../../services/banco.service';

@Component({
  selector: 'app-fatura',
  standalone: true,
  imports: [],
  templateUrl: './fatura.component.html',
  styleUrl: './fatura.component.css'
})
export class FaturaComponent {


  constructor(private bancoService: BancoService) {}

  ngOnInit(): void {
    this.bancoService.fatura()
  }
}
