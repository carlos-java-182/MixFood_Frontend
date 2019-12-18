import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchrecipeGuestComponent } from './searchrecipe-guest.component';

describe('SearchrecipeGuestComponent', () => {
  let component: SearchrecipeGuestComponent;
  let fixture: ComponentFixture<SearchrecipeGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchrecipeGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchrecipeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
