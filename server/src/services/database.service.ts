import pg from 'pg';
import type {
  DriverData,
  Driver,
  SessionResult,
  ChampionshipData,
  Season,
  CumulativePointsData,
  TrackData,
  RaceResult,
  Constructor,
  ConstructorGrandPrixPoints
} from '@f123dashboard/shared';

export class DatabaseService {
  constructor(private pool: pg.Pool) {}

  async getAllDrivers(seasonId?: number): Promise<DriverData[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
        SELECT id FROM seasons ORDER BY start_date DESC LIMIT 1
      )
      SELECT 
        driver_id, driver_username, driver_name, driver_surname, driver_description, driver_license_pt, driver_consistency_pt, driver_fast_lap_pt, drivers_dangerous_pt, driver_ingenuity_pt, driver_strategy_pt, driver_color, car_name, car_overall_score, total_sprint_points, total_free_practice_points, total_qualifying_points, total_full_race_points, total_race_points, total_points
      FROM public.all_race_points arp
      CROSS JOIN latest_season ls
      WHERE arp.season_id = COALESCE($1, ls.id);
    `, [seasonId]);
    return result.rows as DriverData[];
  }

  async getDriversData(seasonId?: number): Promise<Driver[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
        SELECT id FROM seasons ORDER BY start_date DESC LIMIT 1
      )
      SELECT 
        d.id as id,
        d.username as username,
        d.name as name,
        d.surname as surname
      FROM drivers d
      CROSS JOIN latest_season ls
      LEFT JOIN pilots p ON d.pilot_id = p.id
      LEFT JOIN cars c ON p.car_id = c.id
      WHERE d.season = COALESCE($1, ls.id)
      ORDER BY d.username;
    `, [seasonId]);
    return result.rows as Driver[];
  }

  async getChampionship(seasonId?: number): Promise<ChampionshipData[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
        SELECT id FROM seasons ORDER BY start_date DESC LIMIT 1
      ),
      all_session_results AS (
        -- Free Practice Results
        SELECT 
          gp.id AS gran_prix_id,
          t.name AS track_name,
          gp.date AS gran_prix_date,
          gp.has_sprint AS gran_prix_has_sprint,
          gp.has_x2 AS gran_prix_has_x2,
          t.country AS track_country,
          'free_practice' AS session_type,
          fpre.position,
          d.username AS driver_username,
          NULL::boolean AS fast_lap
        FROM gran_prix gp
        JOIN tracks t ON gp.track_id = t.id
        CROSS JOIN latest_season ls
        LEFT JOIN free_practice_result_entries fpre ON fpre.free_practice_results_id = gp.free_practice_results_id
        LEFT JOIN drivers d ON fpre.pilot_id = d.id
        WHERE gp.season_id = COALESCE($1, ls.id)
          AND gp.free_practice_results_id IS NOT NULL
          AND fpre.position IS NOT NULL
        
        UNION ALL
        
        -- Qualifying Results
        SELECT 
          gp.id AS gran_prix_id,
          t.name AS track_name,
          gp.date AS gran_prix_date,
          gp.has_sprint AS gran_prix_has_sprint,
          gp.has_x2 AS gran_prix_has_x2,
          t.country AS track_country,
          'qualifying' AS session_type,
          qre.position,
          d.username AS driver_username,
          NULL::boolean AS fast_lap
        FROM gran_prix gp
        JOIN tracks t ON gp.track_id = t.id
        CROSS JOIN latest_season ls
        LEFT JOIN qualifying_result_entries qre ON qre.qualifying_results_id = gp.qualifying_results_id
        LEFT JOIN drivers d ON qre.pilot_id = d.id
        WHERE gp.season_id = COALESCE($1, ls.id)
          AND gp.qualifying_results_id IS NOT NULL
          AND qre.position IS NOT NULL
        
        UNION ALL
        
        -- Race Results
        SELECT 
          gp.id AS gran_prix_id,
          t.name AS track_name,
          gp.date AS gran_prix_date,
          gp.has_sprint AS gran_prix_has_sprint,
          gp.has_x2 AS gran_prix_has_x2,
          t.country AS track_country,
          'race' AS session_type,
          rre.position,
          d.username AS driver_username,
          rre.fast_lap
        FROM gran_prix gp
        JOIN tracks t ON gp.track_id = t.id
        CROSS JOIN latest_season ls
        LEFT JOIN race_result_entries rre ON rre.race_results_id = gp.race_results_id
        LEFT JOIN drivers d ON rre.pilot_id = d.id
        WHERE gp.season_id = COALESCE($1, ls.id)
          AND gp.race_results_id IS NOT NULL
          AND rre.position IS NOT NULL
        
        UNION ALL
        
        -- Sprint Results
        SELECT 
          gp.id AS gran_prix_id,
          t.name AS track_name,
          gp.date AS gran_prix_date,
          gp.has_sprint AS gran_prix_has_sprint,
          gp.has_x2 AS gran_prix_has_x2,
          t.country AS track_country,
          'sprint' AS session_type,
          sre.position,
          d.username AS driver_username,
          sre.fast_lap
        FROM gran_prix gp
        JOIN tracks t ON gp.track_id = t.id
        CROSS JOIN latest_season ls
        LEFT JOIN sprint_result_entries sre ON sre.sprint_results_id = gp.sprint_results_id
        LEFT JOIN drivers d ON sre.pilot_id = d.id
        WHERE gp.season_id = COALESCE($1, ls.id)
          AND gp.sprint_results_id IS NOT NULL
          AND sre.position IS NOT NULL
        
        UNION ALL
        
        -- Full Race Results
        SELECT 
          gp.id AS gran_prix_id,
          t.name AS track_name,
          gp.date AS gran_prix_date,
          gp.has_sprint AS gran_prix_has_sprint,
          gp.has_x2 AS gran_prix_has_x2,
          t.country AS track_country,
          'full_race' AS session_type,
          frre.position,
          d.username AS driver_username,
          frre.fast_lap
        FROM gran_prix gp
        JOIN tracks t ON gp.track_id = t.id
        CROSS JOIN latest_season ls
        LEFT JOIN full_race_result_entries frre ON frre.race_results_id = gp.full_race_results_id
        LEFT JOIN drivers d ON frre.pilot_id = d.id
        WHERE gp.season_id = COALESCE($1, ls.id)
          AND gp.full_race_results_id IS NOT NULL
          AND frre.position IS NOT NULL
      ),
      grand_prix_base AS (
        SELECT DISTINCT
          gran_prix_id,
          track_name,
          gran_prix_date,
          gran_prix_has_sprint,
          gran_prix_has_x2,
          track_country
        FROM all_session_results
        
        UNION
        
        -- Include Grand Prix without results
        SELECT 
          gp.id AS gran_prix_id,
          t.name AS track_name,
          gp.date AS gran_prix_date,
          gp.has_sprint AS gran_prix_has_sprint,
          gp.has_x2 AS gran_prix_has_x2,
          t.country AS track_country
        FROM gran_prix gp
        JOIN tracks t ON gp.track_id = t.id
        CROSS JOIN latest_season ls
        WHERE gp.season_id = COALESCE($1, ls.id)
      )
      SELECT 
        gpb.gran_prix_id,
        gpb.track_name,
        gpb.gran_prix_date,
        gpb.gran_prix_has_sprint,
        gpb.gran_prix_has_x2,
        gpb.track_country,
        asr.session_type,
        asr.position,
        asr.driver_username,
        asr.fast_lap
      FROM grand_prix_base gpb
      LEFT JOIN all_session_results asr ON gpb.gran_prix_id = asr.gran_prix_id
      ORDER BY gpb.gran_prix_date ASC, asr.session_type, asr.position;
    `, [seasonId]);

    // Process results into the required format
    const champMap = new Map();
    
    for (const row of result.rows) {
      const gpId = row.gran_prix_id.toString();
      
      if (!champMap.has(gpId)) {
        champMap.set(gpId, {
          gran_prix_id: gpId,
          track_name: row.track_name,
          gran_prix_date: row.gran_prix_date,
          gran_prix_has_sprint: Number(row.gran_prix_has_sprint) || 0,
          gran_prix_has_x2: Number(row.gran_prix_has_x2) || 0,
          track_country: row.track_country,
          sessions: {},
          fastLapDrivers: {}
        });
      }
      
      const champData = champMap.get(gpId);
      
      if (row.session_type && row.driver_username) {
        if (!champData.sessions[row.session_type]) {
          champData.sessions[row.session_type] = [];
        }
        
        champData.sessions[row.session_type].push({
          position: row.position,
          driver_username: row.driver_username,
          fast_lap: row.fast_lap
        });
        
        if (row.fast_lap === true) {
          champData.fastLapDrivers[row.session_type] = row.driver_username;
        }
      }
    }
    
    const formattedResults = Array.from(champMap.values())
      .sort((a, b) => new Date(a.gran_prix_date).getTime() - new Date(b.gran_prix_date).getTime());

    return formattedResults as ChampionshipData[];
  }

  async getCumulativePoints(seasonId?: number): Promise<CumulativePointsData[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
          SELECT id 
          FROM seasons 
          ORDER BY start_date DESC 
          LIMIT 1
      ),
      all_session_points AS (
          SELECT
              dgp.grand_prix_date AS date,
              dgp.track_name,
              dgp.pilot_id AS driver_id,
              dgp.pilot_username AS driver_username,
              dgp.pilot_id,
              dgp.position_points + dgp.fast_lap_points AS session_point
          FROM public.driver_grand_prix_points dgp
          CROSS JOIN latest_season ls
          WHERE dgp.season_id = COALESCE($1, ls.id)
      ),
      driver_colors AS (
          SELECT id AS driver_id, color AS driver_color
          FROM drivers
      )
      SELECT
          asp.date,
          asp.track_name,
          asp.driver_id,
          asp.driver_username,
          dc.driver_color,
          SUM(asp.session_point) OVER (PARTITION BY asp.driver_id ORDER BY asp.date, asp.track_name) AS cumulative_points
      FROM all_session_points asp
      LEFT JOIN driver_colors dc ON asp.driver_id = dc.driver_id
      GROUP BY asp.date, asp.track_name, asp.driver_id, asp.driver_username, dc.driver_color, asp.session_point
      ORDER BY asp.driver_id, asp.date, asp.track_name;
    `, [seasonId]);
    return result.rows as CumulativePointsData[];
  }

  async getAllTracks(seasonId?: number): Promise<TrackData[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
          SELECT id 
          FROM seasons 
          ORDER BY start_date DESC 
          LIMIT 1
      )
      SELECT outer_table_tracks.track_id, outer_table_tracks.name, outer_table_tracks.date, outer_table_tracks.has_sprint, outer_table_tracks.has_x2, outer_table_tracks.country, outer_table_tracks.besttime_driver_time,
      outer_table_drivers.username
      FROM
      (
          SELECT *
          FROM tracks
          LEFT JOIN
          (
              SELECT *
              FROM gran_prix
              CROSS JOIN latest_season ls
              WHERE gran_prix.season_id = COALESCE($1, ls.id)
          ) AS inner_table
          ON tracks.id = inner_table.track_id
      ) AS outer_table_tracks
      LEFT JOIN
      (
          SELECT *
          FROM drivers
      ) AS outer_table_drivers
      ON outer_table_tracks.besttime_driver_id = outer_table_drivers.id
      WHERE outer_table_tracks.date IS NOT NULL
      ORDER BY date ASC
    `, [seasonId]);
    return result.rows as TrackData[];
  }

  async getRaceResult(seasonId?: number): Promise<RaceResult[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
          SELECT id 
          FROM seasons 
          ORDER BY start_date DESC 
          LIMIT 1
      )
      SELECT
        gp.id AS id,
        gp.track_id AS track_id,
        MAX(CASE WHEN rre.position = 1 THEN rre.pilot_id END) AS id_1_place,
        MAX(CASE WHEN rre.position = 2 THEN rre.pilot_id END) AS id_2_place,
        MAX(CASE WHEN rre.position = 3 THEN rre.pilot_id END) AS id_3_place,
        MAX(CASE WHEN rre.position = 4 THEN rre.pilot_id END) AS id_4_place,
        MAX(CASE WHEN rre.position = 5 THEN rre.pilot_id END) AS id_5_place,
        MAX(CASE WHEN rre.position = 6 THEN rre.pilot_id END) AS id_6_place,
        MAX(CASE WHEN rre.position = 7 THEN rre.pilot_id END) AS id_7_place,
        MAX(CASE WHEN rre.position = 8 THEN rre.pilot_id END) AS id_8_place,
        MAX(CASE WHEN rre.fast_lap THEN rre.pilot_id END) AS id_fast_lap,
        ARRAY_AGG(rre.pilot_id) FILTER (WHERE rre.position = 0) AS list_dnf
      FROM gran_prix gp
      CROSS JOIN latest_season ls
      LEFT JOIN race_result_entries rre ON gp.race_results_id = rre.race_results_id
      WHERE gp.race_results_id IS NOT NULL 
        AND gp.season_id = COALESCE($1, ls.id)
      GROUP BY gp.id

      UNION ALL

      SELECT
        gp.id AS track_id,
        gp.track_id AS track_id,
        MAX(CASE WHEN frre.position = 1 THEN frre.pilot_id END) AS id_1_place,
        MAX(CASE WHEN frre.position = 2 THEN frre.pilot_id END) AS id_2_place,
        MAX(CASE WHEN frre.position = 3 THEN frre.pilot_id END) AS id_3_place,
        MAX(CASE WHEN frre.position = 4 THEN frre.pilot_id END) AS id_4_place,
        MAX(CASE WHEN frre.position = 5 THEN frre.pilot_id END) AS id_5_place,
        MAX(CASE WHEN frre.position = 6 THEN frre.pilot_id END) AS id_6_place,
        MAX(CASE WHEN frre.position = 7 then frre.pilot_id END) AS id_7_place,
        MAX(CASE WHEN frre.position = 8 THEN frre.pilot_id END) AS id_8_place,
        MAX(CASE WHEN frre.fast_lap THEN frre.pilot_id END) AS id_fast_lap,
        ARRAY_AGG(frre.pilot_id) FILTER (WHERE frre.position = 0) AS list_dnf
      FROM gran_prix gp
      CROSS JOIN latest_season ls
      LEFT JOIN full_race_result_entries frre ON gp.full_race_results_id = frre.race_results_id
      WHERE gp.full_race_results_id IS NOT NULL 
        AND gp.season_id = COALESCE($1, ls.id)
      GROUP BY gp.id
    `, [seasonId]);
    return result.rows as RaceResult[];
  }

  async getAllSeasons(): Promise<Season[]> {
    const result = await this.pool.query(`SELECT id, description, start_date, end_date FROM seasons ORDER BY id DESC`);
    return result.rows as Season[];
  }

  async getConstructors(seasonId?: number): Promise<Constructor[]> {
    const result = await this.pool.query(`
      SELECT constructor_id,
        constructor_name,
        constructor_color,
        driver_1_id,
        driver_1_username,
        driver_1_tot_points,
        driver_2_id,
        driver_2_username,
        driver_2_tot_points,
        constructor_tot_points
      FROM season_constructor_leaderboard
    `);
    return result.rows as Constructor[];
  }

  async getConstructorGrandPrixPoints(seasonId?: number): Promise<ConstructorGrandPrixPoints[]> {
    const result = await this.pool.query(`
      WITH latest_season AS (
        SELECT id FROM seasons ORDER BY start_date DESC LIMIT 1
      )
      SELECT
        constructor_id,
        constructor_name,
        grand_prix_id,
        grand_prix_date,
        track_name,
        track_id,
        season_id,
        season_description,
        driver_id_1,
        driver_id_2,
        driver_1_points,
        driver_2_points,
        constructor_points
      FROM constructor_grand_prix_points cgp
      CROSS JOIN latest_season ls
      WHERE cgp.season_id = COALESCE($1, ls.id)
      ORDER BY cgp.grand_prix_date DESC, cgp.constructor_points DESC;
    `, [seasonId]);
    return result.rows as ConstructorGrandPrixPoints[];
  }

  async setGpResult(
    trackId: number,
    hasSprint: boolean,
    raceResult: number[],
    raceDnfResult: number[],
    sprintResult: number[],
    sprintDnfResult: number[],
    qualiResult: number[],
    fpResult: number[],
    seasonId: number
  ): Promise<{ success: boolean; message: string }> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      const gpRes = await client.query(
        'SELECT id, race_results_id, sprint_results_id, qualifying_results_id, free_practice_results_id, full_race_results_id, has_x2 FROM gran_prix WHERE track_id = $1 and season_id = $2',
        [trackId, seasonId]
      );
      
      if (gpRes.rowCount === 0) throw new Error('Gran Prix not found');
      const gp = gpRes.rows[0];
      const hasX2Enabled = Number(gp.has_x2) === 1;
      const raceFastLapPilotId = raceResult[8];
      const sprintFastLapPilotId = sprintResult[8];

      // Handle Race or Full Race Results
      if (hasX2Enabled && gp.full_race_results_id) {
        await client.query('DELETE FROM full_race_result_entries WHERE race_results_id = $1', [gp.full_race_results_id]);
        for (let i = 0; i < 8; i++) {
          if (raceResult[i] && raceResult[i] !== 0) {
            await client.query(
              'INSERT INTO full_race_result_entries (race_results_id, pilot_id, position, fast_lap) VALUES ($1, $2, $3, $4)',
              [gp.full_race_results_id, raceResult[i], i+1, raceFastLapPilotId === raceResult[i]]
            );
          }
        }
        if (raceDnfResult && raceDnfResult.length > 0) {
          for (const pilotId of raceDnfResult) {
            await client.query(
              'INSERT INTO full_race_result_entries (race_results_id, pilot_id, position, fast_lap) VALUES ($1, $2, $3, $4)',
              [gp.full_race_results_id, pilotId, 0, false]
            );
          }
        }
      } else if (gp.race_results_id) {
        await client.query('DELETE FROM race_result_entries WHERE race_results_id = $1', [gp.race_results_id]);
        for (let i = 0; i < 8; i++) {
          if (raceResult[i] && raceResult[i] !== 0) {
            await client.query(
              'INSERT INTO race_result_entries (race_results_id, pilot_id, position, fast_lap) VALUES ($1, $2, $3, $4)',
              [gp.race_results_id, raceResult[i], i+1, raceFastLapPilotId === raceResult[i]]
            );
          }
        }
        if (raceDnfResult && raceDnfResult.length > 0) {
          for (const pilotId of raceDnfResult) {
            await client.query(
              'INSERT INTO race_result_entries (race_results_id, pilot_id, position, fast_lap) VALUES ($1, $2, $3, $4)',
              [gp.race_results_id, pilotId, 0, false]
            );
          }
        }
      }

      // Handle Sprint Results
      if (hasSprint && gp.sprint_results_id) {
        await client.query('DELETE FROM sprint_result_entries WHERE sprint_results_id = $1', [gp.sprint_results_id]);
        for (let i = 0; i < 8; i++) {
          if (sprintResult[i] && sprintResult[i] !== 0) {
            await client.query(
              'INSERT INTO sprint_result_entries (sprint_results_id, pilot_id, position, fast_lap) VALUES ($1, $2, $3, $4)',
              [gp.sprint_results_id, sprintResult[i], i+1, sprintFastLapPilotId === sprintResult[i]]
            );
          }
        }
        if (sprintDnfResult && sprintDnfResult.length > 0) {
          for (const pilotId of sprintDnfResult) {
            await client.query(
              'INSERT INTO sprint_result_entries (sprint_results_id, pilot_id, position, fast_lap) VALUES ($1, $2, $3, $4)',
              [gp.sprint_results_id, pilotId, 0, false]
            );
          }
        }
      }

      // Handle Qualifying Results
      if (gp.qualifying_results_id) {
        await client.query('DELETE FROM qualifying_result_entries WHERE qualifying_results_id = $1', [gp.qualifying_results_id]);
        for (let i = 0; i < 8; i++) {
          if (qualiResult[i] && qualiResult[i] !== 0) {
            await client.query(
              'INSERT INTO qualifying_result_entries (qualifying_results_id, pilot_id, position) VALUES ($1, $2, $3)',
              [gp.qualifying_results_id, qualiResult[i], i+1]
            );
          }
        }
      }

      // Handle Free Practice Results
      if (gp.free_practice_results_id) {
        await client.query('DELETE FROM free_practice_result_entries WHERE free_practice_results_id = $1', [gp.free_practice_results_id]);
        for (let i = 0; i < 8; i++) {
          if (fpResult[i] && fpResult[i] !== 0) {
            await client.query(
              'INSERT INTO free_practice_result_entries (free_practice_results_id, pilot_id, position) VALUES ($1, $2, $3)',
              [gp.free_practice_results_id, fpResult[i], i+1]
            );
          }
        }
      }

      await client.query('COMMIT');
      return {
        success: true,
        message: 'Race result saved successfully'
      };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('[setGpResult] Error saving race result:', error);
      return {
        success: false,
        message: `Failed to save race result: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    } finally {
      client.release();
    }
  }
}
