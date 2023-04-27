import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-announcements',
  templateUrl: './user-announcements.component.html',
  styleUrls: ['./user-announcements.component.css']
})
export class UserAnnouncementsComponent {
  allAnnouncements: any = [];
  displayedColumns: string[] = ['email', 'announcementTitle', 'announcementText', 'announcementDateTime'];
  nullDisplay = true

  documentDetails: any;

  constructor(private dialog: MatDialog, private rootService: RootService, private snackBar: MatSnackBar, private datePipe: DatePipe) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.rootService.getAnnouncements().subscribe((data: any) => {
      const formattedData = data.map((announcement: any) => {
        return {
          ...announcement,
          announcementDateTime: this.formatDateTime(announcement.announcementDateTime)
        };
      });
      this.allAnnouncements = new MatTableDataSource(formattedData);
      this.allAnnouncements.paginator = this.paginator;
      console.log(data);
    });
  }

  formatDateTime(dateTime: any) {
    const formattedDate = this.datePipe.transform(dateTime, 'dd MMM yyyy, h:mm a');
    return formattedDate;
  }



  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
}
