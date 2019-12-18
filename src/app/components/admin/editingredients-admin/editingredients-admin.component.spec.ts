import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingredientsAdminComponent } from './editingredients-admin.component';

describe('EditingredientsAdminComponent', () => {
  let component: EditingredientsAdminComponent;
  let fixture: ComponentFixture<EditingredientsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingredientsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingredientsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
