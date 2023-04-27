import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPeopleViewComponent } from './user-people-view.component';

describe('UserPeopleViewComponent', () => {
  let component: UserPeopleViewComponent;
  let fixture: ComponentFixture<UserPeopleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPeopleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPeopleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
