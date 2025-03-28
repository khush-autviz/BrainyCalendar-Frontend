import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerPropertyComponent } from './broker-property.component';

describe('BrokerPropertyComponent', () => {
  let component: BrokerPropertyComponent;
  let fixture: ComponentFixture<BrokerPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
