import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertHonourseComponent } from './insert-honourse.component';

describe('InsertHonourseComponent', () => {
  let component: InsertHonourseComponent;
  let fixture: ComponentFixture<InsertHonourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertHonourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertHonourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
