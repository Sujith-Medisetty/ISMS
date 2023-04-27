import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { RootService } from '../root.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  userProfile:any;
  currentTab = '';

  isSmallScreen: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver, private rootservice: RootService, private router: Router, private route: ActivatedRoute) { }

  isLoading = true; // set to true initially

  ngOnInit() {
    this.rootservice.getUserACK().subscribe(
      (data)=>{
        this.isLoading=false;
      },
      error => {
        this.router.navigate(['/'])
        this.isLoading = false; // set the spinner false when the method completes with an error
      }
    )
  } 	

  logout() {
    // Implement your logout logic here
    this.rootservice.AdminAndUserLogout().subscribe(data => {
      // Delete the authToken cookie
      this.rootservice.deleteCookie().subscribe(data=>{
        console.log(data);
      })
      this.router.navigate(['/'])
    }, error => {
      alert("error in logging out the user...!")
    })
  }
  
}
