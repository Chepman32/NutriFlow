/**
 * Database Migrations
 * Handles database schema updates and migrations
 */

import { databaseService } from '../DatabaseService';

export interface Migration {
  version: number;
  name: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

/**
 * Migration v1: Initial schema
 */
const migration_v1: Migration = {
  version: 1,
  name: 'initial_schema',
  up: async () => {
    // Tables are created in DatabaseService initialization
    console.log('Migration v1: Initial schema already applied');
  },
  down: async () => {
    // Drop all tables
    const tables = [
      'measurements_history',
      'favorite_foods',
      'recipes',
      'fasting_sessions',
      'activities',
      'daily_summaries',
      'diary_entries',
      'foods',
      'users',
    ];

    for (const table of tables) {
      await databaseService.executeSql(`DROP TABLE IF EXISTS ${table}`);
    }

    console.log('Migration v1: All tables dropped');
  },
};

/**
 * Migration v2: Add performance indexes (example for future)
 */
const migration_v2: Migration = {
  version: 2,
  name: 'add_performance_indexes',
  up: async () => {
    // Example: Add additional indexes for better query performance
    await databaseService.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_diary_created_at ON diary_entries(created_at DESC)',
    );
    console.log('Migration v2: Performance indexes added');
  },
  down: async () => {
    await databaseService.executeSql('DROP INDEX IF EXISTS idx_diary_created_at');
    console.log('Migration v2: Performance indexes removed');
  },
};

// List of all migrations in order
export const migrations: Migration[] = [
  migration_v1,
  // migration_v2, // Uncomment when needed
];

/**
 * Get current database version from metadata
 */
async function getCurrentVersion(): Promise<number> {
  try {
    // Create metadata table if it doesn't exist
    await databaseService.executeSql(`
      CREATE TABLE IF NOT EXISTS metadata (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `);

    const [result] = await databaseService.executeSql(
      "SELECT value FROM metadata WHERE key = 'db_version'",
    );

    if (result.rows.length > 0) {
      return parseInt(result.rows.item(0).value, 10);
    }

    return 0;
  } catch (error) {
    console.error('Error getting current version:', error);
    return 0;
  }
}

/**
 * Set database version in metadata
 */
async function setVersion(version: number): Promise<void> {
  await databaseService.executeSql(
    "INSERT OR REPLACE INTO metadata (key, value) VALUES ('db_version', ?)",
    [version.toString()],
  );
}

/**
 * Run pending migrations
 */
export async function runMigrations(): Promise<void> {
  console.log('Checking for pending migrations...');

  const currentVersion = await getCurrentVersion();
  console.log(`Current database version: ${currentVersion}`);

  const pendingMigrations = migrations.filter(m => m.version > currentVersion);

  if (pendingMigrations.length === 0) {
    console.log('No pending migrations');
    return;
  }

  console.log(`Running ${pendingMigrations.length} pending migrations...`);

  for (const migration of pendingMigrations) {
    try {
      console.log(`Running migration ${migration.version}: ${migration.name}`);
      await migration.up();
      await setVersion(migration.version);
      console.log(`Migration ${migration.version} completed successfully`);
    } catch (error) {
      console.error(`Migration ${migration.version} failed:`, error);
      throw error;
    }
  }

  console.log('All migrations completed successfully');
}

/**
 * Rollback to specific version
 */
export async function rollbackTo(targetVersion: number): Promise<void> {
  console.log(`Rolling back to version ${targetVersion}...`);

  const currentVersion = await getCurrentVersion();

  if (targetVersion >= currentVersion) {
    console.log('Target version is same or higher than current version');
    return;
  }

  const migrationsToRollback = migrations
    .filter(m => m.version > targetVersion && m.version <= currentVersion)
    .reverse();

  for (const migration of migrationsToRollback) {
    try {
      console.log(`Rolling back migration ${migration.version}: ${migration.name}`);
      await migration.down();
      console.log(`Migration ${migration.version} rolled back successfully`);
    } catch (error) {
      console.error(`Rollback of migration ${migration.version} failed:`, error);
      throw error;
    }
  }

  await setVersion(targetVersion);
  console.log(`Rollback to version ${targetVersion} completed`);
}
