import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCredentialsDialogComponent } from './change-credentials-dialog.component';

describe('ChangeCredentialsDialogComponent', () => {
  let component: ChangeCredentialsDialogComponent;
  let fixture: ComponentFixture<ChangeCredentialsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCredentialsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
