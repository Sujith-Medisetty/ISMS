import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaterialComponent } from './user-material.component';

describe('UserMaterialComponent', () => {
  let component: UserMaterialComponent;
  let fixture: ComponentFixture<UserMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
