import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCnrComponent } from './download-cnr.component';

describe('DownloadCnrComponent', () => {
  let component: DownloadCnrComponent;
  let fixture: ComponentFixture<DownloadCnrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCnrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
