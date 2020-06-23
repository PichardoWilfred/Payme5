import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGuarantorComponent } from './new-guarantor.component';

describe('NewGuarantorComponent', () => {
  let component: NewGuarantorComponent;
  let fixture: ComponentFixture<NewGuarantorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGuarantorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
