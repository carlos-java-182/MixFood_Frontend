import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileUserComponent } from './editprofile-user.component';

describe('EditprofileUserComponent', () => {
  let component: EditprofileUserComponent;
  let fixture: ComponentFixture<EditprofileUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofileUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
