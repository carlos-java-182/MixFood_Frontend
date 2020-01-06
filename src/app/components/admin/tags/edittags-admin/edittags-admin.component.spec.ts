import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittagsAdminComponent } from './edittags-admin.component';

describe('EdittagsAdminComponent', () => {
  let component: EdittagsAdminComponent;
  let fixture: ComponentFixture<EdittagsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittagsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittagsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
