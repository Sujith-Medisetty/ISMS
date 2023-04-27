import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RootService } from '../root.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeCredentialsDialogComponent } from '../change-credentials-dialog/change-credentials-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  constructor(private rootService: RootService, private snackBar: MatSnackBar, private dialog: MatDialog) {

  }

  datasource: any=[];
  displayedColumns: string[] = ['id','name','email', 'role','actions'];

  ngOnInit(){
    this.rootService.LoggedInAdminProfile().subscribe((data:any)=>{
      console.log(data)
      const array1=[]
      array1.push(data)
      this.datasource = new MatTableDataSource(array1);
    })
  }

  changeCredentials(element: any) {
    const dialogRef = this.dialog.open(ChangeCredentialsDialogComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && (result.name || result.password) && (result.name !== null || result.password !== null)) {
        const formData = {
          id: element.id,
          name: result.name ? result.name : element.name,
          email: element.email,
          role: element.role,
          password: result.password ? result.password : element.password
        };
        console.log("yes")
        console.log(formData);
        // call API with formData
        this.rootService.saveUserDetails(formData).subscribe(
          (data:any)=>{
              console.log(data);
              console.log("successfully done..!");
              const array1=[]
              array1.push(data)
              this.datasource = new MatTableDataSource(array1);
              this.snackBar.open("Profile updated successfully", 'Dismiss', { 
                duration: 3000,
              });
          }
        );

      }
    });
  }
  
}
