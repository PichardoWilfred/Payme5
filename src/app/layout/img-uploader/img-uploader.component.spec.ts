import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUploaderComponent } from './img-uploader.component';

describe('ImgUploaderComponent', () => {
  let component: ImgUploaderComponent;
  let fixture: ComponentFixture<ImgUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
