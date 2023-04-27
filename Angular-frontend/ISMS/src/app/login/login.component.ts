import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { RootService } from '../root.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReCaptcha2Component, ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm: any;
  adminLoginForm: any;
  final_user = {};
  isUserFormVisible = true;
  isAdminFormVisible = false;

  showUserForm() {
    this.isUserFormVisible = true;
    this.isAdminFormVisible = false;
  }

  showAdminForm() {
    this.isAdminFormVisible = true;
    this.isUserFormVisible = false;
  }

  @ViewChild('userCaptchaElemLogin') userCaptchaElemLogin!: ReCaptcha2Component;
  @ViewChild('adminCaptchaElemLogin') adminCaptchaElemLogin!: ReCaptcha2Component;

  siteKey: string = "6Lfkbb4lAAAAACrtWz9PrPz_5eQDKAcgE77ZjB8M";

  constructor(private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar, private rootService: RootService, private http: HttpClient, private router: Router, private reCaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  onUserSubmit() {
    if (this.userCaptchaElemLogin?.success && this.userLoginForm.valid) {
      // handle user login
      this.rootService.UserLogin(this.userLoginForm?.value).subscribe((message: any) => {
        console.log(message)
        console.log((message as { message: string })["message"]);
        this.router.navigate(['/user-dashboard']);
      },
        (err) => {
          this.snackBar.open("Invalid Credentials", 'Dismiss', {
            duration: 10000,
          });
        }
      )
    } else {
      this.snackBar.open("Please complete the captcha", 'Dismiss', {
        duration: 5000,
      });
    }
  }

  onAdminSubmit() {
    if (this.adminLoginForm.valid && this.adminCaptchaElemLogin?.success) {
      // handle admin login
      this.rootService.AdminLogin(this.adminLoginForm?.value).subscribe(message => {
        console.log(message)
        console.log((message as { message: string })["message"]);
        this.router.navigate(['/admin-dashboard']);
      },
        (err) => {
          this.snackBar.open("Invalid Credentials", 'Dismiss', {
            duration: 10000,
          });
        })
    } else {
      this.snackBar.open("Please complete the captcha", 'Dismiss', {
        duration: 5000,
      });
    }
  }


  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, { width: '450px' });

    dialogRef.componentInstance.formSubmit.subscribe((formData: any) => {
      this.final_user = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'ROLE_USER'
      }

      this.rootService.postUserToRegistry(this.final_user).subscribe(
        (response) => {
          console.log(response);
          // handle success
          this.snackBar.open((response as { message: string })["message"], 'Dismiss', {
            duration: 10000,
          });
        },
        (error) => {
          console.error(error);
          // handle error
        },
      );
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.snackBar.open('Dialog closed', 'Close', {
          duration: 2000
        });
      }
    });
  }
}
