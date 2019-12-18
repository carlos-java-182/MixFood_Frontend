import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesGuestComponent } from './categories-guest.component';

describe('CategoriesGuestComponent', () => {
  let component: CategoriesGuestComponent;
  let fixture: ComponentFixture<CategoriesGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
