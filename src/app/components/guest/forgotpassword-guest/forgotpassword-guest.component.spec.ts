import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordGuestComponent } from './forgotpassword-guest.component';

describe('ForgotpasswordGuestComponent', () => {
  let component: ForgotpasswordGuestComponent;
  let fixture: ComponentFixture<ForgotpasswordGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
