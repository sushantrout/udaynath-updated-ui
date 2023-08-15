import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAllSemTotalComponent } from './download-all-sem-total.component';

describe('DownloadAllSemTotalComponent', () => {
  let component: DownloadAllSemTotalComponent;
  let fixture: ComponentFixture<DownloadAllSemTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAllSemTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAllSemTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
