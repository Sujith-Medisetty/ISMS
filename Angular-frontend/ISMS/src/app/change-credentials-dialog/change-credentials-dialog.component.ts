import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-credentials-dialog',
  templateUrl: './change-credentials-dialog.component.html',
  styleUrls: ['./change-credentials-dialog.component.css']
})
export class ChangeCredentialsDialogComponent {
  credentialsForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, Validators.required,),
    name: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    role: new FormControl({ value: '', disabled: true }, Validators.required),
    password: new FormControl({ value: '', disabled: true }, Validators.required)
  });
  
  // Undisable password control
  enablePassword() {
    this.credentialsForm.get('password')?.enable();
  }
  
  // Disable password control
  disablePassword() {
    this.credentialsForm.get('password')?.disable();
  }

    
  // Undisable name control
  enableName() {
    this.credentialsForm.get('name')?.enable();
  }
  
  // Disable name control
  disableName() {
    this.credentialsForm.get('name')?.disable();
  }
  

  constructor(public dialogRef: MatDialogRef<ChangeCredentialsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.credentialsForm.setValue({
      name: null,
      email: data.email,
      role: data.role,
      password: null,
      id: data.id
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }


}
