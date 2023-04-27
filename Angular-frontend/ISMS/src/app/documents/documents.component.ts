import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  allMaterials: any = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  nullDisplay = true

  documentDetails: any;

  constructor(private dialog: MatDialog, private rootService: RootService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rootService.getAllDocuments().subscribe((data: any) => {
      this.allMaterials = new MatTableDataSource(data);
      this.allMaterials.paginator = this.paginator;
      console.log(data);
    });
  }
  

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.rootService.getAllDocuments().subscribe((data: any) => {
        this.allMaterials = new MatTableDataSource(data);
        this.allMaterials.paginator = this.paginator;
        console.log(data);
      });
    });

  }

  modifyDocument(element: any) {

  }

  deleteDocument(element: any) {
    this.rootService.deleteDocument(element).subscribe((data:any)=>{
      console.log(data);
      this.allMaterials = new MatTableDataSource(data);
      this.allMaterials.paginator = this.paginator;
      this.snackBar.open("Document deleted successfully", 'Dismiss', { 
        duration: 3000,
      });
    })
  }

  downloadDocument(element: any) {
    this.rootService.downloadDocument(element).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = element.name;
      link.click();
      this.snackBar.open("Document downloaded successfully", 'Dismiss', { 
        duration: 3000,
      });
    }, error => {
      console.error(error);
    });
  }
}
