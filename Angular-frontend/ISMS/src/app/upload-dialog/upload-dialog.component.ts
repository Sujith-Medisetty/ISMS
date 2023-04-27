import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RootService } from '../root.service';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {

  selectedFile: any;
  description: any;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rootService: RootService
  ) { }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('description', this.description);

    this.dialogRef.close("siuccess");

    this.rootService.uploadDocument(formData).subscribe((response: any) => {
      console.log(response);
    });
  }

}
