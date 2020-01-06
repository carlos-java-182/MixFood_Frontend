import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsAdminComponent } from './ingredients-admin.component';

describe('IngredientsAdminComponent', () => {
  let component: IngredientsAdminComponent;
  let fixture: ComponentFixture<IngredientsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
