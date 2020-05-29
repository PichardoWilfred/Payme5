import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorFormComponent } from './guarantor-form.component';

describe('GuarantorFormComponent', () => {
  let component: GuarantorFormComponent;
  let fixture: ComponentFixture<GuarantorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
