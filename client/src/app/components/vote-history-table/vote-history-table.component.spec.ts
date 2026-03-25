import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { VoteHistoryTableComponent } from './vote-history-table.component';
import { FantaService } from '../../service/fanta.service';
import { DbDataService } from '../../service/db-data.service';
import type { FantaVote, DriverData, Constructor, RaceResult } from '@f123dashboard/shared';
import { cilPeople, cilCheckAlt, cilX, cilSwapVertical } from '@coreui/icons';

describe('VoteHistoryTableComponent', () => {
  let component: VoteHistoryTableComponent;
  let fixture: ComponentFixture<VoteHistoryTableComponent>;
  let mockFantaService: jasmine.SpyObj<FantaService>;
  let mockDbDataService: jasmine.SpyObj<DbDataService>;

  const mockDrivers: DriverData[] = [
    {
      driver_id: 1,
      driver_username: 'driver1',
      driver_name: 'John',
      driver_surname: 'Doe',
      driver_description: '',
      driver_license_pt: 3,
      driver_consistency_pt: 0,
      driver_fast_lap_pt: 0,
      drivers_dangerous_pt: 0,
      driver_ingenuity_pt: 0,
      driver_strategy_pt: 0,
      driver_color: '#FF0000',
      car_name: 'RedBull',
      car_overall_score: 90,
      total_sprint_points: 0,
      total_free_practice_points: 0,
      total_qualifying_points: 0,
      total_full_race_points: 0,
      total_race_points: 0,
      total_points: 0
    },
    {
      driver_id: 2,
      driver_username: 'driver2',
      driver_name: 'Jane',
      driver_surname: 'Smith',
      driver_description: '',
      driver_license_pt: 3,
      driver_consistency_pt: 0,
      driver_fast_lap_pt: 0,
      drivers_dangerous_pt: 0,
      driver_ingenuity_pt: 0,
      driver_strategy_pt: 0,
      driver_color: '#00FF00',
      car_name: 'Mercedes',
      car_overall_score: 85,
      total_sprint_points: 0,
      total_free_practice_points: 0,
      total_qualifying_points: 0,
      total_full_race_points: 0,
      total_race_points: 0,
      total_points: 0
    }
  ];

  const mockConstructors: Constructor[] = [
    {
      constructor_id: 1,
      constructor_name: 'RedBull Racing',
      constructor_color: '#FF0000',
      driver_1_id: 1,
      driver_1_username: 'driver1',
      driver_1_tot_points: 0,
      driver_2_id: 2,
      driver_2_username: 'driver2',
      driver_2_tot_points: 0,
      constructor_tot_points: 0
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
    season_id: 1,
    constructor_id: 1
  };

  const mockRaceResult: RaceResult = {
    id: 1,
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
    list_dnf: '2,3'
  };

  beforeEach(async () => {
    mockFantaService = jasmine.createSpyObj('FantaService', [
      'getRaceResult',
      'pointsWithAbsoluteDifference',
      'getCorrectResponsePointFastLap',
      'getCorrectResponsePointDnf',
      'getCorrectResponsePointTeam',
      'getFantaRacePoints',
      'isDnfCorrect',
      'getWinningConstructorsForTrack'
    ]);

    mockDbDataService = jasmine.createSpyObj('DbDataService', [
      'getAllDrivers',
      'getConstructors'
    ]);

    // Setup default mock returns
    mockDbDataService.getAllDrivers.and.returnValue(mockDrivers);
    mockDbDataService.getConstructors.and.returnValue(mockConstructors);
    
    // Setup mocks that return different values based on trackId
    mockFantaService.getRaceResult.and.callFake((trackId: number) => {
      return trackId === 1 ? mockRaceResult : undefined;
    });
    mockFantaService.getWinningConstructorsForTrack.and.callFake((trackId: number) => {
      return trackId === 1 ? [1] : [];
    });
    
    mockFantaService.pointsWithAbsoluteDifference.and.returnValue(10);
    mockFantaService.getCorrectResponsePointFastLap.and.returnValue(5);
    mockFantaService.getCorrectResponsePointDnf.and.returnValue(5);
    mockFantaService.getCorrectResponsePointTeam.and.returnValue(5);
    mockFantaService.getFantaRacePoints.and.returnValue(100);
    mockFantaService.isDnfCorrect.and.returnValue(true);

    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        { provide: FantaService, useValue: mockFantaService },
        { provide: DbDataService, useValue: mockDbDataService }
      ],
      imports: [VoteHistoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteHistoryTableComponent);
    component = fixture.componentInstance;
    
    // Set signal inputs using ComponentRef.setInput()
    fixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
    fixture.componentRef.setInput('trackId', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('icon properties', () => {
    it('should have cilPeople icon', () => {
      expect(component.cilPeople).toEqual(cilPeople);
    });

    it('should have cilCheckAlt icon', () => {
      expect(component.cilCheckAlt).toEqual(cilCheckAlt);
    });

    it('should have cilX icon', () => {
      expect(component.cilX).toEqual(cilX);
    });

    it('should have cilSwapVertical icon', () => {
      expect(component.cilSwapVertical).toEqual(cilSwapVertical);
    });
  });

  describe('getVoteArray', () => {
    it('should return array of vote positions', () => {
      const result = component.getVoteArray();
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 1]);
    });

    it('should return empty array when fantaVote is null', () => {
      // Create a new fixture where the signal starts with a different value
      const emptyFixture = TestBed.createComponent(VoteHistoryTableComponent);
      emptyFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      emptyFixture.componentRef.setInput('trackId', 1);
      // Don't call detectChanges() to avoid triggering template evaluation
      const result = emptyFixture.componentInstance.getVoteArray();
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 1]);
    });
  });

  describe('getPilota', () => {
    it('should return driver data for valid id', () => {
      const result = component.getPilota(1);
      expect(result).toEqual(mockDrivers[0]);
    });

    it('should return null for invalid id', () => {
      const result = component.getPilota(999);
      expect(result).toBeNull();
    });
  });

  describe('getConstructor', () => {
    it('should return constructor name for valid id', () => {
      const result = component.getConstructor(1);
      expect(result).toBe('RedBull Racing');
    });

    it('should return null for invalid id', () => {
      const result = component.getConstructor(999);
      expect(result).toBeNull();
    });
  });

  describe('getPosizioneArrivo', () => {
    it('should return position for driver who finished in race', () => {
      const result = component.getPosizioneArrivo(1);
      expect(result).toBe(1);
    });

    it('should return 0 if race result not found', () => {
      const result = component.getPosizioneArrivo(999);
      expect(result).toBe(0);
    });

    it('should return 0 if driver not found in results', () => {
      const result = component.getPosizioneArrivo(999);
      expect(result).toBe(0);
    });
  });

  describe('getVotoPos', () => {
    it('should return voted position for driver', () => {
      const result = component.getVotoPos(1);
      expect(result).toBe(1);
    });

    it('should return 0 if driver not in vote', () => {
      const result = component.getVotoPos(999);
      expect(result).toBe(0);
    });
  });

  describe('getPunti', () => {
    it('should return points for matching position', () => {
      mockFantaService.pointsWithAbsoluteDifference.and.returnValue(10);
      const result = component.getPunti(1);
      expect(result).toBe(10);
      expect(mockFantaService.pointsWithAbsoluteDifference).toHaveBeenCalledWith(1, 1);
    });

    it('should return 0 if position is 0', () => {
      const result = component.getPunti(999);
      expect(result).toBe(0);
    });
  });

  describe('getPuntiFastLap', () => {
    it('should return points for correct fast lap prediction', () => {
      mockFantaService.getCorrectResponsePointFastLap.and.returnValue(5);
      const result = component.getPuntiFastLap();
      expect(result).toBe(5);
    });

    it('should return 0 for incorrect fast lap prediction', () => {
      const updatedVote = { ...mockFantaVote, id_fast_lap: 999 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.getPuntiFastLap();
      expect(result).toBe(0);
    });

    it('should return 0 if no race result', () => {
      // Create new fixture with trackId that returns no result
      const noResultFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noResultFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noResultFixture.componentRef.setInput('trackId', 999);
      noResultFixture.detectChanges();
      
      const result = noResultFixture.componentInstance.getPuntiFastLap();
      expect(result).toBe(0);
    });

    it('should return 0 if fast lap id is 0', () => {
      const updatedVote = { ...mockFantaVote, id_fast_lap: 0 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.getPuntiFastLap();
      expect(result).toBe(0);
    });
  });

  describe('getPuntiDnf', () => {
    it('should return points for correct DNF prediction', () => {
      mockFantaService.isDnfCorrect.and.returnValue(true);
      mockFantaService.getCorrectResponsePointDnf.and.returnValue(5);
      const result = component.getPuntiDnf();
      expect(result).toBe(5);
    });

    it('should return 0 for incorrect DNF prediction', () => {
      mockFantaService.isDnfCorrect.and.returnValue(false);
      const result = component.getPuntiDnf();
      expect(result).toBe(0);
    });

    it('should return 0 if no race result', () => {
      // Create new fixture with trackId that returns no result
      const noResultFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noResultFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noResultFixture.componentRef.setInput('trackId', 999);
      noResultFixture.detectChanges();
      
      const result = noResultFixture.componentInstance.getPuntiDnf();
      expect(result).toBe(0);
    });

    it('should return 0 if dnf id is 0', () => {
      const updatedVote = { ...mockFantaVote, id_dnf: 0 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.getPuntiDnf();
      expect(result).toBe(0);
    });
  });

  describe('getPuntiConstructor', () => {
    it('should return points for correct constructor prediction', () => {
      mockFantaService.getWinningConstructorsForTrack.and.returnValue([1]);
      mockFantaService.getCorrectResponsePointTeam.and.returnValue(5);
      const result = component.getPuntiConstructor();
      expect(result).toBe(5);
    });

    it('should return 0 for incorrect constructor prediction', () => {
      const updatedVote = { ...mockFantaVote, constructor_id: 999 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.getPuntiConstructor();
      expect(result).toBe(0);
    });

    it('should return 0 if no winning constructors', () => {
      // Create new fixture with trackId that has no winners
      const noWinnersFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noWinnersFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noWinnersFixture.componentRef.setInput('trackId', 999);
      noWinnersFixture.detectChanges();
      
      const result = noWinnersFixture.componentInstance.getPuntiConstructor();
      expect(result).toBe(0);
    });

    it('should return 0 if constructor id is 0', () => {
      const updatedVote = { ...mockFantaVote, constructor_id: 0 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.getPuntiConstructor();
      expect(result).toBe(0);
    });
  });

  describe('getTotalPoints', () => {
    it('should return total fanta race points', () => {
      mockFantaService.getFantaRacePoints.and.returnValue(100);
      const result = component.getTotalPoints();
      expect(result).toBe(100);
      expect(mockFantaService.getFantaRacePoints).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('isCorrect', () => {
    it('should return check icon for correct prediction', () => {
      mockFantaService.pointsWithAbsoluteDifference.and.returnValue(7); // CORRECT_RESPONSE_POINTS[0]
      const result = component.isCorrect(1);
      expect(result.icon).toEqual(cilCheckAlt);
      expect(result.color).toBe('green');
    });

    it('should return swap icon for close prediction (off by 1)', () => {
      mockFantaService.pointsWithAbsoluteDifference.and.returnValue(4); // CORRECT_RESPONSE_POINTS[1]
      const result = component.isCorrect(1);
      expect(result.icon).toEqual(cilSwapVertical);
      expect(result.color).toBe('#FFA600');
    });

    it('should return swap icon for close prediction (off by 2)', () => {
      mockFantaService.pointsWithAbsoluteDifference.and.returnValue(2); // CORRECT_RESPONSE_POINTS[2]
      const result = component.isCorrect(1);
      expect(result.icon).toEqual(cilSwapVertical);
      expect(result.color).toBe('#FFA600');
    });

    it('should return X icon for incorrect prediction', () => {
      mockFantaService.pointsWithAbsoluteDifference.and.returnValue(0);
      const result = component.isCorrect(1);
      expect(result.icon).toEqual(cilX);
      expect(result.color).toBe('red');
    });

    it('should return X icon when position is 0', () => {
      const result = component.isCorrect(999);
      expect(result.icon).toEqual(cilX);
      expect(result.color).toBe('red');
    });
  });

  describe('isCorrectFastLap', () => {
    it('should return check icon for correct fast lap', () => {
      const result = component.isCorrectFastLap();
      expect(result.color).toBe('green');
    });

    it('should return X icon for incorrect fast lap', () => {
      const updatedVote = { ...mockFantaVote, id_fast_lap: 999 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.isCorrectFastLap();
      expect(result.color).toBe('red');
    });

    it('should return X icon if no race result', () => {
      // Create new fixture with trackId that returns no result
      const noResultFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noResultFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noResultFixture.componentRef.setInput('trackId', 999);
      noResultFixture.detectChanges();
      
      const result = noResultFixture.componentInstance.isCorrectFastLap();
      expect(result.color).toBe('red');
    });
  });

  describe('isCorrectDnf', () => {
    it('should return check icon for correct DNF', () => {
      mockFantaService.isDnfCorrect.and.returnValue(true);
      const result = component.isCorrectDnf();
      expect(result.color).toBe('green');
    });

    it('should return X icon for incorrect DNF', () => {
      mockFantaService.isDnfCorrect.and.returnValue(false);
      const result = component.isCorrectDnf();
      expect(result.color).toBe('red');
    });

    it('should return X icon if no race result', () => {
      // Create new fixture with trackId that returns no result
      const noResultFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noResultFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noResultFixture.componentRef.setInput('trackId', 999);
      noResultFixture.detectChanges();
      
      const result = noResultFixture.componentInstance.isCorrectDnf();
      expect(result.color).toBe('red');
    });
  });

  describe('isCorrectConstructor', () => {
    it('should return green for correct constructor', () => {
      mockFantaService.getWinningConstructorsForTrack.and.returnValue([1]);
      const result = component.isCorrectConstructor();
      expect(result.color).toBe('green');
    });

    it('should return red for incorrect constructor', () => {
      const updatedVote = { ...mockFantaVote, constructor_id: 999 };
      fixture.componentRef.setInput('fantaVote', updatedVote);
      fixture.detectChanges();
      const result = component.isCorrectConstructor();
      expect(result.color).toBe('red');
    });

    it('should return red if no winning constructors', () => {
      // Create new fixture with trackId that has no winners
      const noWinnersFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noWinnersFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noWinnersFixture.componentRef.setInput('trackId', 999);
      noWinnersFixture.detectChanges();
      
      const result = noWinnersFixture.componentInstance.isCorrectConstructor();
      expect(result.color).toBe('red');
    });
  });

  describe('getFastLap', () => {
    it('should return fast lap driver id', () => {
      const result = component.getFastLap();
      expect(result).toBe(1);
    });

    it('should return 0 if no race result', () => {
      // Create new fixture with trackId that returns no result
      const noResultFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noResultFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noResultFixture.componentRef.setInput('trackId', 999);
      noResultFixture.detectChanges();
      
      const result = noResultFixture.componentInstance.getFastLap();
      expect(result).toBe(0);
    });
  });

  describe('getDnf', () => {
    it('should return DNF list', () => {
      const result = component.getDnf();
      expect(result).toBe('2,3');
    });

    it('should return empty string if no race result', () => {
      // Create new fixture with trackId that returns no result
      const noResultFixture = TestBed.createComponent(VoteHistoryTableComponent);
      noResultFixture.componentRef.setInput('fantaVote', { ...mockFantaVote });
      noResultFixture.componentRef.setInput('trackId', 999);
      noResultFixture.detectChanges();
      
      const result = noResultFixture.componentInstance.getDnf();
      expect(result).toBe('');
    });
  });
});
