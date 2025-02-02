import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../table.component';


@Component({
  selector: 'app-infodialog',
  templateUrl: './infodialog.component.html',
  styleUrls: ['./infodialog.component.scss']
})
export class InfodialogComponent {
readonly dialogRef = inject(MatDialogRef<InfodialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly animal = model('');

  ngOnInit() {
    console.log(this.data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
