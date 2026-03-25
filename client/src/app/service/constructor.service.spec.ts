import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConstructorService } from './constructor.service';
import type { Constructor, DriverData } from '@f123dashboard/shared';

describe('ConstructorService', () => {
  let service: ConstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideNoopAnimations(), ],});
    service = TestBed.inject(ConstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateConstructorPoints', () => {
    it('should calculate constructor points correctly from two drivers', () => {
      const drivers: DriverData[] = [
        {
          driver_id: 1,
          driver_username: 'driver1',
          total_race_points: 100,
          total_full_race_points: 50,
          total_sprint_points: 30,
          total_qualifying_points: 20,
          total_free_practice_points: 10,
          total_points: 210
        } as DriverData,
        {
          driver_id: 2,
          driver_username: 'driver2',
          total_race_points: 80,
          total_full_race_points: 40,
          total_sprint_points: 25,
          total_qualifying_points: 15,
          total_free_practice_points: 8,
          total_points: 168
        } as DriverData
      ];

      const constructors: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team A',
          driver_1_username: 'driver1',
          driver_2_username: 'driver2',
          driver_1_id: 1,
          driver_2_id: 2,
          constructor_race_points: 0,
          constructor_full_race_points: 0,
          constructor_sprint_points: 0,
          constructor_qualifying_points: 0,
          constructor_free_practice_points: 0,
          constructor_tot_points: 0
        } as Constructor
      ];

      const result = service.calculateConstructorPoints(constructors, drivers);

      expect(result[0].constructor_race_points).toBe(180); // 100 + 80
      expect(result[0].constructor_full_race_points).toBe(90); // 50 + 40
      expect(result[0].constructor_sprint_points).toBe(55); // 30 + 25
      expect(result[0].constructor_qualifying_points).toBe(35); // 20 + 15
      expect(result[0].constructor_free_practice_points).toBe(18); // 10 + 8
      expect(result[0].constructor_tot_points).toBe(378); // 210 + 168
    });

    it('should handle null/undefined points gracefully', () => {
      const drivers: DriverData[] = [
        {
          driver_id: 1,
          driver_username: 'driver1',
          total_points: 100
        } as DriverData,
        {
          driver_id: 2,
          driver_username: 'driver2',
          total_points: 80
        } as DriverData
      ];

      const constructors: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team A',
          driver_1_username: 'driver1',
          driver_2_username: 'driver2',
          driver_1_id: 1,
          driver_2_id: 2
        } as Constructor
      ];

      const result = service.calculateConstructorPoints(constructors, drivers);

      expect(result[0].constructor_race_points).toBe(0);
      expect(result[0].constructor_tot_points).toBe(180); // 100 + 80
    });

    it('should sort constructors by total points descending', () => {
      const drivers: DriverData[] = [
        { driver_id: 1, driver_username: 'driver1', total_points: 50 } as DriverData,
        { driver_id: 2, driver_username: 'driver2', total_points: 60 } as DriverData,
        { driver_id: 3, driver_username: 'driver3', total_points: 100 } as DriverData,
        { driver_id: 4, driver_username: 'driver4', total_points: 90 } as DriverData
      ];

      const constructors: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team A',
          driver_1_username: 'driver1',
          driver_2_username: 'driver2'
        } as Constructor,
        {
          constructor_id: 2,
          constructor_name: 'Team B',
          driver_1_username: 'driver3',
          driver_2_username: 'driver4'
        } as Constructor
      ];

      const result = service.calculateConstructorPoints(constructors, drivers);

      expect(result[0].constructor_name).toBe('Team B'); // 190 points
      expect(result[0].constructor_tot_points).toBe(190);
      expect(result[1].constructor_name).toBe('Team A'); // 110 points
      expect(result[1].constructor_tot_points).toBe(110);
    });

    it('should not calculate points if one driver is missing', () => {
      const drivers: DriverData[] = [
        { driver_id: 1, driver_username: 'driver1', total_points: 100 } as DriverData
      ];

      const constructors: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team A',
          driver_1_username: 'driver1',
          driver_2_username: 'missingDriver'
        } as Constructor
      ];

      const result = service.calculateConstructorPoints(constructors, drivers);

      expect(result[0].constructor_tot_points).toBeUndefined();
    });
  });

  describe('calculateConstructorGainedPoints', () => {
    it('should calculate gained points correctly', () => {
      const drivers = [
        { driver_username: 'driver1', gainedPoints: 25 },
        { driver_username: 'driver2', gainedPoints: 30 },
        { driver_username: 'driver3', gainedPoints: 15 }
      ];

      const constructors: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team A',
          driver_1_username: 'driver1',
          driver_2_username: 'driver2'
        } as Constructor,
        {
          constructor_id: 2,
          constructor_name: 'Team B',
          driver_1_username: 'driver3',
          driver_2_username: 'driver1'
        } as Constructor
      ];

      const result = service.calculateConstructorGainedPoints(constructors, drivers);

      expect(result[0].constructor_race_points).toBe(55); // 25 + 30
      expect(result[1].constructor_race_points).toBe(40); // 15 + 25
    });

    it('should initialize to 0 if no matching drivers', () => {
      const drivers = [
        { driver_username: 'driver1', gainedPoints: 25 }
      ];

      const constructors: Constructor[] = [
        {
          constructor_id: 1,
          constructor_name: 'Team A',
          driver_1_username: 'otherDriver1',
          driver_2_username: 'otherDriver2'
        } as Constructor
      ];

      const result = service.calculateConstructorGainedPoints(constructors, drivers);

      expect(result[0].constructor_race_points).toBe(0);
    });

    it('should handle empty arrays', () => {
      const result = service.calculateConstructorGainedPoints([], []);
      expect(result).toEqual([]);
    });
  });
});
