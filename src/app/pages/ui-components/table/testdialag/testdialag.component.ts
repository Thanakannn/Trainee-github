import { Component, inject } from '@angular/core';
import {  UserData } from '../table.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-testdialag',
  templateUrl: './testdialag.component.html',
  styleUrls: ['./testdialag.component.scss']
})
export class TestdialagComponent {
  readonly dialogRef = inject(MatDialogRef<TestdialagComponent>);
  readonly data = inject<UserData>(MAT_DIALOG_DATA);
  // readonly animal = model('');

  ngOnInit() {
    console.log(this.data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
