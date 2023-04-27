import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationRequestsComponent } from './user-registration-requests.component';

describe('UserRegistrationRequestsComponent', () => {
  let component: UserRegistrationRequestsComponent;
  let fixture: ComponentFixture<UserRegistrationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
