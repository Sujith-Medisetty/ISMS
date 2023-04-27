import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CookieService } from 'ngx-cookie-service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AllAnnouncementsComponent } from './all-announcements/all-announcements.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AppHealthComponent } from './app-health/app-health.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRegistrationRequestsComponent } from './user-registration-requests/user-registration-requests.component';  
import { NgChartsModule } from 'ng2-charts';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ChangeCredentialsDialogComponent } from './change-credentials-dialog/change-credentials-dialog.component';
import { UserMaterialComponent } from './user-material/user-material.component';
import { ClipboardModule } from 'ngx-clipboard';
import { UserMaterialDownloadApprovalRequestsComponent } from './user-material-download-approval-requests/user-material-download-approval-requests.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPeopleViewComponent } from './user-people-view/user-people-view.component';
import { UserAnnouncementsComponent } from './user-announcements/user-announcements.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterDialogComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    UserRegistrationRequestsComponent,
    DocumentsComponent,
    UploadDialogComponent,
    PeopleComponent,
    AnnouncementComponent,
    AllAnnouncementsComponent,
    AppHealthComponent,
    AdminProfileComponent,
    ChangeCredentialsDialogComponent,
    UserMaterialComponent,
    UserMaterialDownloadApprovalRequestsComponent,
    UserProfileComponent,
    UserPeopleViewComponent,
    UserAnnouncementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PdfViewerModule,
    MatCardModule,
    NgChartsModule,
    ClipboardModule,
    NgxCaptchaModule
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
