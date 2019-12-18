import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoriesAdminComponent } from './editcategories-admin.component';

describe('EditcategoriesAdminComponent', () => {
  let component: EditcategoriesAdminComponent;
  let fixture: ComponentFixture<EditcategoriesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcategoriesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
