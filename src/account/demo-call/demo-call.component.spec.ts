import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCallComponent } from './demo-call.component';

describe('DemoCallComponent', () => {
  let component: DemoCallComponent;
  let fixture: ComponentFixture<DemoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
