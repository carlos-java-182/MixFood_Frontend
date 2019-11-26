import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavabaruserComponent } from './navabaruser.component';

describe('NavabaruserComponent', () => {
  let component: NavabaruserComponent;
  let fixture: ComponentFixture<NavabaruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavabaruserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavabaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
