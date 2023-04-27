import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHealthComponent } from './app-health.component';

describe('AppHealthComponent', () => {
  let component: AppHealthComponent;
  let fixture: ComponentFixture<AppHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
