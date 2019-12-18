import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmptestComponent } from './cmptest.component';

describe('CmptestComponent', () => {
  let component: CmptestComponent;
  let fixture: ComponentFixture<CmptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
