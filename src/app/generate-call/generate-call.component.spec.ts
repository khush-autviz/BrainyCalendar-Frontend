import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCallComponent } from './generate-call.component';

describe('GenerateCallComponent', () => {
  let component: GenerateCallComponent;
  let fixture: ComponentFixture<GenerateCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
