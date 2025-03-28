import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTransactionComponent } from './billing-transaction.component';

describe('BillingTransactionComponent', () => {
  let component: BillingTransactionComponent;
  let fixture: ComponentFixture<BillingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
