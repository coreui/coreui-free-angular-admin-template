import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of, throwError, delay } from 'rxjs';

import { GpEditComponent } from './gp-edit.component';
import { GpEditService } from '../../../service/gp-edit.service';
import type { GPEditItem } from '@f123dashboard/shared';

describe('GpEditComponent', () => {
  let component: GpEditComponent;
  let fixture: ComponentFixture<GpEditComponent>;
  let mockGpEditService: jasmine.SpyObj<GpEditService>;

  const mockGpData: GPEditItem[] = [
    {
      id: 1,
      track_id: 1,
      track_name: 'Monaco',
      date: new Date('2024-05-26T14:00:00Z'),
      has_sprint: false,
      has_x2: false
    }
  ];

  const mockTracks = [
    { id: 1, name: 'Monaco' },
    { id: 2, name: 'Silverstone' }
  ];

  beforeEach(async () => {
    mockGpEditService = jasmine.createSpyObj('GpEditService', [
      'getUpcomingGps',
      'getAllTracks',
      'bulkUpdateGpDate',
      'createGp',
      'updateGp',
      'deleteGp'
    ]);

    mockGpEditService.getUpcomingGps.and.returnValue(of({ success: true, data: mockGpData }));
    mockGpEditService.getAllTracks.and.returnValue(of({ success: true, data: mockTracks }));
    mockGpEditService.bulkUpdateGpDate.and.returnValue(of({ success: true }));
    mockGpEditService.createGp.and.returnValue(of({ success: true, data: mockGpData[0] }));
    mockGpEditService.updateGp.and.returnValue(of({ success: true }));
    mockGpEditService.deleteGp.and.returnValue(of({ success: true }));

    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        { provide: GpEditService, useValue: mockGpEditService }
      ],
      imports: [GpEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load GPs on initialization', () => {
    expect(mockGpEditService.getUpcomingGps).toHaveBeenCalled();
    expect(component.gps().length).toBe(1);
    expect(component.gps()[0].track_name).toBe('Monaco');
  });

  it('should load tracks on initialization', () => {
    expect(mockGpEditService.getAllTracks).toHaveBeenCalled();
    expect(component.tracks().length).toBe(2);
  });

  it('should format dates correctly for datetime-local input', () => {
    expect(component.gps()[0].date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it('should set loading state when loading data', () => {
    // Setup async observable to simulate real API call
    mockGpEditService.getUpcomingGps.and.returnValue(
      of({ success: true, data: mockGpData }).pipe(delay(10))
    );
    
    component.loading.set(false);
    component.loadData();
    
    // Check loading state immediately after calling loadData
    expect(component.loading()).toBe(true);
  });

  it('should handle error when loading GPs', () => {
    mockGpEditService.getUpcomingGps.and.returnValue(throwError(() => new Error('Load error')));
    
    component.loadData();
    fixture.detectChanges();
    
    expect(component.loading()).toBe(false);
  });

  it('should add toast correctly', () => {
    component.addToast('Test Title', 'Test Message', 'success');
    
    expect(component.toasts().length).toBe(1);
    expect(component.toasts()[0].title).toBe('Test Title');
    expect(component.toasts()[0].message).toBe('Test Message');
    expect(component.toasts()[0].color).toBe('success');
  });

  it('should remove toast when visibility changes to false', () => {
    const toast = { title: 'Test', message: 'Message', color: 'info' };
    component.toasts.set([toast]);
    
    component.onToastVisibleChange(false, toast);
    
    expect(component.toasts().length).toBe(0);
  });

  it('should show confirmation modal with correct data', () => {
    const testAction = jasmine.createSpy('testAction');
    
    component.showConfirmation('Test Title', 'Test Message', testAction);
    
    expect(component.modalVisible()).toBe(true);
    expect(component.modalTitle()).toBe('Test Title');
    expect(component.modalMessage()).toBe('Test Message');
  });

  it('should execute pending action on confirm', () => {
    const testAction = jasmine.createSpy('testAction');
    component.showConfirmation('Title', 'Message', testAction);
    
    component.onConfirmAction();
    
    expect(testAction).toHaveBeenCalled();
    expect(component.modalVisible()).toBe(false);
  });

  it('should clear pending action on cancel', () => {
    const testAction = jasmine.createSpy('testAction');
    component.showConfirmation('Title', 'Message', testAction);
    
    component.onCancelAction();
    
    expect(testAction).not.toHaveBeenCalled();
    expect(component.modalVisible()).toBe(false);
  });

  it('should not update if bulk form is invalid', () => {
    component.bulkForm.patchValue({ daysOffset: null });
    
    component.onBulkUpdate();
    
    expect(mockGpEditService.bulkUpdateGpDate).not.toHaveBeenCalled();
  });

  it('should not update if days offset is zero', () => {
    component.bulkForm.patchValue({ daysOffset: 0 });
    
    component.onBulkUpdate();
    
    expect(mockGpEditService.bulkUpdateGpDate).not.toHaveBeenCalled();
  });

  it('should show confirmation before bulk update', () => {
    spyOn(component, 'showConfirmation');
    component.bulkForm.patchValue({ daysOffset: 5 });
    
    component.onBulkUpdate();
    
    expect(component.showConfirmation).toHaveBeenCalled();
  });

  it('should reload data after successful bulk update', (done) => {
    spyOn(component, 'loadData');
    component.bulkForm.patchValue({ daysOffset: 5 });
    
    // Manually call executeBulkUpdate to bypass confirmation
    component['executeBulkUpdate'](5);
    
    setTimeout(() => {
      expect(mockGpEditService.bulkUpdateGpDate).toHaveBeenCalledWith(5);
      expect(component.loadData).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should handle error during bulk update', (done) => {
    mockGpEditService.bulkUpdateGpDate.and.returnValue(throwError(() => new Error('Update error')));
    
    component['executeBulkUpdate'](5);
    
    setTimeout(() => {
      expect(component.loading()).toBe(false);
      expect(component.toasts().some(t => t.color === 'danger')).toBe(true);
      done();
    }, 100);
  });

  it('should not create GP if form is invalid', () => {
    component.createForm.patchValue({ track_id: null, date: '' });
    
    component.onCreate();
    
    expect(mockGpEditService.createGp).not.toHaveBeenCalled();
  });

  it('should create GP with correct data', (done) => {
    component.createForm.patchValue({
      track_id: 1,
      date: '2024-06-01T14:00',
      has_sprint: true,
      has_x2: false
    });
    
    component.onCreate();
    
    setTimeout(() => {
      expect(mockGpEditService.createGp).toHaveBeenCalledWith(jasmine.objectContaining({
        track_id: 1,
        has_sprint: true,
        has_x2: false
      }));
      done();
    }, 100);
  });

  it('should reset form after successful GP creation', (done) => {
    component.createForm.patchValue({
      track_id: 1,
      date: '2024-06-01T14:00',
      has_sprint: true,
      has_x2: false
    });
    
    component.onCreate();
    
    setTimeout(() => {
      expect(component.createForm.value.has_sprint).toBe(false);
      expect(component.createForm.value.has_x2).toBe(false);
      done();
    }, 100);
  });

  it('should show confirmation before deleting GP', () => {
    spyOn(component, 'showConfirmation');
    
    component.onDelete(1);
    
    expect(component.showConfirmation).toHaveBeenCalled();
  });

  it('should delete GP and reload data', (done) => {
    spyOn(component, 'loadData');
    
    component['executeDelete'](1);
    
    setTimeout(() => {
      expect(mockGpEditService.deleteGp).toHaveBeenCalledWith(1);
      expect(component.loadData).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should update GP with correct data', (done) => {
    const gp = {
      id: 1,
      track_id: 1,
      track_name: 'Monaco',
      date: '2024-05-26T14:00',
      has_sprint: false,
      has_x2: true
    };
    
    component.onSave(gp);
    
    setTimeout(() => {
      expect(mockGpEditService.updateGp).toHaveBeenCalledWith(1, jasmine.objectContaining({
        has_sprint: false,
        has_x2: true
      }));
      done();
    }, 100);
  });

  it('should show success toast after saving GP', (done) => {
    const gp = {
      id: 1,
      track_id: 1,
      track_name: 'Monaco',
      date: '2024-05-26T14:00',
      has_sprint: false,
      has_x2: false
    };
    
    component.onSave(gp);
    
    setTimeout(() => {
      expect(component.toasts().some(t => t.color === 'success')).toBe(true);
      done();
    }, 100);
  });

  it('should handle error when saving GP', (done) => {
    mockGpEditService.updateGp.and.returnValue(throwError(() => new Error('Save error')));
    const gp = {
      id: 1,
      track_id: 1,
      track_name: 'Monaco',
      date: '2024-05-26T14:00',
      has_sprint: false,
      has_x2: false
    };
    
    component.onSave(gp);
    
    setTimeout(() => {
      expect(component.toasts().some(t => t.color === 'danger')).toBe(true);
      done();
    }, 100);
  });

  it('should clear pending action when modal visibility changes to false', () => {
    const testAction = jasmine.createSpy('testAction');
    component.showConfirmation('Title', 'Message', testAction);
    
    component.onModalVisibleChange(false);
    
    expect(component.modalVisible()).toBe(false);
  });
});
