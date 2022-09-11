import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertElectiveComponent } from './insert-elective.component';

describe('InsertElectiveComponent', () => {
  let component: InsertElectiveComponent;
  let fixture: ComponentFixture<InsertElectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertElectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertElectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
