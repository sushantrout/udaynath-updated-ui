import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAdmitCardByDeptComponent } from './download-admit-card-by-dept.component';

describe('DownloadAdmitCardByDeptComponent', () => {
  let component: DownloadAdmitCardByDeptComponent;
  let fixture: ComponentFixture<DownloadAdmitCardByDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAdmitCardByDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAdmitCardByDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
