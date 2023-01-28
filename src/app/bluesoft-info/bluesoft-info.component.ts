import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bluesoft } from '../bluesoft';

@Component({
  selector: 'app-bluesoft-info',
  templateUrl: './bluesoft-info.component.html',
  styleUrls: ['./bluesoft-info.component.css']
})
export class BluesoftInfoComponent {

  constructor(
    public dialogRef: MatDialogRef<BluesoftInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public bluesoft: Bluesoft
  ) { }

  fecharDialog() {
    this.dialogRef.close();
  }
}
