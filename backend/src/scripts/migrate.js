import { query } from '../config/database.js';

const createTables = async () => {
  try {
    console.log('🚀 Starting database migration...');

    // Users table for authentication
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Publishers table
    await query(`
      CREATE TABLE IF NOT EXISTS publishers (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        location VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        website VARCHAR(255),
        logo_url VARCHAR(500),
        founded_year INTEGER,
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Labels table
    await query(`
      CREATE TABLE IF NOT EXISTS labels (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        publisher_id VARCHAR(36),
        location VARCHAR(255),
        founded_year INTEGER,
        logo_url VARCHAR(500),
        genres JSON,
        status VARCHAR(50) DEFAULT 'active',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE SET NULL
      );
    `);

    // Artists table
    await query(`
      CREATE TABLE IF NOT EXISTS artists (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        stage_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        birth_date DATE,
        nationality VARCHAR(100),
        genres JSON,
        bio TEXT,
        image_url VARCHAR(500),
        social_media JSON,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Recordings table
    await query(`
      CREATE TABLE IF NOT EXISTS recordings (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        title VARCHAR(255) NOT NULL,
        artist_id VARCHAR(36),
        album VARCHAR(255),
        duration INTEGER, -- in seconds
        recorded_date DATE,
        genre VARCHAR(100),
        bpm INTEGER,
        key_signature VARCHAR(20),
        producer VARCHAR(255),
        studio VARCHAR(255),
        status VARCHAR(50) DEFAULT 'recording',
        file_url VARCHAR(500),
        cover_url VARCHAR(500),
        metadata JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
      );
    `);

    // Releases table
    await query(`
      CREATE TABLE IF NOT EXISTS releases (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        title VARCHAR(255) NOT NULL,
        artist_id VARCHAR(36),
        label_id VARCHAR(36),
        type VARCHAR(50) NOT NULL, -- album, ep, single, compilation
        release_date DATE,
        total_duration INTEGER, -- in seconds
        track_count INTEGER,
        cover_url VARCHAR(500),
        genres JSON,
        platforms JSON,
        status VARCHAR(50) DEFAULT 'draft',
        upc VARCHAR(50),
        catalog_number VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
        FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE SET NULL
      );
    `);

    // Release tracks junction table
    await query(`
      CREATE TABLE IF NOT EXISTS release_tracks (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        release_id VARCHAR(36),
        recording_id VARCHAR(36),
        track_number INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(release_id, track_number),
        FOREIGN KEY (release_id) REFERENCES releases(id) ON DELETE CASCADE,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );
    `);

    // Royalties table
    await query(`
      CREATE TABLE IF NOT EXISTS royalties (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        recording_id VARCHAR(36),
        artist_id VARCHAR(36),
        publisher_id VARCHAR(36),
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        platform VARCHAR(100),
        streams BIGINT DEFAULT 0,
        revenue DECIMAL(12, 2) DEFAULT 0.00,
        currency VARCHAR(3) DEFAULT 'USD',
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE,
        FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
        FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE SET NULL
      );
    `);

    // Analytics table for tracking performance
    await query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        entity_type VARCHAR(50) NOT NULL, -- recording, release, artist
        entity_id VARCHAR(36) NOT NULL,
        metric_type VARCHAR(100) NOT NULL, -- streams, downloads, revenue
        metric_value BIGINT NOT NULL,
        date DATE NOT NULL,
        platform VARCHAR(100),
        country VARCHAR(3),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(entity_type, entity_id, metric_type, date, platform, country)
      );
    `);

    // Create indexes for better performance
    await query(`CREATE INDEX idx_recordings_artist_id ON recordings(artist_id);`);
    await query(`CREATE INDEX idx_releases_artist_id ON releases(artist_id);`);
    await query(`CREATE INDEX idx_releases_label_id ON releases(label_id);`);
    await query(`CREATE INDEX idx_royalties_recording_id ON royalties(recording_id);`);
    await query(`CREATE INDEX idx_royalties_artist_id ON royalties(artist_id);`);
    await query(`CREATE INDEX idx_analytics_entity ON analytics(entity_type, entity_id);`);
    await query(`CREATE INDEX idx_analytics_date ON analytics(date);`);

    console.log('✅ Database migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createTables().then(() => {
    console.log('🎉 Migration finished. Exiting...');
    process.exit(0);
  });
}

export { createTables };
