import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultsGuestComponent } from './searchresults-guest.component';

describe('SearchresultsGuestComponent', () => {
  let component: SearchresultsGuestComponent;
  let fixture: ComponentFixture<SearchresultsGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresultsGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultsGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
