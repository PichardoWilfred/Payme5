import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthToolbarComponent } from './auth-toolbar.component';

describe('AuthToolbarComponent', () => {
  let component: AuthToolbarComponent;
  let fixture: ComponentFixture<AuthToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
