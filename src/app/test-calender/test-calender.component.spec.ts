import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCalenderComponent } from './test-calender.component';

describe('TestCalenderComponent', () => {
  let component: TestCalenderComponent;
  let fixture: ComponentFixture<TestCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
