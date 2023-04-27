import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-material',
  templateUrl: './user-material.component.html',
  styleUrls: ['./user-material.component.css']
})
export class UserMaterialComponent {
  isDownloadDisabled:any=true
  allMaterials: any = [];
  RequestStatus = "Request-Download-Matrial-Approval"
  displayedColumns: string[] = ['name', 'description', 'actions'];
  isRequestStatusDisabled = false;
  isUserPresentInSecurityCodesList=false

  documentDetails: any;

  constructor(private dialog: MatDialog, private rootService: RootService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rootService.getAllDocuments().subscribe((data: any) => {
      this.allMaterials = new MatTableDataSource(data);
      this.allMaterials.paginator = this.paginator;
      console.log(data);
    });

    forkJoin([
      this.rootService.isUserInDownloadApprovalWaitingList(),
      this.rootService.isUserInDownloadApprovedList()
    ]).subscribe(([waitingListData, approvedListData]:any) => {
      if (waitingListData.status === true || approvedListData.status === true) {
        this.RequestStatus = "Requested-Download-Matrial-Approval";
        this.isRequestStatusDisabled = true;
      }else{
        this.RequestStatus = "Request-Download-Matrial-Approval";
        this.isRequestStatusDisabled = false;
      }

      if(approvedListData.status===true){
        this.isDownloadDisabled=false;
      }
    });
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

  
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  RequestDownloadMaterialApproval(){
    this.rootService.requestToDownloadMaterial().subscribe(
      (data:any)=>{
        this.rootService.needPageRefresh.next(true)
        console.log(data)
        if(data.message===true){
          console.log("yes")
          this.RequestStatus = "Requested-Download-Matrial-Approval"
          this.isRequestStatusDisabled = true
        }
        this.snackBar.open("Request raised to download the documents..!", 'Dismiss', { 
          duration: 3000,
        });
      }
    )
  }

}
