import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  @Output() confirmEvent = new EventEmitter<void>();

  onConfirm() {
    this.confirmEvent.emit();
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
