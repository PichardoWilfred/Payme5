import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPaymentComponent } from './loan-payment.component';

describe('LoanPaymentComponent', () => {
  let component: LoanPaymentComponent;
  let fixture: ComponentFixture<LoanPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
