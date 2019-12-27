import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorResultsComponent } from './paginator-results.component';

describe('PaginatorResultsComponent', () => {
  let component: PaginatorResultsComponent;
  let fixture: ComponentFixture<PaginatorResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
