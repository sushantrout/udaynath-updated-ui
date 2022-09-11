import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadByDepartmentComponent } from './download-by-department.component';

describe('DownloadByDepartmentComponent', () => {
  let component: DownloadByDepartmentComponent;
  let fixture: ComponentFixture<DownloadByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadByDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
