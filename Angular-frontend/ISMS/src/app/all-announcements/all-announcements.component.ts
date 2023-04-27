
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';

@Component({
  selector: 'app-all-announcements',
  templateUrl: './all-announcements.component.html',
  styleUrls: ['./all-announcements.component.css']
})
export class AllAnnouncementsComponent {
  allAnnouncements: any = [];
  displayedColumns: string[] = ['email', 'announcementTitle', 'announcementText', 'announcementDateTime', 'actions'];
  nullDisplay = true

  documentDetails: any;

  constructor(private dialog: MatDialog, private rootService: RootService, private snackBar: MatSnackBar, private datePipe: DatePipe) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.rootService.getAllAnnouncements().subscribe((data: any) => {
      this.allAnnouncements = new MatTableDataSource(data);
      this.allAnnouncements.paginator = this.paginator;
      console.log(data);
    });
  }

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  deleteAnnouncement(element: any) {
    this.rootService.deleteAnnouncement(element).subscribe(
      (data:any)=>{
        if(data.status==true){
          this.fetchData();
          this.snackBar.open("Announcement deleted successfully", 'Dismiss', { 
            duration: 3000,
          });
        }
      }
    )
  }
}

