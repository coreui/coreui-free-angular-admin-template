import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent, DriverDataWithGainedPoints } from './dashboard.component';
import { DbDataService } from '../../service/db-data.service';
import { TwitchApiService } from '../../service/twitch-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstructorService } from '../../service/constructor.service';
import { LoadingService } from '../../service/loading.service';
import { signal } from '@angular/core';
import type { Constructor, CumulativePointsData, DriverData, TrackData } from '@f123dashboard/shared';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDbDataService: jasmine.SpyObj<DbDataService>;
  let mockTwitchApiService: jasmine.SpyObj<TwitchApiService>;
  let mockDomSanitizer: jasmine.SpyObj<DomSanitizer>;
  let mockConstructorService: jasmine.SpyObj<ConstructorService>;
  let mockLoadingService: LoadingService;

  const mockDriverData: DriverData[] = [
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_name: 'John',
      driver_surname: 'Doe',
      driver_description: 'Test driver',
      driver_license_pt: 3,
      driver_consistency_pt: 5,
      driver_fast_lap_pt: 3,
      drivers_dangerous_pt: 2,
      driver_ingenuity_pt: 4,
      driver_strategy_pt: 6,
      driver_color: '#FF0000',
      car_name: 'Car1',
      car_overall_score: 80,
      total_sprint_points: 5,
      total_free_practice_points: 10,
      total_qualifying_points: 20,
      total_full_race_points: 0,
      total_race_points: 40,
      total_points: 75
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_name: 'Jane',
      driver_surname: 'Smith',
      driver_description: 'Test driver 2',
      driver_license_pt: 3,
      driver_consistency_pt: 4,
      driver_fast_lap_pt: 2,
      drivers_dangerous_pt: 1,
      driver_ingenuity_pt: 3,
      driver_strategy_pt: 5,
      driver_color: '#0000FF',
      car_name: 'Car2',
      car_overall_score: 75,
      total_sprint_points: 4,
      total_free_practice_points: 8,
      total_qualifying_points: 15,
      total_full_race_points: 0,
      total_race_points: 33,
      total_points: 60
    }
  ];

  const mockTrackData: TrackData[] = [
    {
      track_id: 1,
      date: new Date('2026-03-15').toISOString(),
      name: 'Monaco GP',
      country: 'Monaco',
      besttime_driver_time: '1:12.909',
      username: 'driver1',
      has_sprint: 0,
      has_x2: 0
    },
    {
      track_id: 2,
      date: new Date('2026-04-20').toISOString(),
      name: 'Imola GP',
      country: 'Italy',
      besttime_driver_time: '1:15.484',
      username: 'driver2',
      has_sprint: 1,
      has_x2: 0
    },
    {
      track_id: 3,
      date: new Date('2025-12-01').toISOString(),
      name: 'Abu Dhabi GP',
      country: 'UAE',
      besttime_driver_time: '1:26.103',
      username: 'driver1',
      has_sprint: 0,
      has_x2: 1
    }
  ];

  const mockConstructorData: Constructor[] = [
    {
      constructor_id: 1,
      constructor_name: 'Team Red',
      constructor_color: '#FF0000',
      driver_1_id: 1,
      driver_1_username: 'driver1',
      driver_1_tot_points: 75,
      driver_2_id: 2,
      driver_2_username: 'driver2',
      driver_2_tot_points: 60,
      constructor_tot_points: 135,
      constructor_gained_points: 0
    }
  ];

  const mockCumulativePointsData: CumulativePointsData[] = [
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_color: '#FF0000',
      date: new Date('2026-01-30').toISOString(),
      track_name: 'Track 4',
      cumulative_points: 75
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_color: '#0000FF',
      date: new Date('2026-01-30').toISOString(),
      track_name: 'Track 4',
      cumulative_points: 60
    },
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_color: '#FF0000',
      date: new Date('2026-01-20').toISOString(),
      track_name: 'Track 3',
      cumulative_points: 60
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_color: '#0000FF',
      date: new Date('2026-01-20').toISOString(),
      track_name: 'Track 3',
      cumulative_points: 48
    },
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_color: '#FF0000',
      date: new Date('2026-01-10').toISOString(),
      track_name: 'Track 2',
      cumulative_points: 45
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_color: '#0000FF',
      date: new Date('2026-01-10').toISOString(),
      track_name: 'Track 2',
      cumulative_points: 35
    },
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_color: '#FF0000',
      date: new Date('2026-01-01').toISOString(),
      track_name: 'Track 1',
      cumulative_points: 30
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_color: '#0000FF',
      date: new Date('2026-01-01').toISOString(),
      track_name: 'Track 1',
      cumulative_points: 22
    }
  ];

  beforeEach(async () => {
    // Create a writable signal for testing that can be updated
    const mockIsLiveSignal = signal(false);
    
    mockDbDataService = jasmine.createSpyObj('DbDataService', [
      'getAllDrivers',
      'getAllTracks',
      'getConstructors',
      'getCumulativePoints'
    ]);
    mockTwitchApiService = jasmine.createSpyObj('TwitchApiService', [
      'getChannel',
      'checkStreamStatus'
    ]);
    // Assign the writable signal to the mock (casting as any to allow assignment in tests)
    (mockTwitchApiService as any).isLive = mockIsLiveSignal.asReadonly();
    (mockTwitchApiService as any)._isLiveSignal = mockIsLiveSignal;
    
    mockDomSanitizer = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl'
    ]);
    mockConstructorService = jasmine.createSpyObj('ConstructorService', [
      'calculateConstructorPoints',
      'calculateConstructorGainedPoints'
    ]);
    mockLoadingService = {
      isLoading: signal(false),
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide')
    } as any;

    mockDbDataService.getAllDrivers.and.returnValue(mockDriverData);
    mockDbDataService.getAllTracks.and.returnValue(mockTrackData);
    mockDbDataService.getConstructors.and.returnValue(mockConstructorData);
    mockDbDataService.getCumulativePoints.and.returnValue(mockCumulativePointsData);
    mockTwitchApiService.getChannel.and.returnValue('testchannel');
    mockDomSanitizer.bypassSecurityTrustResourceUrl.and.returnValue('safe-url' as any);
    mockConstructorService.calculateConstructorPoints.and.returnValue(mockConstructorData);
    mockConstructorService.calculateConstructorGainedPoints.and.returnValue(mockConstructorData);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideNoopAnimations(), { provide: DbDataService, useValue: mockDbDataService },
        { provide: TwitchApiService, useValue: mockTwitchApiService },
        { provide: DomSanitizer, useValue: mockDomSanitizer },
        { provide: ConstructorService, useValue: mockConstructorService },
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize all data on component initialization', () => {
      component.ngOnInit();

      expect(mockDbDataService.getAllDrivers).toHaveBeenCalled();
      expect(mockDbDataService.getAllTracks).toHaveBeenCalled();
      expect(mockDbDataService.getConstructors).toHaveBeenCalled();
      expect(mockDbDataService.getCumulativePoints).toHaveBeenCalled();
      expect(component.championship_standings_users().length).toBe(2);
      expect(component.championshipTracks().length).toBe(3);
    });

    it('should initialize Twitch embed when stream is live', () => {
      (mockTwitchApiService as any)._isLiveSignal.set(true);

      component.ngOnInit();

      expect(component.isLive()).toBe(true);
      expect(mockDomSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
    });

    it('should not initialize Twitch embed when stream is not live', () => {
      (mockTwitchApiService as any)._isLiveSignal.set(false);

      component.ngOnInit();

      expect(component.isLive()).toBe(false);
    });

    it('should initialize drivers with gainedPoints calculated from cumulative data', () => {
      component.ngOnInit();

      const drivers = component.championship_standings_users();
      // GainedPoints calculated as: last race (Track 4) - 3rd to last race (Track 2)
      expect(drivers[0].gainedPoints).toBe(30); // 75 - 45
      expect(drivers[1].gainedPoints).toBe(25); // 60 - 35
    });

    it('should calculate next tracks correctly', () => {
      component.ngOnInit();

      const nextTracks = component.championshipNextTracks();
      expect(nextTracks.length).toBe(2);
      expect(nextTracks[0].name).toBe('Monaco GP');
      expect(nextTracks[1].name).toBe('Imola GP');
    });

    it('should map tracks to calendar events', () => {
      component.ngOnInit();

      const events = component.calendarEvents();
      expect(events.length).toBe(3);
      expect(events[0].name).toBe('Monaco GP');
      expect(events[0].description).toContain('Paese: Monaco');
    });

    it('should add sprint indicator to calendar event description', () => {
      component.ngOnInit();

      const events = component.calendarEvents();
      const imolaEvent = events.find(e => e.name === 'Imola GP');
      expect(imolaEvent?.description).toContain('Sprint Race');
    });

    it('should add double points indicator to calendar event description', () => {
      component.ngOnInit();

      const events = component.calendarEvents();
      const abuDhabiEvent = events.find(e => e.name === 'Abu Dhabi GP');
      expect(abuDhabiEvent?.description).toContain('Punti Doppi (x2)');
    });

    it('should calculate constructor points', () => {
      component.ngOnInit();

      expect(mockConstructorService.calculateConstructorPoints).toHaveBeenCalledWith(
        mockConstructorData,
        jasmine.any(Array)
      );
      expect(component.constructors().length).toBe(1);
    });

    it('should calculate driver gained points when sufficient data exists', () => {
      component.ngOnInit();

      const drivers = component.championship_standings_users();
      expect(drivers[0].gainedPoints).toBe(30); // 75 - 45
      expect(drivers[1].gainedPoints).toBe(25); // 60 - 35
      expect(component.showGainedPointsColumn()).toBe(true);
    });

    it('should calculate delta points between consecutive drivers', () => {
      component.ngOnInit();

      const drivers = component.championship_standings_users();
      expect(drivers[1].deltaPoints).toBe(15); // 75 - 60
    });

    it('should calculate driver of the week', () => {
      component.ngOnInit();

      const driverOfWeek = component.driverOfWeek();
      // Calculates from last race (Track 4) to 3rd last race (Track 2)
      // driver1: 75 - 45 = 30 points gained in last 2 races
      expect(driverOfWeek.driver_username).toBe('driver1');
      expect(driverOfWeek.points).toBe(30);
    });

    it('should calculate constructor of the week', () => {
      component.ngOnInit();

      const constructorOfWeek = component.constructorOfWeek();
      // Team Red has driver1 (30 points) + driver2 (25 points) = 55 points in last 2 races
      expect(constructorOfWeek.constructor_name).toBe('Team Red');
      expect(constructorOfWeek.points).toBe(55);
    });
  });

  describe('Pilot Modal', () => {
    it('should open pilot modal with correct data', () => {
      const pilot = mockDriverData[0];
      const position = 1;

      component.openPilotModal(pilot, position);

      expect(component.pilotModalVisible()).toBe(true);
      expect(component.selectedPilot()).toEqual(pilot);
      expect(component.selectedPilotPosition()).toBe(position);
    });

    it('should close pilot modal and clear data', () => {
      component.openPilotModal(mockDriverData[0], 1);
      component.closePilotModal();

      expect(component.pilotModalVisible()).toBe(false);
      expect(component.selectedPilot()).toBeNull();
      expect(component.selectedPilotPosition()).toBe(0);
    });
  });

  describe('Constructor Modal', () => {
    it('should open constructor modal with correct data', () => {
      const constructor = mockConstructorData[0];
      const position = 1;

      component.openConstructorModal(constructor, position);

      expect(component.constructorModalVisible()).toBe(true);
      expect(component.selectedConstructor()).toEqual(constructor);
      expect(component.selectedConstructorPosition()).toBe(position);
    });

    it('should close constructor modal and clear data', () => {
      component.openConstructorModal(mockConstructorData[0], 1);
      component.closeConstructorModal();

      expect(component.constructorModalVisible()).toBe(false);
      expect(component.selectedConstructor()).toBeNull();
      expect(component.selectedConstructorPosition()).toBe(0);
    });
  });

  describe('Result Modal', () => {
    it('should toggle result modal visibility', () => {
      component.toggleResoultModalvisible(1);
      expect(component.resoultModalVisible()).toBe(1);

      component.toggleResoultModalvisible(2);
      expect(component.resoultModalVisible()).toBe(2);

      component.toggleResoultModalvisible(0);
      expect(component.resoultModalVisible()).toBe(0);
    });
  });

  describe('getConstructorForDriver', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should return constructor name for driver1', () => {
      const constructorName = component.getConstructorForDriver('driver1');
      expect(constructorName).toBe('Team Red');
    });

    it('should return constructor name for driver2', () => {
      const constructorName = component.getConstructorForDriver('driver2');
      expect(constructorName).toBe('Team Red');
    });

    it('should return empty string for unknown driver', () => {
      const constructorName = component.getConstructorForDriver('unknown');
      expect(constructorName).toBe('');
    });
  });

  describe('showColumn computed signal', () => {
    it('should return true when screen width is greater than 1600', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920
      });

      const newFixture = TestBed.createComponent(DashboardComponent);
      const newComponent = newFixture.componentInstance;
      expect(newComponent.showColumn()).toBe(true);
    });

    it('should return false when screen width is less than or equal to 1600', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1400
      });

      const newFixture = TestBed.createComponent(DashboardComponent);
      const newComponent = newFixture.componentInstance;
      expect(newComponent.showColumn()).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty driver data', () => {
      mockDbDataService.getAllDrivers.and.returnValue([]);
      mockDbDataService.getCumulativePoints.and.returnValue([]);

      component.ngOnInit();

      expect(component.championship_standings_users().length).toBe(0);
      expect(component.showGainedPointsColumn()).toBe(false);
    });

    it('should handle empty track data', () => {
      mockDbDataService.getAllTracks.and.returnValue([]);

      component.ngOnInit();

      expect(component.championshipTracks().length).toBe(0);
      expect(component.championshipNextTracks().length).toBe(0);
      expect(component.calendarEvents().length).toBe(0);
    });

    it('should handle insufficient cumulative data for gained points calculation', () => {
      const limitedCumulativeData: CumulativePointsData[] = [
        {
          driver_id: 1,
          driver_username: 'driver1',
          driver_color: '#FF0000',
          date: new Date('2026-01-01').toISOString(),
          track_name: 'Track 1',
          cumulative_points: 30
        }
      ];
      mockDbDataService.getCumulativePoints.and.returnValue(limitedCumulativeData);

      component.ngOnInit();

      const drivers = component.championship_standings_users();
      drivers.forEach(driver => {
        expect(driver.gainedPoints).toBe(0);
      });
      expect(component.showGainedPointsColumn()).toBe(false);
    });

    it('should handle constructor with no drivers', () => {
      const emptyConstructor: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Empty Team',
          constructor_color: '#000000',
          driver_1_id: 0,
          driver_1_username: '',
          driver_1_tot_points: 0,
          driver_2_id: 0,
          driver_2_username: '',
          driver_2_tot_points: 0,
          constructor_tot_points: 0,
          constructor_gained_points: 0
        }
      ];
      mockDbDataService.getConstructors.and.returnValue(emptyConstructor);
      mockConstructorService.calculateConstructorPoints.and.returnValue(emptyConstructor);
      mockConstructorService.calculateConstructorGainedPoints.and.returnValue(emptyConstructor);

      component.ngOnInit();

      const constructorName = component.getConstructorForDriver('driver1');
      expect(constructorName).toBe('');
    });
  });
});
