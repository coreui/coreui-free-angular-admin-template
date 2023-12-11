import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadListComponent } from './download-list.component';

describe('DownloadListComponent', () => {
  let component: DownloadListComponent;
  let fixture: ComponentFixture<DownloadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
