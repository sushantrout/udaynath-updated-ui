import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAdmitCardComponent } from './download-admit-card.component';

describe('DownloadAdmitCardComponent', () => {
  let component: DownloadAdmitCardComponent;
  let fixture: ComponentFixture<DownloadAdmitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAdmitCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAdmitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
