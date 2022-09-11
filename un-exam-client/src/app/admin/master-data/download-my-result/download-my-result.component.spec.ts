import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMyResultComponent } from './download-my-result.component';

describe('DownloadMyResultComponent', () => {
  let component: DownloadMyResultComponent;
  let fixture: ComponentFixture<DownloadMyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadMyResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
