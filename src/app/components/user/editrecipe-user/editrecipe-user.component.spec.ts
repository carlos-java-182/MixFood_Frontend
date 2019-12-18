import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrecipeUserComponent } from './editrecipe-user.component';

describe('EditrecipeUserComponent', () => {
  let component: EditrecipeUserComponent;
  let fixture: ComponentFixture<EditrecipeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrecipeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrecipeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
