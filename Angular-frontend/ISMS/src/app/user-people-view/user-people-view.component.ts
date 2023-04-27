import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-people-view',
  templateUrl: './user-people-view.component.html',
  styleUrls: ['./user-people-view.component.css']
})
export class UserPeopleViewComponent {

  allPeople: any;
  displayedColumns: string[] = ['name', 'email', 'role'];
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


}
