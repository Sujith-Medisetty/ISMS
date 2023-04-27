import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnnouncementsComponent } from './user-announcements.component';

describe('UserAnnouncementsComponent', () => {
  let component: UserAnnouncementsComponent;
  let fixture: ComponentFixture<UserAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
