import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAllSemDetailComponent } from './download-all-sem-detail.component';

describe('DownloadAllSemDetailComponent', () => {
  let component: DownloadAllSemDetailComponent;
  let fixture: ComponentFixture<DownloadAllSemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAllSemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAllSemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
