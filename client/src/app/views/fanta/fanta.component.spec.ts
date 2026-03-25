import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FantaComponent } from './fanta.component';
import { AuthService } from './../../service/auth.service';
import { DbDataService } from './../../service/db-data.service';
import { FantaService } from './../../service/fanta.service';
import { VOTE_INDEX, FORM_STATUS } from '../../model/fanta';
import type { FantaVote, User, DriverData, TrackData, Constructor } from '@f123dashboard/shared';

describe('FantaComponent', () => {
  let component: FantaComponent;
  let fixture: ComponentFixture<FantaComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockDbDataService: jasmine.SpyObj<DbDataService>;
  let mockFantaService: jasmine.SpyObj<FantaService>;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    name: 'Test',
    surname: 'User',
    isAdmin: false
  };

  const mockDrivers: DriverData[] = [
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_name: 'Driver',
      driver_surname: 'One',
      driver_description: 'Test driver',
      driver_license_pt: 3,
      driver_consistency_pt: 5,
      driver_fast_lap_pt: 3,
      drivers_dangerous_pt: 2,
      driver_ingenuity_pt: 4,
      driver_strategy_pt: 6,
      driver_color: '#FF0000',
      car_name: 'Car 1',
      car_overall_score: 100,
      total_sprint_points: 10,
      total_free_practice_points: 10,
      total_qualifying_points: 20,
      total_full_race_points: 15,
      total_race_points: 30,
      total_points: 85
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_name: 'Driver',
      driver_surname: 'Two',
      driver_description: 'Test driver 2',
      driver_license_pt: 3,
      driver_consistency_pt: 6,
      driver_fast_lap_pt: 4,
      drivers_dangerous_pt: 1,
      driver_ingenuity_pt: 5,
      driver_strategy_pt: 7,
      driver_color: '#00FF00',
      car_name: 'Car 2',
      car_overall_score: 95,
      total_sprint_points: 12,
      total_free_practice_points: 15,
      total_qualifying_points: 25,
      total_full_race_points: 18,
      total_race_points: 35,
      total_points: 105
    }
  ];

  const mockTracks: TrackData[] = [
    {
      track_id: 1,
      name: 'Monaco',
      date: '2026-05-15',
      country: 'Monaco',
      has_sprint: 0,
      has_x2: 0,
      besttime_driver_time: '1:23.456',
      username: 'driver1'
    },
    {
      track_id: 2,
      name: 'Silverstone',
      date: '2026-07-10',
      country: 'United Kingdom',
      has_sprint: 1,
      has_x2: 0,
      besttime_driver_time: '1:24.567',
      username: 'driver2'
    },
    {
      track_id: 3,
      name: 'Monza',
      date: '2026-01-10',
      country: 'Italy',
      has_sprint: 0,
      has_x2: 0,
      besttime_driver_time: '1:22.345',
      username: 'driver1'
    }
  ];

  const mockConstructors: Constructor[] = [
    {
      constructor_id: 1,
      constructor_name: 'Red Bull Racing',
      constructor_color: '#0600EF',
      driver_1_id: 1,
      driver_1_username: 'driver1',
      driver_1_tot_points: 100,
      driver_2_id: 2,
      driver_2_username: 'driver2',
      driver_2_tot_points: 90,
      constructor_tot_points: 190
    },
    {
      constructor_id: 2,
      constructor_name: 'Ferrari',
      constructor_color: '#DC0000',
      driver_1_id: 3,
      driver_1_username: 'driver3',
      driver_1_tot_points: 85,
      driver_2_id: 4,
      driver_2_username: 'driver4',
      driver_2_tot_points: 80,
      constructor_tot_points: 165
    }
  ];

  const mockFantaVote: FantaVote = {
    fanta_player_id: 1,
    username: 'testuser',
    track_id: 1,
    id_1_place: 1,
    id_2_place: 2,
    id_3_place: 3,
    id_4_place: 4,
    id_5_place: 5,
    id_6_place: 6,
    id_7_place: 7,
    id_8_place: 8,
    id_fast_lap: 1,
    id_dnf: 2,
    constructor_id: 1
  };

  beforeEach(async () => {
    // Mock services
    mockAuthService = jasmine.createSpyObj('AuthService', [], { currentUser: signal(mockUser) });
    mockDbDataService = jasmine.createSpyObj('DbDataService', [
      'getAllDrivers',
      'getAllTracks',
      'getConstructors',
      'getAvatarSrc',
      'getUsers', // For backwards compatibility
      'users' // Signal method used by LeaderboardComponent
    ]);
    mockFantaService = jasmine.createSpyObj('FantaService', [
      'getFantaVote',
      'setFantaVote',
      'getFantaPoints',
      'getTotNumberVotes', // For LeaderboardComponent
      'getFantaNumberVotes', // For LeaderboardComponent (per user)
      'getRaceResult', // For VoteHistoryTableComponent
      'isDnfCorrect', // For VoteHistoryTableComponent
      'pointsWithAbsoluteDifference', // For VoteHistoryTableComponent
      'getCorrectResponsePointFastLap', // For VoteHistoryTableComponent
      'getCorrectResponsePointDnf', // For VoteHistoryTableComponent
      'getWinningConstructorsForTrack', // For VoteHistoryTableComponent
      'getCorrectResponsePointTeam', // For VoteHistoryTableComponent
      'getFantaRacePoints' // For VoteHistoryTableComponent
    ]);

    // Setup default spy returns
    mockDbDataService.getAllDrivers.and.returnValue(mockDrivers);
    mockDbDataService.getAllTracks.and.returnValue(mockTracks);
    mockDbDataService.getConstructors.and.returnValue(mockConstructors);
    mockDbDataService.getAvatarSrc.and.returnValue('assets/images/default-avatar.png');
    mockDbDataService.getUsers.and.returnValue([mockUser]); // For backwards compatibility
    mockDbDataService.users.and.returnValue([mockUser]); // Signal method used by LeaderboardComponent
    mockFantaService.getFantaVote.and.returnValue(undefined);
    mockFantaService.setFantaVote.and.returnValue(Promise.resolve());
    mockFantaService.getFantaPoints.and.returnValue(100);
    mockFantaService.getTotNumberVotes.and.returnValue(10); // For LeaderboardComponent
    mockFantaService.getFantaNumberVotes.and.returnValue(5); // For LeaderboardComponent (per user)
    mockFantaService.getRaceResult.and.returnValue(undefined); // For VoteHistoryTableComponent
    mockFantaService.isDnfCorrect.and.returnValue(false); // For VoteHistoryTableComponent
    mockFantaService.pointsWithAbsoluteDifference.and.returnValue(0); // For VoteHistoryTableComponent
    mockFantaService.getCorrectResponsePointFastLap.and.returnValue(5); // For VoteHistoryTableComponent
    mockFantaService.getCorrectResponsePointDnf.and.returnValue(5); // For VoteHistoryTableComponent
    mockFantaService.getWinningConstructorsForTrack.and.returnValue([]); // For VoteHistoryTableComponent
    mockFantaService.getCorrectResponsePointTeam.and.returnValue(10); // For VoteHistoryTableComponent
    mockFantaService.getFantaRacePoints.and.returnValue(0); // For VoteHistoryTableComponent

    // Setup sessionStorage
    sessionStorage.setItem('user', JSON.stringify(mockUser));

    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: DbDataService, useValue: mockDbDataService },
        { provide: FantaService, useValue: mockFantaService }
      ],
      imports: [FantaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FantaComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with correct dependencies', () => {
      expect(component.authService).toBeTruthy();
      expect(component.fantaService).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    it('should load user from session storage', () => {
      fixture.detectChanges();
      expect(component.user()).toEqual(mockUser);
    });

    it('should load drivers, tracks, and constructors', () => {
      fixture.detectChanges();
      expect(mockDbDataService.getAllDrivers).toHaveBeenCalled();
      expect(mockDbDataService.getAllTracks).toHaveBeenCalled();
      expect(mockDbDataService.getConstructors).toHaveBeenCalled();
      expect(component.piloti()).toEqual(mockDrivers);
      expect(component.tracks()).toEqual(mockTracks);
    });

    it('should filter tracks into next and previous', () => {
      fixture.detectChanges();
      expect(component.nextTracks().length).toBe(2); // Monaco and Silverstone are in the future
      expect(component.previusTracks().length).toBe(1); // Monza is in the past
    });

    it('should load previous votes for all tracks', () => {
      mockFantaService.getFantaVote.and.returnValue(mockFantaVote);
      fixture.detectChanges();
      expect(mockFantaService.getFantaVote).toHaveBeenCalled();
    });
  });

  describe('Vote Management', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should set vote correctly', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      expect(component.getVoto(1, 1)).toBe(5);
    });

    it('should get vote correctly', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      expect(component.getVoto(1, 1)).toBe(5);
    });

    it('should return 0 for non-existent vote', () => {
      expect(component.getVoto(999, 1)).toBe(0);
    });

    it('should get all votes for a track', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      component.setVoto(1, 2, 6, mockForm);
      const votes = component.getVoti(1);
      expect(votes).toBeDefined();
      expect(votes![0]).toBe(5);
      expect(votes![1]).toBe(6);
    });

    it('should get vote position for a driver', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      component.setVoto(1, 2, 6, mockForm);
      expect(component.getVotoPos(1, 5)).toBe(1);
      expect(component.getVotoPos(1, 6)).toBe(2);
    });

    it('should return 0 for driver not in vote list', () => {
      expect(component.getVotoPos(1, 999)).toBe(0);
    });

    it('should reset form status when vote is changed after success', () => {
      const mockForm = { valid: true } as NgForm;
      component['formStatusSignal'].set({ 1: FORM_STATUS.SUCCESS });
      component.setVoto(1, 1, 5, mockForm);
      expect(component.formStatus()[1]).toBeUndefined();
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return false for empty form', () => {
      expect(component.formIsValid(1)).toBe(false);
    });

    it('should return false for incomplete form', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      expect(component.formIsValid(1)).toBe(false);
    });

    it('should return false for duplicate driver votes', () => {
      const mockForm = { valid: true } as NgForm;
      // Set all required fields
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 1, mockForm); // Duplicate driver ID
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm); // Fast lap
      component.setVoto(1, 10, 2, mockForm); // DNF
      component.setVoto(1, 11, 1, mockForm); // Constructor
      expect(component.formIsValid(1)).toBe(false);
    });

    it('should return true for complete and valid form', () => {
      const mockForm = { valid: true } as NgForm;
      // Set all required fields with unique driver IDs
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm); // Fast lap (can be duplicate)
      component.setVoto(1, 10, 2, mockForm); // DNF (can be duplicate)
      component.setVoto(1, 11, 1, mockForm); // Constructor
      expect(component.formIsValid(1)).toBe(true);
    });
  });

  describe('Publishing Votes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not publish invalid form', async () => {
      const mockForm = { valid: false } as NgForm;
      await component.publishVoto(1, mockForm);
      expect(mockFantaService.setFantaVote).not.toHaveBeenCalled();
      expect(component.formStatus()[1]).toBe(FORM_STATUS.VALIDATION_ERROR);
    });

    it('should publish valid vote successfully', async () => {
      const mockForm = { valid: true } as NgForm;
      // Set up a complete valid vote
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm);
      component.setVoto(1, 10, 2, mockForm);
      component.setVoto(1, 11, 1, mockForm);

      await component.publishVoto(1, mockForm);
      expect(mockFantaService.setFantaVote).toHaveBeenCalled();
      expect(component.formStatus()[1]).toBe(FORM_STATUS.SUCCESS);
    });

    it('should set loading state during publish', async () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm);
      component.setVoto(1, 10, 2, mockForm);
      component.setVoto(1, 11, 1, mockForm);

      let loadingDuringCall = false;
      mockFantaService.setFantaVote.and.callFake(async () => {
        loadingDuringCall = component.isLoading(1);
        return Promise.resolve();
      });

      await component.publishVoto(1, mockForm);
      expect(loadingDuringCall).toBe(true);
      expect(component.isLoading(1)).toBe(false);
    });

    it('should handle save errors', async () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm);
      component.setVoto(1, 10, 2, mockForm);
      component.setVoto(1, 11, 1, mockForm);

      mockFantaService.setFantaVote.and.returnValue(Promise.reject('Error'));
      await component.publishVoto(1, mockForm);
      expect(component.formStatus()[1]).toBe(FORM_STATUS.SAVE_ERROR);
      expect(component.isLoading(1)).toBe(false);
    });

    it('should update original votes after successful save', async () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm);
      component.setVoto(1, 10, 2, mockForm);
      component.setVoto(1, 11, 1, mockForm);

      await component.publishVoto(1, mockForm);
      const originalVotes = component.originalVotazioni().get(1);
      const currentVotes = component.votazioni().get(1);
      expect(originalVotes).toEqual(currentVotes);
    });
  });

  describe('Change Detection', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should detect unsaved data when votes are changed', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      expect(component.hasUnsavedData(1)).toBe(true);
    });

    it('should not show unsaved data for empty form', () => {
      expect(component.hasUnsavedData(1)).toBe(false);
    });

    it('should not show unsaved data after successful save', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      component['formStatusSignal'].set({ 1: FORM_STATUS.SUCCESS });
      expect(component.hasUnsavedData(1)).toBe(false);
    });

    it('should show no data when no votes exist', () => {
      expect(component.hasNoData(1)).toBe(true);
    });

    it('should not show no data when votes exist', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 5, mockForm);
      expect(component.hasNoData(1)).toBe(false);
    });

    it('should not show no data after successful save', () => {
      component['formStatusSignal'].set({ 1: FORM_STATUS.SUCCESS });
      expect(component.hasNoData(1)).toBe(false);
    });
  });

  describe('Modal Management', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should toggle ranking modal', () => {
      expect(component.modalRankingVisible()).toBe(false);
      component.toggleModalRanking();
      expect(component.modalRankingVisible()).toBe(true);
      component.toggleModalRanking();
      expect(component.modalRankingVisible()).toBe(false);
    });

    it('should toggle rules modal', () => {
      expect(component.modalRulesVisible()).toBe(false);
      component.toggleModalRules();
      expect(component.modalRulesVisible()).toBe(true);
      component.toggleModalRules();
      expect(component.modalRulesVisible()).toBe(false);
    });
  });

  describe('Computed Properties', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should compute user fanta points', () => {
      expect(component.userFantaPoints()).toBe(100);
      expect(mockFantaService.getFantaPoints).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw error when user id is missing', () => {
      // Create a component with no user ID in session storage
      sessionStorage.setItem('user', JSON.stringify({}));
      
      expect(() => {
        const newFixture = TestBed.createComponent(FantaComponent);
        newFixture.detectChanges();
      }).toThrowError('Invalid user data: missing user ID. User must be logged in to access this component.');
      
      // Restore original user
      sessionStorage.setItem('user', JSON.stringify(mockUser));
    });

    it('should throw error when user is not in session storage', () => {
      // Remove user from session storage
      sessionStorage.removeItem('user');
      
      expect(() => {
        const newFixture = TestBed.createComponent(FantaComponent);
        newFixture.detectChanges();
      }).toThrowError('User not found in session storage. User must be logged in to access this component.');
      
      // Restore original user
      sessionStorage.setItem('user', JSON.stringify(mockUser));
    });
  });

  describe('Avatar', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should get avatar source from db service', () => {
      const avatarSrc = component.avatarSrc;
      expect(mockDbDataService.getAvatarSrc).toHaveBeenCalledWith(mockUser);
      expect(avatarSrc).toBe('assets/images/default-avatar.png');
    });
  });

  describe('FantaVote Object Conversion', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should convert vote array to FantaVote object', () => {
      const mockForm = { valid: true } as NgForm;
      component.setVoto(1, 1, 1, mockForm);
      component.setVoto(1, 2, 2, mockForm);
      component.setVoto(1, 3, 3, mockForm);
      component.setVoto(1, 4, 4, mockForm);
      component.setVoto(1, 5, 5, mockForm);
      component.setVoto(1, 6, 6, mockForm);
      component.setVoto(1, 7, 7, mockForm);
      component.setVoto(1, 8, 8, mockForm);
      component.setVoto(1, 9, 1, mockForm);
      component.setVoto(1, 10, 2, mockForm);
      component.setVoto(1, 11, 1, mockForm);

      const fantaVote = component.getFantaVoteObject(1);
      expect(fantaVote.fanta_player_id).toBe(mockUser.id);
      expect(fantaVote.username).toBe(mockUser.username);
      expect(fantaVote.track_id).toBe(1);
      expect(fantaVote.id_1_place).toBe(1);
      expect(fantaVote.id_2_place).toBe(2);
      expect(fantaVote.constructor_id).toBe(1);
    });

    it('should return empty vote object for non-existent track', () => {
      const fantaVote = component.getFantaVoteObject(999);
      expect(fantaVote.id_1_place).toBe(0);
      expect(fantaVote.id_2_place).toBe(0);
      expect(fantaVote.constructor_id).toBe(0);
    });
  });

  describe('Constructors Map', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should populate constructors map from db service', () => {
      expect(component.constructors().size).toBe(2);
      expect(component.constructors().get(1)).toBe('Red Bull Racing');
      expect(component.constructors().get(2)).toBe('Ferrari');
    });
  });

  describe('Loading States', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return false for loading when not loading', () => {
      expect(component.isLoading(1)).toBe(false);
    });

    it('should return true for loading when loading', () => {
      component['loadingSignal'].set({ 1: true });
      expect(component.isLoading(1)).toBe(true);
    });
  });
});
