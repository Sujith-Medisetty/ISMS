import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaterialDownloadApprovalRequestsComponent } from './user-material-download-approval-requests.component';

describe('UserMaterialDownloadApprovalRequestsComponent', () => {
  let component: UserMaterialDownloadApprovalRequestsComponent;
  let fixture: ComponentFixture<UserMaterialDownloadApprovalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMaterialDownloadApprovalRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMaterialDownloadApprovalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
