import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { FantaService } from './fanta.service';
import { DbDataService } from './db-data.service';
import { ApiService } from './api.service';
import type { FantaVote, RaceResult, Driver, ConstructorGrandPrixPoints } from '@f123dashboard/shared';

describe('FantaService', () => {
  let service: FantaService;
  let mockDbDataService: jasmine.SpyObj<DbDataService>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  const mockDrivers: Driver[] = [
    { id: 1, username: 'driver1', first_name: 'John', surname: 'Doe' },
    { id: 2, username: 'driver2', first_name: 'Jane', surname: 'Smith' },
    { id: 3, username: 'driver3', first_name: 'Bob', surname: 'Johnson' },
    { id: 4, username: 'driver4', first_name: 'Alice', surname: 'Williams' },
    { id: 5, username: 'driver5', first_name: 'Charlie', surname: 'Brown' },
    { id: 6, username: 'driver6', first_name: 'David', surname: 'Davis' },
    { id: 7, username: 'driver7', first_name: 'Eve', surname: 'Miller' },
    { id: 8, username: 'driver8', first_name: 'Frank', surname: 'Wilson' }
  ];

  const mockRaceResults: RaceResult[] = [
    {
      id: 1,
      track_id: 100,
      id_1_place: 1,
      id_2_place: 2,
      id_3_place: 3,
      id_4_place: 4,
      id_5_place: 5,
      id_6_place: 6,
      id_7_place: 7,
      id_8_place: 8,
      id_fast_lap: 1,
      list_dnf: '{7,8}'
    },
    {
      id: 2,
      track_id: 101,
      id_1_place: 2,
      id_2_place: 1,
      id_3_place: 4,
      id_4_place: 3,
      id_5_place: 6,
      id_6_place: 5,
      id_7_place: 8,
      id_8_place: 7,
      id_fast_lap: 2,
      list_dnf: '{5}'
    },
    {
      id: 3,
      track_id: 102,
      id_1_place: 3,
      id_2_place: 4,
      id_3_place: 5,
      id_4_place: 6,
      id_5_place: 7,
      id_6_place: 8,
      id_7_place: 1,
      id_8_place: 2,
      id_fast_lap: 3,
      list_dnf: ''
    }
  ];

  const mockFantaVotes: FantaVote[] = [
    {
      fanta_player_id: 1,
      username: 'player1',
      track_id: 100,
      id_1_place: 1,
      id_2_place: 2,
      id_3_place: 3,
      id_4_place: 4,
      id_5_place: 5,
      id_6_place: 6,
      id_7_place: 7,
      id_8_place: 8,
      id_fast_lap: 1,
      id_dnf: 7,
      constructor_id: 1,
      season_id: 1
    },
    {
      fanta_player_id: 2,
      username: 'player2',
      track_id: 100,
      id_1_place: 2,
      id_2_place: 1,
      id_3_place: 4,
      id_4_place: 3,
      id_5_place: 6,
      id_6_place: 5,
      id_7_place: 8,
      id_8_place: 7,
      id_fast_lap: 2,
      id_dnf: 8,
      constructor_id: 2,
      season_id: 1
    },
    {
      fanta_player_id: 1,
      username: 'player1',
      track_id: 101,
      id_1_place: 2,
      id_2_place: 1,
      id_3_place: 3,
      id_4_place: 4,
      id_5_place: 5,
      id_6_place: 6,
      id_7_place: 7,
      id_8_place: 8,
      id_fast_lap: 2,
      id_dnf: 5,
      constructor_id: 1,
      season_id: 1
    }
  ];

  const mockConstructorGrandPrixPoints: ConstructorGrandPrixPoints[] = [
    {
      constructor_id: 1,
      constructor_name: 'Team 1',
      track_id: 100,
      track_name: 'Track 1',
      grand_prix_date: '2024-03-01T21:45:00.000Z',
      grand_prix_id: 1,
      season_id: 1,
      season_description: 'Season 2024',
      driver_id_1: 10,
      driver_id_2: 11,
      driver_1_points: 50,
      driver_2_points: 50,
      constructor_points: 100
    },
    {
      constructor_id: 2,
      constructor_name: 'Team 2',
      track_id: 100,
      track_name: 'Track 1',
      grand_prix_date: '2024-03-01T21:45:00.000Z',
      grand_prix_id: 1,
      season_id: 1,
      season_description: 'Season 2024',
      driver_id_1: 12,
      driver_id_2: 13,
      driver_1_points: 40,
      driver_2_points: 40,
      constructor_points: 80
    },
    {
      constructor_id: 1,
      constructor_name: 'Team 1',
      track_id: 101,
      track_name: 'Track 2',
      grand_prix_date: '2024-03-15T21:45:00.000Z',
      grand_prix_id: 2,
      season_id: 1,
      season_description: 'Season 2024',
      driver_id_1: 10,
      driver_id_2: 11,
      driver_1_points: 45,
      driver_2_points: 45,
      constructor_points: 90
    }
  ];

  beforeEach(async () => {
    mockDbDataService = jasmine.createSpyObj('DbDataService', [
      'getDrivers',
      'getWinningConstructorGrandPrixPointsData',
      'getConstructorGrandPrixPointsData'
    ], {
      raceResult: signal(mockRaceResults)
    });

    mockDbDataService.getDrivers.and.returnValue(mockDrivers);
    mockDbDataService.getWinningConstructorGrandPrixPointsData.and.returnValue(mockConstructorGrandPrixPoints);
    mockDbDataService.getConstructorGrandPrixPointsData.and.returnValue(mockConstructorGrandPrixPoints);

    mockApiService = jasmine.createSpyObj('ApiService', ['post']);
    mockApiService.post.and.returnValue(of(mockFantaVotes));

    TestBed.configureTestingModule({
      providers: [
        FantaService,
        { provide: DbDataService, useValue: mockDbDataService },
        { provide: ApiService, useValue: mockApiService }
      ]
    });
    
    service = TestBed.inject(FantaService);
    await service.loadFantaVotes();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('should load fanta votes via API', () => {
      expect(mockApiService.post).toHaveBeenCalledWith('/fanta/votes', {});
    });

    it('should calculate points after loading', () => {
      expect(service.getFantaPoints(1)).toBeGreaterThan(0);
    });
  });

  describe('getFantaPoints', () => {
    it('should return points for valid user', () => {
      const points = service.getFantaPoints(1);
      expect(points).toBeGreaterThan(0);
    });

    it('should return 0 for user with no votes', () => {
      const points = service.getFantaPoints(999);
      expect(points).toBe(0);
    });
  });

  describe('getFantaNumberVotes', () => {
    it('should return correct number of votes for user', () => {
      const votes = service.getFantaNumberVotes(1);
      expect(votes).toBe(2);
    });

    it('should return 0 for user with no votes', () => {
      const votes = service.getFantaNumberVotes(999);
      expect(votes).toBe(0);
    });
  });

  describe('getFantaRacePoints', () => {
    it('should return points for specific race and user', () => {
      const points = service.getFantaRacePoints(1, 100);
      expect(points).toBeGreaterThan(0);
    });

    it('should return 0 for non-existent race', () => {
      const points = service.getFantaRacePoints(1, 999);
      expect(points).toBe(0);
    });

    it('should return 0 for non-existent user', () => {
      const points = service.getFantaRacePoints(999, 100);
      expect(points).toBe(0);
    });
  });

  describe('getFantaRacePointsBreakdown', () => {
    it('should return breakdown for user with votes', () => {
      const breakdown = service.getFantaRacePointsBreakdown(1);
      expect(breakdown.length).toBe(2);
      expect(breakdown[0].raceId).toBe(100);
      expect(breakdown[1].raceId).toBe(101);
    });

    it('should return empty array for user with no votes', () => {
      const breakdown = service.getFantaRacePointsBreakdown(999);
      expect(breakdown).toEqual([]);
    });

    it('should sort breakdown by race ID', () => {
      const breakdown = service.getFantaRacePointsBreakdown(1);
      for (let i = 1; i < breakdown.length; i++) {
        expect(breakdown[i].raceId).toBeGreaterThan(breakdown[i - 1].raceId);
      }
    });
  });

  describe('getTotNumberVotes', () => {
    it('should return total number of races', () => {
      expect(service.getTotNumberVotes()).toBe(mockRaceResults.length);
    });
  });

  describe('getFantaVote', () => {
    it('should return vote for valid user and race', () => {
      const vote = service.getFantaVote(1, 100);
      expect(vote).toBeDefined();
      expect(vote?.fanta_player_id).toBe(1);
      expect(vote?.track_id).toBe(100);
    });

    it('should return undefined for non-existent vote', () => {
      const vote = service.getFantaVote(999, 100);
      expect(vote).toBeUndefined();
    });
  });

  describe('getRaceResult', () => {
    it('should return race result for valid race ID', () => {
      const result = service.getRaceResult(100);
      expect(result).toBeDefined();
      expect(result?.track_id).toBe(100);
    });

    it('should return undefined for non-existent race', () => {
      const result = service.getRaceResult(999);
      expect(result).toBeUndefined();
    });
  });

  describe('getWinningConstructorsForTrack', () => {
    it('should return winning constructor ID for valid track', () => {
      const constructorIds = service.getWinningConstructorsForTrack(100);
      expect(constructorIds).toEqual([1]);
    });

    it('should return empty array for track with no data', () => {
      const constructorIds = service.getWinningConstructorsForTrack(999);
      expect(constructorIds).toEqual([]);
    });

    it('should return all constructors when multiple constructors tie for first', () => {
      // Create mock data with two constructors tied at 100 points
      const tiedConstructors: ConstructorGrandPrixPoints[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team 1',
          track_id: 103,
          track_name: 'Track 3',
          grand_prix_date: '2024-04-01T21:45:00.000Z',
          grand_prix_id: 3,
          season_id: 1,
          season_description: 'Season 2024',
          driver_id_1: 10,
          driver_id_2: 11,
          driver_1_points: 50,
          driver_2_points: 50,
          constructor_points: 100
        },
        {
          constructor_id: 2,
          constructor_name: 'Team 2',
          track_id: 103,
          track_name: 'Track 3',
          grand_prix_date: '2024-04-01T21:45:00.000Z',
          grand_prix_id: 3,
          season_id: 1,
          season_description: 'Season 2024',
          driver_id_1: 12,
          driver_id_2: 13,
          driver_1_points: 50,
          driver_2_points: 50,
          constructor_points: 100
        },
        {
          constructor_id: 3,
          constructor_name: 'Team 3',
          track_id: 103,
          track_name: 'Track 3',
          grand_prix_date: '2024-04-01T21:45:00.000Z',
          grand_prix_id: 3,
          season_id: 1,
          season_description: 'Season 2024',
          driver_id_1: 14,
          driver_id_2: 15,
          driver_1_points: 40,
          driver_2_points: 40,
          constructor_points: 80
        }
      ];

      mockDbDataService.getConstructorGrandPrixPointsData.and.returnValue([...mockConstructorGrandPrixPoints, ...tiedConstructors]);

      const constructorIds = service.getWinningConstructorsForTrack(103);
      expect(constructorIds).toEqual([1, 2]);
      expect(constructorIds.length).toBe(2);
    });
  });

  describe('calculateFantaPoints', () => {
    it('should calculate points for perfect prediction', () => {
      const raceResult = mockRaceResults[0];
      const fantaVote = mockFantaVotes[0];
      const points = service.calculateFantaPoints(raceResult, fantaVote);
      
      // Perfect prediction: 8 drivers * 7 points + fast lap (5) + dnf (5) + team (5) = 71
      expect(points).toBeGreaterThan(0);
    });

    it('should award points for correct fast lap prediction', () => {
      const raceResult: RaceResult = {
        id: 1,
        track_id: 100,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 1,
        list_dnf: ''
      };

      const fantaVote: FantaVote = {
        fanta_player_id: 1,
        username: 'player1',
        track_id: 100,
        id_1_place: 2,
        id_2_place: 1,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 1,
        id_dnf: 0,
        constructor_id: 0
      };

      const points = service.calculateFantaPoints(raceResult, fantaVote);
      expect(points).toBeGreaterThanOrEqual(FantaService.CORRECT_RESPONSE_FAST_LAP_POINTS);
    });

    it('should award points for correct DNF prediction', () => {
      const raceResult: RaceResult = {
        id: 1,
        track_id: 100,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 0,
        list_dnf: '{7}'
      };

      const fantaVote: FantaVote = {
        fanta_player_id: 1,
        username: 'player1',
        track_id: 100,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 0,
        id_dnf: 7,
        constructor_id: 0
      };

      const points = service.calculateFantaPoints(raceResult, fantaVote);
      expect(points).toBeGreaterThanOrEqual(FantaService.CORRECT_RESPONSE_DNF_POINTS);
    });

    it('should not award fast lap points when prediction is wrong', () => {
      const raceResult: RaceResult = {
        id: 1,
        track_id: 100,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 1,
        list_dnf: ''
      };

      const fantaVote: FantaVote = {
        fanta_player_id: 1,
        username: 'player1',
        track_id: 100,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 2,
        id_dnf: 0,
        constructor_id: 0
      };

      const pointsWithWrongFastLap = service.calculateFantaPoints(raceResult, fantaVote);
      
      fantaVote.id_fast_lap = 1;
      const pointsWithCorrectFastLap = service.calculateFantaPoints(raceResult, fantaVote);
      
      expect(pointsWithCorrectFastLap).toBe(pointsWithWrongFastLap + FantaService.CORRECT_RESPONSE_FAST_LAP_POINTS);
    });

    it('should award constructor points when user picks any tied constructor', () => {
      // Setup tied constructors for track 103
      const tiedConstructors: ConstructorGrandPrixPoints[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team 1',
          track_id: 103,
          track_name: 'Track 3',
          grand_prix_date: '2024-04-01T21:45:00.000Z',
          grand_prix_id: 3,
          season_id: 1,
          season_description: 'Season 2024',
          driver_id_1: 10,
          driver_id_2: 11,
          driver_1_points: 50,
          driver_2_points: 50,
          constructor_points: 100
        },
        {
          constructor_id: 2,
          constructor_name: 'Team 2',
          track_id: 103,
          track_name: 'Track 3',
          grand_prix_date: '2024-04-01T21:45:00.000Z',
          grand_prix_id: 3,
          season_id: 1,
          season_description: 'Season 2024',
          driver_id_1: 12,
          driver_id_2: 13,
          driver_1_points: 50,
          driver_2_points: 50,
          constructor_points: 100
        }
      ];

      mockDbDataService.getConstructorGrandPrixPointsData.and.returnValue([...mockConstructorGrandPrixPoints, ...tiedConstructors]);

      const raceResult: RaceResult = {
        id: 3,
        track_id: 103,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 0,
        list_dnf: ''
      };

      // Test voting for constructor 1 (tied winner)
      const fantaVote1: FantaVote = {
        fanta_player_id: 1,
        username: 'player1',
        track_id: 103,
        id_1_place: 1,
        id_2_place: 2,
        id_3_place: 3,
        id_4_place: 4,
        id_5_place: 5,
        id_6_place: 6,
        id_7_place: 7,
        id_8_place: 8,
        id_fast_lap: 0,
        id_dnf: 0,
        constructor_id: 1
      };

      // Test voting for constructor 2 (also tied winner)
      const fantaVote2: FantaVote = {
        ...fantaVote1,
        constructor_id: 2
      };

      const pointsConstructor1 = service.calculateFantaPoints(raceResult, fantaVote1);
      const pointsConstructor2 = service.calculateFantaPoints(raceResult, fantaVote2);

      // Both should get the same points (including constructor bonus)
      expect(pointsConstructor1).toBe(pointsConstructor2);
      expect(pointsConstructor1).toBeGreaterThanOrEqual(FantaService.CORRECT_RESPONSE_TEAM);
    });
  });

  describe('isDnfCorrect', () => {
    it('should return true when DNF prediction is correct', () => {
      expect(service.isDnfCorrect('{7,8}', 7)).toBe(true);
      expect(service.isDnfCorrect('{7,8}', 8)).toBe(true);
    });

    it('should return false when DNF prediction is wrong', () => {
      expect(service.isDnfCorrect('{7,8}', 1)).toBe(false);
    });

    it('should return false for empty DNF list', () => {
      expect(service.isDnfCorrect('', 7)).toBe(false);
    });

    it('should return false for null/undefined values', () => {
      expect(service.isDnfCorrect('', 0)).toBe(false);
    });

    it('should handle DNF list with spaces', () => {
      expect(service.isDnfCorrect('{7, 8}', 7)).toBe(true);
    });
  });

  describe('pointsWithAbsoluteDifference', () => {
    it('should return 7 points for exact match', () => {
      expect(service.pointsWithAbsoluteDifference(0, 0)).toBe(7);
    });

    it('should return 4 points for difference of 1', () => {
      expect(service.pointsWithAbsoluteDifference(0, 1)).toBe(4);
      expect(service.pointsWithAbsoluteDifference(1, 0)).toBe(4);
    });

    it('should return 2 points for difference of 2', () => {
      expect(service.pointsWithAbsoluteDifference(0, 2)).toBe(2);
      expect(service.pointsWithAbsoluteDifference(2, 0)).toBe(2);
    });

    it('should return 0 points for difference greater than 2', () => {
      expect(service.pointsWithAbsoluteDifference(0, 3)).toBe(0);
      expect(service.pointsWithAbsoluteDifference(0, 7)).toBe(0);
    });
  });

  describe('constants getters', () => {
    it('should return correct fast lap points', () => {
      expect(service.getCorrectResponsePointFastLap()).toBe(5);
    });

    it('should return correct DNF points', () => {
      expect(service.getCorrectResponsePointDnf()).toBe(5);
    });

    it('should return correct team points', () => {
      expect(service.getCorrectResponsePointTeam()).toBe(5);
    });
  });


  describe('edge cases', () => {
    it('should handle race results with invalid positions', () => {
      const incompleteRaceResult: RaceResult = {
        id: 99,
        track_id: 999,
        id_1_place: 0,
        id_2_place: 0,
        id_3_place: 0,
        id_4_place: 0,
        id_5_place: 0,
        id_6_place: 0,
        id_7_place: 0,
        id_8_place: 0,
        id_fast_lap: 0,
        list_dnf: ''
      };

      const extendedResults = [...mockRaceResults, incompleteRaceResult];
      Object.defineProperty(mockDbDataService, 'raceResult', {
        value: signal(extendedResults),
        writable: true,
        configurable: true
      });
      
      expect(service.getTotNumberVotes()).toBe(mockRaceResults.length);
    });

    it('should handle empty fanta votes', async () => {
      mockApiService.post.and.returnValue(of([]));
      await service.loadFantaVotes();
      
      expect(service.getFantaPoints(1)).toBe(0);
      expect(service.getFantaNumberVotes(1)).toBe(0);
    });

    it('should handle empty race results', () => {
      Object.defineProperty(mockDbDataService, 'raceResult', {
        value: signal([]),
        writable: true,
        configurable: true
      });
      
      // Reconfigure TestBed with empty data
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          FantaService,
          { provide: DbDataService, useValue: mockDbDataService },
          { provide: ApiService, useValue: mockApiService }
        ]
      });
      
      const newService = TestBed.inject(FantaService);
      expect(newService.getTotNumberVotes()).toBe(0);
    });
  });
});


