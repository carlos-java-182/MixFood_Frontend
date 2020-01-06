import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusersAdminComponent } from './editusers-admin.component';

describe('EditusersAdminComponent', () => {
  let component: EditusersAdminComponent;
  let fixture: ComponentFixture<EditusersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditusersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditusersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
