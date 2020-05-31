import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorDetailComponent } from './guarantor-detail.component';

describe('GuarantorDetailComponent', () => {
  let component: GuarantorDetailComponent;
  let fixture: ComponentFixture<GuarantorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
