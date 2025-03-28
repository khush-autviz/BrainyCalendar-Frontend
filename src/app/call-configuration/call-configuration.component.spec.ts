import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallConfigurationComponent } from './call-configuration.component';

describe('CallConfigurationComponent', () => {
  let component: CallConfigurationComponent;
  let fixture: ComponentFixture<CallConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
