/**
 * Database Schema Definition
 * SQL statements for creating all database tables
 */

export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    settings_json TEXT,
    goals_json TEXT,
    measurements_json TEXT,
    is_premium INTEGER DEFAULT 0,
    premium_expires_at DATETIME
  );
`;

export const CREATE_FOODS_TABLE = `
  CREATE TABLE IF NOT EXISTS foods (
    id TEXT PRIMARY KEY,
    barcode TEXT UNIQUE,
    name TEXT NOT NULL,
    brand TEXT,
    serving_size REAL NOT NULL,
    serving_unit TEXT NOT NULL,
    calories REAL NOT NULL,
    carbs REAL NOT NULL,
    proteins REAL NOT NULL,
    fats REAL NOT NULL,
    saturated_fats REAL,
    trans_fats REAL,
    fiber REAL,
    sugar REAL,
    sodium REAL,
    cholesterol REAL,
    category TEXT,
    verified INTEGER DEFAULT 0,
    user_created INTEGER DEFAULT 0,
    image_url TEXT,
    popularity INTEGER DEFAULT 0,
    last_used DATETIME,
    use_count INTEGER DEFAULT 0,
    vitamins_json TEXT,
    minerals_json TEXT
  );
`;

export const CREATE_FOODS_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_foods_name ON foods(name);
  CREATE INDEX IF NOT EXISTS idx_foods_barcode ON foods(barcode);
  CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);
  CREATE INDEX IF NOT EXISTS idx_foods_popularity ON foods(popularity DESC);
  CREATE INDEX IF NOT EXISTS idx_foods_user_created ON foods(user_created);
`;

export const CREATE_DIARY_ENTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS diary_entries (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    food_id TEXT NOT NULL,
    servings REAL NOT NULL,
    calories REAL NOT NULL,
    carbs REAL NOT NULL,
    proteins REAL NOT NULL,
    fats REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    image_url TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(food_id) REFERENCES foods(id)
  );
`;

export const CREATE_DIARY_ENTRIES_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_diary_user_date ON diary_entries(user_id, date);
  CREATE INDEX IF NOT EXISTS idx_diary_date ON diary_entries(date);
  CREATE INDEX IF NOT EXISTS idx_diary_meal_type ON diary_entries(meal_type);
`;

export const CREATE_DAILY_SUMMARIES_TABLE = `
  CREATE TABLE IF NOT EXISTS daily_summaries (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    water_intake REAL DEFAULT 0,
    weight REAL,
    steps INTEGER,
    total_calories REAL DEFAULT 0,
    total_carbs REAL DEFAULT 0,
    total_proteins REAL DEFAULT 0,
    total_fats REAL DEFAULT 0,
    notes TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    UNIQUE(user_id, date)
  );
`;

export const CREATE_DAILY_SUMMARIES_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_summaries_user_date ON daily_summaries(user_id, date);
`;

export const CREATE_ACTIVITIES_TABLE = `
  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    activity_type TEXT NOT NULL,
    duration INTEGER NOT NULL,
    calories_burned REAL NOT NULL,
    intensity TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`;

export const CREATE_ACTIVITIES_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_activities_user_date ON activities(user_id, date);
`;

export const CREATE_FASTING_SESSIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS fasting_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    duration REAL NOT NULL,
    completed INTEGER DEFAULT 0,
    notes TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`;

export const CREATE_FASTING_SESSIONS_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_fasting_user ON fasting_sessions(user_id);
  CREATE INDEX IF NOT EXISTS idx_fasting_completed ON fasting_sessions(completed);
`;

export const CREATE_RECIPES_TABLE = `
  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    difficulty TEXT,
    category TEXT,
    tags TEXT,
    ingredients_json TEXT,
    instructions_json TEXT,
    nutrition_json TEXT,
    is_premium INTEGER DEFAULT 0,
    rating REAL,
    rating_count INTEGER DEFAULT 0
  );
`;

export const CREATE_RECIPES_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
  CREATE INDEX IF NOT EXISTS idx_recipes_premium ON recipes(is_premium);
  CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);
`;

export const CREATE_FAVORITE_FOODS_TABLE = `
  CREATE TABLE IF NOT EXISTS favorite_foods (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    food_id TEXT NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(food_id) REFERENCES foods(id),
    UNIQUE(user_id, food_id)
  );
`;

export const CREATE_FAVORITE_FOODS_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorite_foods(user_id);
`;

export const CREATE_MEASUREMENTS_HISTORY_TABLE = `
  CREATE TABLE IF NOT EXISTS measurements_history (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    weight REAL,
    body_fat REAL,
    muscle_mass REAL,
    waist REAL,
    hips REAL,
    chest REAL,
    bmi REAL,
    notes TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`;

export const CREATE_MEASUREMENTS_HISTORY_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_measurements_user_date ON measurements_history(user_id, date);
`;

// Array of all table creation statements in order
export const ALL_TABLE_CREATION_STATEMENTS = [
  CREATE_USERS_TABLE,
  CREATE_FOODS_TABLE,
  CREATE_DIARY_ENTRIES_TABLE,
  CREATE_DAILY_SUMMARIES_TABLE,
  CREATE_ACTIVITIES_TABLE,
  CREATE_FASTING_SESSIONS_TABLE,
  CREATE_RECIPES_TABLE,
  CREATE_FAVORITE_FOODS_TABLE,
  CREATE_MEASUREMENTS_HISTORY_TABLE,
];

// Array of all index creation statements
export const ALL_INDEX_CREATION_STATEMENTS = [
  CREATE_FOODS_INDEXES,
  CREATE_DIARY_ENTRIES_INDEXES,
  CREATE_DAILY_SUMMARIES_INDEXES,
  CREATE_ACTIVITIES_INDEXES,
  CREATE_FASTING_SESSIONS_INDEXES,
  CREATE_RECIPES_INDEXES,
  CREATE_FAVORITE_FOODS_INDEXES,
  CREATE_MEASUREMENTS_HISTORY_INDEXES,
];
