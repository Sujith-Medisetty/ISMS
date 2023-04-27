import { Component } from '@angular/core';
import { RootService } from '../root.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeCredentialsDialogComponent } from '../change-credentials-dialog/change-credentials-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private rootService: RootService, private snackBar: MatSnackBar, private dialog: MatDialog) {

  }

  datasource: any = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  ngOnInit() {
    this.rootService.LoggedInUserProfile().subscribe((data: any) => {
      console.log(data)
      const array1 = []
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
