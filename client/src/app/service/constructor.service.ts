import { Injectable } from '@angular/core';
import type { Constructor, DriverData } from '@f123dashboard/shared';

@Injectable({
  providedIn: 'root'
})
export class ConstructorService {
  /**
   * Calculates all point types for each constructor based on their drivers' data
   * @param constructors Array of constructors to calculate points for
   * @param drivers Array of driver data containing points information
   * @returns Sorted array of constructors with calculated points
   */
  calculateConstructorPoints(constructors: Constructor[], drivers: DriverData[]): Constructor[] {
    const updatedConstructors = constructors.map(constructor => {
      // Find the drivers for this constructor
      const driver1 = drivers.find(d => d.driver_username === constructor.driver_1_username);
      const driver2 = drivers.find(d => d.driver_username === constructor.driver_2_username);

      if (driver1 && driver2) {
        // Sum session points
        constructor.constructor_race_points = Number(driver1.total_race_points ?? 0) + Number(driver2.total_race_points ?? 0);
        constructor.constructor_full_race_points = Number(driver1.total_full_race_points ?? 0) + Number(driver2.total_full_race_points ?? 0);
        constructor.constructor_sprint_points = Number(driver1.total_sprint_points ?? 0) + Number(driver2.total_sprint_points ?? 0);
        constructor.constructor_qualifying_points = Number(driver1.total_qualifying_points ?? 0) + Number(driver2.total_qualifying_points ?? 0);
        constructor.constructor_free_practice_points = Number(driver1.total_free_practice_points ?? 0) + Number(driver2.total_free_practice_points ?? 0);

        constructor.constructor_tot_points = Number(driver1.total_points ?? 0) + Number(driver2.total_points ?? 0);
      }

      return constructor;
    });

    // Sort constructors by total points
    return updatedConstructors.sort((a, b) => b.constructor_tot_points - a.constructor_tot_points);
  }

  /**
   * Calculates gained points for constructors based on driver gained points
   * Used for "Driver of the Week" calculations
   * @param constructors Array of constructors
   * @param drivers Array of drivers with gainedPoints property
   * @returns Constructors with updated constructor_race_points (gained points)
   */
  calculateConstructorGainedPoints(
    constructors: Constructor[],
    drivers: { driver_username: string; gainedPoints: number }[]
  ): Constructor[] {
    return constructors.map(constructor => {
      constructor.constructor_race_points = 0;
      for (const driver of drivers) {
        if (driver.driver_username === constructor.driver_1_username || driver.driver_username === constructor.driver_2_username) {
          constructor.constructor_race_points += driver.gainedPoints;
        }
      }
      return constructor;
    });
  }
}
