import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { RootService } from '../root.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
 
@Component({
  selector: 'app-user-registration-requests',
  templateUrl: './user-registration-requests.component.html',
  styleUrls: ['./user-registration-requests.component.css']
})
export class UserRegistrationRequestsComponent {

userRegistrationRequests:any=[];
displayedColumns: string[] = ['UserName', 'NickName', 'actions'];
nullDisplay=true

ngOnInit(){
  this.rootservice.getAllUserRegistrationRequests().subscribe((data:any)=>{
    this.userRegistrationRequests=new MatTableDataSource(data);
    this.userRegistrationRequests.paginator=this.paginator;
    this.userRegistrationRequests.sort=this.sort;
    console.log(this.userRegistrationRequests)
  })
}
@ViewChild(MatSort) sort: MatSort | undefined;
@ViewChild(MatPaginator) paginator: MatPaginator | undefined;

constructor( private rootservice: RootService, private snackBar: MatSnackBar){

}
approveUser(element:any) {
  this.rootservice.approveUserRegistrationRequest(element).subscribe((data:any) => {
    this.userRegistrationRequests=new MatTableDataSource(data);
    this.snackBar.open('UserAccount Activated Successfully..!', 'Dismiss', { 
      duration: 3000,
    });

  },
  (error)=>{
    this.snackBar.open('Encountered some problem in activating the user account..! Pls Try after sometime', 'Dismiss', { 
      duration: 7000,
    });
  });
}

deleteUser(element:any) {
  this.rootservice.deleteUserRegistrationRequest(element).subscribe((data:any) => {
    this.userRegistrationRequests=new MatTableDataSource(data);
    this.snackBar.open('UserAccount Activation Denied Successfully..!', 'Dismiss', { 
      duration: 3000,
    });
  },
  (error)=>{
    this.snackBar.open('Encountered some problem while rejecting the access to user account..! Pls Try after sometime', 'Dismiss', { 
      duration: 7000,
    });
  }
  );
}
}
