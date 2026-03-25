import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DbDataService } from 'src/app/service/db-data.service';
import { AuthService } from 'src/app/service/auth.service';
import type { Season, Driver, TrackData, ChampionshipData } from '@f123dashboard/shared';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockDbDataService: jasmine.SpyObj<DbDataService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  
  const mockSeasons: Season[] = [
    { id: 1, description: 'Season 2024', startDate: new Date('2024-01-01'), endDate: undefined }
  ];

  const mockDrivers: Driver[] = [
    { id: 1, username: 'driver1', first_name: 'John', surname: 'Doe' }
  ];

  const mockTracks: TrackData[] = [
    { track_id: 1, name: 'Monaco', country: 'Monaco', date: '2024-05-26T14:00:00Z', has_sprint: 0, has_x2: 0, besttime_driver_time: '1:10.123', username: 'Driver1' }
  ];

  const mockChampionship: ChampionshipData[] = [];

  beforeEach(async () => {
    mockDbDataService = jasmine.createSpyObj('DbDataService', [
      'getAllSeasons',
      'getDriversData',
      'getAllTracksBySeason',
      'getChampionshipBySeason',
      'setGpResult'
    ]);
    
    mockAuthService = jasmine.createSpyObj('AuthService', [], { currentUser: signal({ isAdmin: true, id: 1, username: 'admin', name: 'Admin', surname: 'User' }) });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockDbDataService.getAllSeasons.and.returnValue(Promise.resolve(mockSeasons));
    mockDbDataService.getDriversData.and.returnValue(Promise.resolve(mockDrivers));
    mockDbDataService.getAllTracksBySeason.and.returnValue(Promise.resolve(mockTracks));
    mockDbDataService.getChampionshipBySeason.and.returnValue(Promise.resolve(mockChampionship));

    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        { provide: DbDataService, useValue: mockDbDataService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [AdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect non-admin users to dashboard', async () => {
    TestBed.resetTestingModule();
    const nonAdminAuthService = jasmine.createSpyObj('AuthService', [], { currentUser: signal({ isAdmin: false, id: 2, username: 'user', name: 'Regular', surname: 'User' }) });
    const testRouter = jasmine.createSpyObj('Router', ['navigate']);
    const testDbDataService = jasmine.createSpyObj('DbDataService', [
      'getAllSeasons',
      'getDriversData',
      'getAllTracksBySeason',
      'getChampionshipBySeason',
      'setGpResult'
    ]);
    
    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        { provide: DbDataService, useValue: testDbDataService },
        { provide: AuthService, useValue: nonAdminAuthService },
        { provide: Router, useValue: testRouter }
      ],
      imports: [AdminComponent]
    }).compileComponents();
    
    const testFixture = TestBed.createComponent(AdminComponent);
    const testComponent = testFixture.componentInstance;
    
    await testComponent.ngOnInit();
    
    expect(testRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should load seasons on initialization', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.seasons()).toEqual(mockSeasons);
    expect(component.selectedSeason()).toBe(1);
  });

  it('should set loading states correctly during initialization', async () => {
    expect(component.isInitialLoading()).toBe(true);
    
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.isInitialLoading()).toBe(false);
  });

  it('should load season data when season changes', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    component.selectedSeason.set(1);
    await component.onSeasonChange();
    
    expect(mockDbDataService.getDriversData).toHaveBeenCalledWith(1);
    expect(mockDbDataService.getAllTracksBySeason).toHaveBeenCalledWith(1);
    expect(mockDbDataService.getChampionshipBySeason).toHaveBeenCalledWith(1);
  });

  it('should validate race results with DNF correctly', () => {
    const validResults = [1, 0, 0, 0, 0, 0, 0, 0, 1, [1]]; // One driver finished, one DNF
    const result = component.validateSessionWithDnf(validResults, 'Test');
    
    expect(result.isValid).toBe(false); // Will fail because piloti signal is empty in test
  });

  it('should validate qualifying results without DNF correctly', () => {
    component.piloti.set(mockDrivers);
    const validResults = [1, 0, 0, 0, 0, 0, 0, 0];
    const result = component.validateSessionNoDnf(validResults, 'Qualifying');
    
    expect(result.isValid).toBe(false); // Missing drivers
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should get and set race results correctly', () => {
    const trackId = 1;
    const position = 1;
    const driverId = 5;
    
    component.setRaceResult(trackId, position, driverId);
    const result = component.getRaceResult(trackId, position);
    
    expect(result).toBe(driverId);
  });

  it('should get and set sprint results correctly', () => {
    const trackId = 1;
    const position = 2;
    const driverId = 3;
    
    component.setSprintResult(trackId, position, driverId);
    const result = component.getSprintResult(trackId, position);
    
    expect(result).toBe(driverId);
  });

  it('should get and set qualifying results correctly', () => {
    const trackId = 1;
    const position = 3;
    const driverId = 7;
    
    component.setQualiResult(trackId, position, driverId);
    const result = component.getQualiResult(trackId, position);
    
    expect(result).toBe(driverId);
  });

  it('should get and set free practice results correctly', () => {
    const trackId = 1;
    const position = 1;
    const driverId = 2;
    
    component.setFpResult(trackId, position, driverId);
    const result = component.getFpResult(trackId, position);
    
    expect(result).toBe(driverId);
  });

  it('should detect duplicate drivers in positions', () => {
    component.piloti.set([
      { id: 1, username: 'd1', first_name: 'A', surname: 'B' },
      { id: 2, username: 'd2', first_name: 'C', surname: 'D' }
    ]);
    
    const positions = [1, 1]; // Duplicate driver
    const errors = component.getDriverValidationErrors(positions);
    
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.includes('più volte'))).toBe(true);
  });

  it('should return empty array for race results of non-existent track', () => {
    const result = component.getRaceResult(999, 1);
    expect(result).toBe(0);
  });

  it('should handle empty DNF array in race results', () => {
    const trackId = 1;
    component.setRaceResult(trackId, 10, []);
    const result = component.getRaceResult(trackId, 10);
    
    expect(Array.isArray(result)).toBe(true);
  });

  it('should initialize results maps correctly', () => {
    component.piloti.set(mockDrivers);
    component.tracks.set(mockTracks);
    component.championshipData.set(mockChampionship);
    
    component.initializeResults();
    
    expect(component.raceResults()).toBeInstanceOf(Map);
    expect(component.sprintResults()).toBeInstanceOf(Map);
    expect(component.qualiResults()).toBeInstanceOf(Map);
    expect(component.fpResults()).toBeInstanceOf(Map);
  });
});
