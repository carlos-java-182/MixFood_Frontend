import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesUserComponent } from './recipes-user.component';

describe('RecipesUserComponent', () => {
  let component: RecipesUserComponent;
  let fixture: ComponentFixture<RecipesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
