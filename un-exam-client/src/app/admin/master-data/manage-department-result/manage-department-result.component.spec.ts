import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepartmentResultComponent } from './manage-department-result.component';

describe('ManageDepartmentResultComponent', () => {
  let component: ManageDepartmentResultComponent;
  let fixture: ComponentFixture<ManageDepartmentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDepartmentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDepartmentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
