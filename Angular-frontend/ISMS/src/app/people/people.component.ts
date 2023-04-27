import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AnnouncementComponent } from '../announcement/announcement.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  allPeople: any;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  nullDisplay = true
  selectedUsers: any = [];
  selectMode = false;
  selectAllUsersToggele = false

  ngOnInit() {
    this.rootService.getAllPeople().subscribe((data: any) => {
      this.allPeople = new MatTableDataSource(data);
      this.allPeople.paginator = this.paginator;
      console.log(data);
    })
  }
  constructor(private dialog: MatDialog, private rootService: RootService, private snackBar: MatSnackBar) { }
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  deleteUser(element: any) {
    this.rootService.LoggedInAdminProfile().subscribe((data:any)=>{
      if(element.role=="ROLE_ADMIN"){
        this.snackBar.open('Cannot delete current logged in Admin', 'Close', { duration: 3000 });
        return;
      }else{
        this.rootService.deleteUser(element).subscribe(
          (data:any)=>{
            if(data.status==true){
              this.rootService.getAllPeople().subscribe((data: any) => {
                this.allPeople = new MatTableDataSource(data);
                this.allPeople.paginator = this.paginator;
              })
              this.snackBar.open("User Deleted successfully", 'Dismiss', { 
                duration: 3000,
              });
            }
          }
        )
      }
    })

  }
  turnOnSelectMode() {
    this.selectMode = !this.selectMode
  }

  selectAllUsers() {
    this.selectAllUsersToggele = !this.selectAllUsersToggele
    if (this.selectAllUsersToggele) {
      this.selectedUsers = [];
      for (let i = 0; i < this.allPeople.data.length; i++) {
        this.selectedUsers.push(this.allPeople.data[i]);
      }
    } else {
      this.selectedUsers = [];
    }
  }

  MakeAnnouncement() {
    const dialogRef = this.dialog.open(AnnouncementComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      const announcementObjs:any = [];
      if (result) {
        console.log(result)
        // Create an object with email and announcement text for each selected user
        this.selectedUsers.forEach((user: any) => {
          const announcementObj = {
            email: user.email,
            userId:user.id,
            announcementTitle: result.title,
            announcementText: result.announcementText
          };
          announcementObjs.push(announcementObj);
        });
      }
      if(announcementObjs.length!=0){
        // trigger the announcements to the backend
        this.rootService.saveAnnouncement(announcementObjs).subscribe(
          (data:any)=>{
            this.snackBar.open("Announcement has been made successfully", 'Dismiss', { 
              duration: 3000,
            });
            console.log(data);
          }
        )
      }
    });
  }
  

  selectUser(user: any) {
    const index = this.selectedUsers.indexOf(user);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1); // user already selected, so unselect
    } else {
      this.selectedUsers.push(user); // user not selected, so select
    }

    console.log(this.selectedUsers)
  }

  isSelected(user: any): boolean {
    return this.selectedUsers.indexOf(user) !== -1;
  }
}
