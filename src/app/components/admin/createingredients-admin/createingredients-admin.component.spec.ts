import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateingredientsAdminComponent } from './createingredients-admin.component';

describe('CreateingredientsAdminComponent', () => {
  let component: CreateingredientsAdminComponent;
  let fixture: ComponentFixture<CreateingredientsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateingredientsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateingredientsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
