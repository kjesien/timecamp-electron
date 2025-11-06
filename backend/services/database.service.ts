import Database from 'better-sqlite3';
import path from 'node:path';
import { app } from 'electron';
import { ActivityData } from '../types';

export class DatabaseService {
  private db: Database.Database;

  constructor() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'timecamp.db');

    this.db = new Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        application_id TEXT NOT NULL,
        end_time TEXT NOT NULL,
        time_span INTEGER NOT NULL,
        window_title_id TEXT NOT NULL,
        end_date TEXT NOT NULL,
        task_id TEXT NOT NULL,
        entry_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, end_time, window_title_id)
      )
    `);

    // Create index for faster queries
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_end_date ON activities(end_date);
      CREATE INDEX IF NOT EXISTS idx_user_id ON activities(user_id);
    `);
  }

  saveActivities(activities: ActivityData[]): void {
    const insert = this.db.prepare(`
      INSERT OR REPLACE INTO activities
      (user_id, application_id, end_time, time_span, window_title_id, end_date, task_id, entry_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = this.db.transaction((activities: ActivityData[]) => {
      for (const activity of activities) {
        insert.run(
          activity.user_id,
          activity.application_id,
          activity.end_time,
          activity.time_span,
          activity.window_title_id,
          activity.end_date,
          activity.task_id,
          activity.entry_id
        );
      }
    });

    insertMany(activities);
  }

  getActivities(dates: string[]): ActivityData[] {
    const placeholders = dates.map(() => '?').join(',');
    const query = `
      SELECT user_id, application_id, end_time, time_span, window_title_id, end_date, task_id, entry_id
      FROM activities
      WHERE end_date IN (${placeholders})
      ORDER BY end_time DESC
    `;

    const stmt = this.db.prepare(query);
    return stmt.all(...dates) as ActivityData[];
  }

  getAllActivities(): ActivityData[] {
    const query = `
      SELECT user_id, application_id, end_time, time_span, window_title_id, end_date, task_id, entry_id
      FROM activities
      ORDER BY end_time DESC
    `;

    const stmt = this.db.prepare(query);
    return stmt.all() as ActivityData[];
  }

  clearActivities(): void {
    this.db.prepare('DELETE FROM activities').run();
  }

  close(): void {
    this.db.close();
  }
}
