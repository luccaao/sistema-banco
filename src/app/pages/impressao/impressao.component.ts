import { Component } from '@angular/core';

@Component({
  selector: 'app-impressao',
  standalone: true,
  imports: [],
  templateUrl: './impressao.component.html',
  styleUrl: './impressao.component.css'
})
export class ImpressaoComponent {



  teste() {
    window.print();
  }
}
