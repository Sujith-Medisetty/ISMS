import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-app-health',
  templateUrl: './app-health.component.html',
  styleUrls: ['./app-health.component.css']
})
export class AppHealthComponent {

  appHealth: any = [];
  lastUpdated: any;
  statusArray: any = [];
  dataAvailable: any = false;
  appNavbarHealth:any;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };


  displayedColumns: string[] = ['uri', 'method', 'origin', 'status', 'Content-Type', 'Date', 'timeTaken'];
  nullDisplay = true

  documentDetails: any;

  constructor(private dialog: MatDialog, private rootService: RootService, private snackBar: MatSnackBar, private datePipe: DatePipe) { }

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  pieChartLabels:any;

  pieChartDatasets:any = [{}];

  public pieChartLegend = true;
  public pieChartPlugins = [];



  ngOnInit() {
    this.rootService.actuatorHealth().subscribe((data:any)=>{
      this.appNavbarHealth=data
    })
    this.rootService.actuatorHttpExchanges().subscribe((data: any) => {
      console.log(data)
      this.appHealth = new MatTableDataSource(data["exchanges"]);
      this.appHealth.paginator = this.paginator;
      console.log(data);

      const latestTime = data.exchanges.reduce((acc: any, exchange: any) => {
        const exchangeTime = new Date(exchange.timestamp).getTime();
        return exchangeTime > acc ? exchangeTime : acc;
      }, 0);

      console.log(new Date(latestTime));
      this.lastUpdated = new Date(latestTime)

      var statusObj: any = {};
      [200, 401, 402, 403, 404, 500].forEach(statusCode => {
        const count = data.exchanges.reduce((acc: any, exchange: any) => {
          return exchange.response.status === statusCode ? acc + 1 : acc;
        }, 0);
        statusObj[statusCode] = count;
        this.statusArray.push(statusObj);
        statusObj = {};
      });

      this.pieChartLabels=this.statusArray.map((obj: any) => Number(Object.keys(obj))).flat()
      this.pieChartDatasets[0]["data"]=this.statusArray.map((obj: any) => obj[Object.keys(obj)[0]]).flat()

      this.dataAvailable = true;
    })
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getStatusCount(statusCode: any) {
    console.log(statusCode)
    console.log(this.statusArray)
    return this.statusArray;
  }

  getLastUpdated() {
    return this.lastUpdated;
  }
  getStatusIcon(statusCode: number): string {
    switch (statusCode) {
      case 200:
        return 'check_circle';
      case 401:
      case 402:
      case 403:
      case 404:
        return 'warning';
      case 500:
        return 'error';
      default:
        return '';
    }
  }


  getStatusColor(statusCode: number): string {
    if (statusCode === 200) {
      return 'green';
    } else if (statusCode >= 400 && statusCode < 500) {
      return 'orange';
    } else if (statusCode === 500) {
      return 'red';
    } else {
      return 'blue';
    }
  }

}
