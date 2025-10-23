/**
 * Database Service
 * Manages SQLite database initialization, connections, and operations
 */

import SQLite from 'react-native-sqlite-storage';
import {
  ALL_TABLE_CREATION_STATEMENTS,
  ALL_INDEX_CREATION_STATEMENTS,
} from './schema';

// Enable debugging in development
SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

const DATABASE_NAME = 'nutriflow.db';
const DATABASE_VERSION = '1.0';
const DATABASE_DISPLAY_NAME = 'NutriFlow Database';
const DATABASE_SIZE = 200000;

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized: boolean = false;

  /**
   * Initialize database and create tables
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Database already initialized');
      return;
    }

    try {
      console.log('Initializing database...');

      // Open database
      this.db = await SQLite.openDatabase({
        name: DATABASE_NAME,
        location: 'default',
      });

      console.log('Database opened successfully');

      // Create tables
      await this.createTables();

      // Create indexes
      await this.createIndexes();

      this.isInitialized = true;
      console.log('Database initialization complete');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  /**
   * Create all database tables
   */
  private async createTables(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not opened');
    }

    console.log('Creating tables...');

    for (const statement of ALL_TABLE_CREATION_STATEMENTS) {
      try {
        await this.db.executeSql(statement);
      } catch (error) {
        console.error('Error creating table:', error);
        throw error;
      }
    }

    console.log('All tables created successfully');
  }

  /**
   * Create all database indexes
   */
  private async createIndexes(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not opened');
    }

    console.log('Creating indexes...');

    for (const statement of ALL_INDEX_CREATION_STATEMENTS) {
      try {
        // Split multiple index statements
        const statements = statement
          .split(';')
          .filter(s => s.trim().length > 0);

        for (const stmt of statements) {
          await this.db.executeSql(stmt);
        }
      } catch (error) {
        console.error('Error creating indexes:', error);
        throw error;
      }
    }

    console.log('All indexes created successfully');
  }

  /**
   * Get database instance
   */
  getDatabase(): SQLite.SQLiteDatabase {
    if (!this.db || !this.isInitialized) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.db;
  }

  /**
   * Execute SQL query
   */
  async executeSql(
    sql: string,
    params: any[] = [],
  ): Promise<SQLite.ResultSet[]> {
    const db = this.getDatabase();
    const [results] = await db.executeSql(sql, params);
    return [results];
  }

  /**
   * Execute multiple SQL statements in a transaction
   */
  async executeTransaction(
    statements: Array<{ sql: string; params?: any[] }>,
  ): Promise<void> {
    const db = this.getDatabase();

    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          statements.forEach(({ sql, params = [] }) => {
            tx.executeSql(sql, params);
          });
        },
        error => {
          console.error('Transaction error:', error);
          reject(error);
        },
        () => {
          resolve();
        },
      );
    });
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isInitialized = false;
      console.log('Database closed');
    }
  }

  /**
   * Delete database (use with caution!)
   */
  async deleteDatabase(): Promise<void> {
    try {
      await this.close();
      await SQLite.deleteDatabase({ name: DATABASE_NAME, location: 'default' });
      console.log('Database deleted');
    } catch (error) {
      console.error('Error deleting database:', error);
      throw error;
    }
  }

  /**
   * Clear all data from tables (but keep structure)
   */
  async clearAllData(): Promise<void> {
    const db = this.getDatabase();

    const tables = [
      'diary_entries',
      'daily_summaries',
      'activities',
      'fasting_sessions',
      'favorite_foods',
      'measurements_history',
      'recipes',
      // Don't clear users and foods tables as they might be needed
    ];

    await this.executeTransaction(
      tables.map(table => ({
        sql: `DELETE FROM ${table}`,
      })),
    );

    console.log('All data cleared');
  }

  /**
   * Get database statistics
   */
  async getStatistics(): Promise<Record<string, number>> {
    const db = this.getDatabase();
    const stats: Record<string, number> = {};

    const tables = [
      'users',
      'foods',
      'diary_entries',
      'daily_summaries',
      'activities',
      'fasting_sessions',
      'recipes',
      'favorite_foods',
      'measurements_history',
    ];

    for (const table of tables) {
      try {
        const [result] = await db.executeSql(
          `SELECT COUNT(*) as count FROM ${table}`,
        );
        stats[table] = result.rows.item(0).count;
      } catch (error) {
        console.error(`Error getting count for ${table}:`, error);
        stats[table] = 0;
      }
    }

    return stats;
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
