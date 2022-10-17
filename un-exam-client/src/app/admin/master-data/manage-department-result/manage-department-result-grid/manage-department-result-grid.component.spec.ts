import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepartmentResultGridComponent } from './manage-department-result-grid.component';

describe('ManageDepartmentResultGridComponent', () => {
  let component: ManageDepartmentResultGridComponent;
  let fixture: ComponentFixture<ManageDepartmentResultGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDepartmentResultGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDepartmentResultGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
