import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallMenuComponent } from './call-menu.component';

describe('CallMenuComponent', () => {
  let component: CallMenuComponent;
  let fixture: ComponentFixture<CallMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
