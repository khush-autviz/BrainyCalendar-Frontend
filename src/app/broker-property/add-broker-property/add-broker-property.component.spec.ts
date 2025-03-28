import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrokerPropertyComponent } from './add-broker-property.component';

describe('AddBrokerPropertyComponent', () => {
  let component: AddBrokerPropertyComponent;
  let fixture: ComponentFixture<AddBrokerPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrokerPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrokerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
