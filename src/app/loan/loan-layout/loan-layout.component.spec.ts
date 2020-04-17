import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanLayoutComponent } from './loan-layout.component';

describe('LoanLayoutComponent', () => {
  let component: LoanLayoutComponent;
  let fixture: ComponentFixture<LoanLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
