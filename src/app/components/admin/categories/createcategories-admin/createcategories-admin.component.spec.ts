import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecategoriesAdminComponent } from './createcategories-admin.component';

describe('CreatecategoriesAdminComponent', () => {
  let component: CreatecategoriesAdminComponent;
  let fixture: ComponentFixture<CreatecategoriesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecategoriesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
