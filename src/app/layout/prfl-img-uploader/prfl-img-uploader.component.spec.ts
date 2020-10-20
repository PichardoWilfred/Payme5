import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrflImgUploaderComponent } from './prfl-img-uploader.component';

describe('PrflImgUploaderComponent', () => {
  let component: PrflImgUploaderComponent;
  let fixture: ComponentFixture<PrflImgUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrflImgUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrflImgUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
