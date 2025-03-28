import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordForgetComponent } from './reset-password-forget.component';

describe('ResetPasswordForgetComponent', () => {
  let component: ResetPasswordForgetComponent;
  let fixture: ComponentFixture<ResetPasswordForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordForgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
