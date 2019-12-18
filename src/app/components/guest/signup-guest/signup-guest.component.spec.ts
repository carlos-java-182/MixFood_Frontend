import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupGuestComponent } from './signup-guest.component';

describe('SignupGuestComponent', () => {
  let component: SignupGuestComponent;
  let fixture: ComponentFixture<SignupGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
