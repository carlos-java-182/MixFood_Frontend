import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterecipeUserComponent } from './createrecipe-user.component';

describe('CreaterecipeUserComponent', () => {
  let component: CreaterecipeUserComponent;
  let fixture: ComponentFixture<CreaterecipeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterecipeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterecipeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
