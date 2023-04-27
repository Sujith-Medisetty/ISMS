import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AllAnnouncementsComponent } from './all-announcements/all-announcements.component';
import { AppHealthComponent } from './app-health/app-health.component';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserMaterialDownloadApprovalRequestsComponent } from './user-material-download-approval-requests/user-material-download-approval-requests.component';
import { UserMaterialComponent } from './user-material/user-material.component';
import { UserRegistrationRequestsComponent } from './user-registration-requests/user-registration-requests.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPeopleViewComponent } from './user-people-view/user-people-view.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { UserAnnouncementsComponent } from './user-announcements/user-announcements.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterDialogComponent },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent, children: [
      { path: '', redirectTo: 'upload-material', pathMatch: 'full' },
      { path: 'user-registration-requests', component: UserRegistrationRequestsComponent },
      { path: 'upload-material', component: DocumentsComponent },
      { path: 'people', component: PeopleComponent },
      { path: 'announcements', component: AllAnnouncementsComponent },
      { path: 'App-Health', component: AppHealthComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: 'download-approval-requests', component: UserMaterialDownloadApprovalRequestsComponent }
    ]
  },
  {
    path: 'user-dashboard', component: UserDashboardComponent, children: [
      { path: '', redirectTo: 'user-material', pathMatch: 'full' },
      { path: 'user-material', component: UserMaterialComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'people', component: UserPeopleViewComponent },
      { path: 'announcements', component: UserAnnouncementsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

