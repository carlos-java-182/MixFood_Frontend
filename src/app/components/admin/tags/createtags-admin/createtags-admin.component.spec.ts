import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetagsAdminComponent } from './createtags-admin.component';

describe('CreatetagsAdminComponent', () => {
  let component: CreatetagsAdminComponent;
  let fixture: ComponentFixture<CreatetagsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetagsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetagsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
