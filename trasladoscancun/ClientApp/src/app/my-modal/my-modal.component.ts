import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html'
})
export class MyModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>)
  { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}