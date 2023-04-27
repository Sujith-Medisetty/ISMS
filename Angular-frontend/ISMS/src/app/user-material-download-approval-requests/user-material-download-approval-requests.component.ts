import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { RootService } from '../root.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-user-material-download-approval-requests',
  templateUrl: './user-material-download-approval-requests.component.html',
  styleUrls: ['./user-material-download-approval-requests.component.css']
})
export class UserMaterialDownloadApprovalRequestsComponent {
  displayedColumns: string[] = ['id', 'email', 'requestedDateTime', 'actions'];
  displayedColumns2: string[] = ['id', 'email', 'approvedDateTime', 'actions'];
  approvalRequests: any = []
  approvedRequests: any = []

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  @ViewChild('paginator2') paginator2: MatPaginator | undefined;


  constructor(private rootservice: RootService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.rootservice.pendingMaterialApprovalRequests().subscribe(
      (data: any) => {
        console.log(data)
        this.approvalRequests = new MatTableDataSource(data);
        this.approvalRequests.paginator = this.paginator;
        this.approvalRequests.sort = this.sort;
        console.log(this.approvalRequests)
      }
    )
    this.rootservice.approvedMaterialApprovedRequests().subscribe(
      (data: any) => {
        this.approvedRequests = new MatTableDataSource(data);
        this.approvedRequests.paginator = this.paginator2;
        this.approvedRequests.sort = this.sort;
        console.log(this.approvedRequests)
      }
    )
  }

  
  approveRequest(element: any) {

    this.rootservice.approveDownloadMaterialRequest(element).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status == true) {

          this.rootservice.pendingMaterialApprovalRequests().subscribe(
            (data: any) => {
              this.approvalRequests = new MatTableDataSource(data);
              this.approvalRequests.paginator = this.paginator;
              this.approvalRequests.sort = this.sort;
              console.log(this.approvalRequests)
            }
          )
          this.rootservice.approvedMaterialApprovedRequests().subscribe(
            (data: any) => {
              this.approvedRequests = new MatTableDataSource(data);
              this.approvedRequests.paginator = this.paginator2;
              this.approvedRequests.sort = this.sort;
              console.log(this.approvedRequests)
            }
          )

          this.snackBar.open("Request Approved..!", 'Dismiss', { 
            duration: 3000,
          });
        }
      }
    )
  }

  rejectRequest(element: any) {
    this.rootservice.rejectDownloadMaterialRequest(element).subscribe(
      (data:any)=>{
        if(data.status==true){
          this.rootservice.pendingMaterialApprovalRequests().subscribe(
            (data: any) => {
              this.approvalRequests = new MatTableDataSource(data);
              this.approvalRequests.paginator = this.paginator;
              this.approvalRequests.sort = this.sort;
              console.log(this.approvalRequests)
            }
          )
          this.rootservice.approvedMaterialApprovedRequests().subscribe(
            (data: any) => {
              this.approvedRequests = new MatTableDataSource(data);
              this.approvedRequests.paginator = this.paginator2;
              this.approvedRequests.sort = this.sort;
              console.log(this.approvedRequests)
            }
          )
        }
      }
    )

    this.snackBar.open("Request Rejected..!", 'Dismiss', { 
      duration: 3000,
    });
  }
}
