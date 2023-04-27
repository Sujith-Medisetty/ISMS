import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  constructor(
    public dialogRef: MatDialogRef<AnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  announcementForm = new FormGroup({
    title:new FormControl('', Validators.required),
    announcementText: new FormControl('',Validators.required)
  })

  onSubmit(){
    console.log(this.announcementForm)
    // Pass the announcement text to the parent component
    this.dialogRef.close(this.announcementForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
