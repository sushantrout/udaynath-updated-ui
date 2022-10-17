import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDataByDepartmentComponent } from './download-data-by-department.component';

describe('DownloadDataByDepartmentComponent', () => {
  let component: DownloadDataByDepartmentComponent;
  let fixture: ComponentFixture<DownloadDataByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDataByDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDataByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
