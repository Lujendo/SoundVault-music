import { query } from '../config/database.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (in reverse order due to foreign keys)
    await query('DELETE FROM analytics');
    await query('DELETE FROM royalties');
    await query('DELETE FROM release_tracks');
    await query('DELETE FROM releases');
    await query('DELETE FROM recordings');
    await query('DELETE FROM artists');
    await query('DELETE FROM labels');
    await query('DELETE FROM publishers');
    await query('DELETE FROM users');

    console.log('🗑️ Cleared existing data');

    // Seed Users
    const users = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'admin@soundvault.com',
        password_hash: '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZ',
        first_name: 'Alex',
        last_name: 'Johnson',
        role: 'admin'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'manager@soundvault.com',
        password_hash: '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZ',
        first_name: 'Sarah',
        last_name: 'Williams',
        role: 'manager'
      }
    ];

    for (const user of users) {
      await query(
        'INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)',
        [user.id, user.email, user.password_hash, user.first_name, user.last_name, user.role]
      );
    }

    // Seed Publishers
    const publishers = [
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        name: 'Stellar Music Publishing',
        type: 'Major Label',
        location: 'Los Angeles, CA',
        email: 'contact@stellarmusic.com',
        website: 'stellarmusic.com',
        logo_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        founded_year: 1995
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Urban Sounds Publishing',
        type: 'Independent',
        location: 'Atlanta, GA',
        email: 'info@urbansounds.com',
        website: 'urbansounds.com',
        logo_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        founded_year: 2008
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Indie Collective',
        type: 'Boutique',
        location: 'Nashville, TN',
        email: 'hello@indiecollective.com',
        website: 'indiecollective.com',
        logo_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        founded_year: 2015
      }
    ];

    for (const publisher of publishers) {
      await query(
        'INSERT INTO publishers (id, name, type, location, email, website, logo_url, founded_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [publisher.id, publisher.name, publisher.type, publisher.location, publisher.email, publisher.website, publisher.logo_url, publisher.founded_year]
      );
    }

    // Seed Labels
    const labels = [
      {
        id: '550e8400-e29b-41d4-a716-446655440020',
        name: 'Stellar Records',
        type: 'Major Label',
        publisher_id: '550e8400-e29b-41d4-a716-446655440010',
        location: 'Los Angeles, CA',
        founded_year: 1995,
        logo_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genres: JSON.stringify(['Pop', 'Rock', 'Electronic']),
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440021',
        name: 'Urban Vibes',
        type: 'Independent',
        publisher_id: '550e8400-e29b-41d4-a716-446655440011',
        location: 'Atlanta, GA',
        founded_year: 2008,
        logo_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        genres: JSON.stringify(['Hip-Hop', 'R&B', 'Trap']),
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440022',
        name: 'Indie Dreams',
        type: 'Boutique',
        publisher_id: '550e8400-e29b-41d4-a716-446655440012',
        location: 'Nashville, TN',
        founded_year: 2015,
        logo_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genres: JSON.stringify(['Indie', 'Folk', 'Alternative']),
        status: 'active'
      }
    ];

    for (const label of labels) {
      await query(
        'INSERT INTO labels (id, name, type, publisher_id, location, founded_year, logo_url, genres, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [label.id, label.name, label.type, label.publisher_id, label.location, label.founded_year, label.logo_url, label.genres, label.status]
      );
    }

    // Seed Artists
    const artists = [
      {
        id: '550e8400-e29b-41d4-a716-446655440030',
        name: 'Luna Rodriguez',
        stage_name: 'Luna',
        email: 'luna@example.com',
        phone: '+1-555-0101',
        birth_date: '1995-03-15',
        nationality: 'American',
        genres: JSON.stringify(['Pop', 'Electronic']),
        bio: 'Rising pop star with electronic influences',
        image_url: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&h=400&fit=crop&crop=face',
        social_media: JSON.stringify({
          instagram: '@lunamusic',
          spotify: 'Luna Rodriguez',
          youtube: 'LunaOfficialMusic'
        })
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440031',
        name: 'Marcus Chen',
        stage_name: 'MC Marcus',
        email: 'marcus@example.com',
        phone: '+1-555-0102',
        birth_date: '1992-08-22',
        nationality: 'American',
        genres: JSON.stringify(['Hip-Hop', 'Rap']),
        bio: 'Hip-hop artist from Atlanta with powerful lyrics',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        social_media: JSON.stringify({
          instagram: '@mcmarcus',
          spotify: 'MC Marcus',
          youtube: 'MCMarcusOfficial'
        })
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440032',
        name: 'Aria Thompson',
        stage_name: 'Aria',
        email: 'aria@example.com',
        phone: '+1-555-0103',
        birth_date: '1998-12-05',
        nationality: 'American',
        genres: JSON.stringify(['Indie', 'Folk']),
        bio: 'Indie folk singer-songwriter from Nashville',
        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        social_media: JSON.stringify({
          instagram: '@ariasounds',
          spotify: 'Aria Thompson',
          youtube: 'AriaThompsonMusic'
        })
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440033',
        name: 'Phoenix Williams',
        stage_name: 'DJ Phoenix',
        email: 'phoenix@example.com',
        phone: '+1-555-0104',
        birth_date: '1990-06-18',
        nationality: 'American',
        genres: JSON.stringify(['Electronic', 'EDM', 'House']),
        bio: 'Electronic music producer and DJ',
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        social_media: JSON.stringify({
          instagram: '@djphoenix',
          spotify: 'DJ Phoenix',
          youtube: 'DJPhoenixOfficial'
        })
      }
    ];

    for (const artist of artists) {
      await query(
        'INSERT INTO artists (id, name, stage_name, email, phone, birth_date, nationality, genres, bio, image_url, social_media) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [artist.id, artist.name, artist.stage_name, artist.email, artist.phone, artist.birth_date, artist.nationality, artist.genres, artist.bio, artist.image_url, artist.social_media]
      );
    }

    // Seed Recordings
    const recordings = [
      {
        id: '550e8400-e29b-41d4-a716-446655440040',
        title: 'Midnight Dreams',
        artist_id: '550e8400-e29b-41d4-a716-446655440030',
        album: 'Neon Nights',
        duration: 210,
        recorded_date: '2023-06-15',
        genre: 'Pop',
        bpm: 120,
        key_signature: 'C Major',
        producer: 'Alex Producer',
        studio: 'Stellar Studios',
        status: 'mastered',
        cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440041',
        title: 'Street Symphony',
        artist_id: '550e8400-e29b-41d4-a716-446655440031',
        album: 'Urban Tales',
        duration: 195,
        recorded_date: '2023-07-20',
        genre: 'Hip-Hop',
        bpm: 95,
        key_signature: 'G Minor',
        producer: 'Beat Master',
        studio: 'Urban Studios',
        status: 'mastered',
        cover_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440042',
        title: 'Whispered Secrets',
        artist_id: '550e8400-e29b-41d4-a716-446655440032',
        album: 'Mountain High',
        duration: 245,
        recorded_date: '2023-05-10',
        genre: 'Indie',
        bpm: 85,
        key_signature: 'D Major',
        producer: 'Indie Producer',
        studio: 'Nashville Sound',
        status: 'recording',
        cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440043',
        title: 'Neon Nights',
        artist_id: '550e8400-e29b-41d4-a716-446655440033',
        album: 'Electric Dreams',
        duration: 320,
        recorded_date: '2023-08-05',
        genre: 'Electronic',
        bpm: 128,
        key_signature: 'A Minor',
        producer: 'Phoenix Williams',
        studio: 'Electric Studios',
        status: 'mastered',
        cover_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop'
      }
    ];

    for (const recording of recordings) {
      await query(
        'INSERT INTO recordings (id, title, artist_id, album, duration, recorded_date, genre, bpm, key_signature, producer, studio, status, cover_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [recording.id, recording.title, recording.artist_id, recording.album, recording.duration, recording.recorded_date, recording.genre, recording.bpm, recording.key_signature, recording.producer, recording.studio, recording.status, recording.cover_url]
      );
    }

    // Seed Releases
    const releases = [
      {
        id: '550e8400-e29b-41d4-a716-446655440050',
        title: 'Neon Nights',
        artist_id: '550e8400-e29b-41d4-a716-446655440030',
        label_id: '550e8400-e29b-41d4-a716-446655440020',
        type: 'Album',
        release_date: '2023-09-15',
        total_duration: 2520,
        track_count: 12,
        cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genres: JSON.stringify(['Pop', 'Electronic']),
        platforms: JSON.stringify(['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music']),
        status: 'released',
        upc: '123456789012',
        catalog_number: 'STL001'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440051',
        title: 'Urban Tales',
        artist_id: '550e8400-e29b-41d4-a716-446655440031',
        label_id: '550e8400-e29b-41d4-a716-446655440021',
        type: 'EP',
        release_date: '2023-10-01',
        total_duration: 1170,
        track_count: 6,
        cover_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        genres: JSON.stringify(['Hip-Hop', 'Rap']),
        platforms: JSON.stringify(['Spotify', 'Apple Music', 'SoundCloud']),
        status: 'released',
        upc: '123456789013',
        catalog_number: 'URB001'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440052',
        title: 'Mountain High',
        artist_id: '550e8400-e29b-41d4-a716-446655440032',
        label_id: '550e8400-e29b-41d4-a716-446655440022',
        type: 'Single',
        release_date: '2023-11-15',
        total_duration: 245,
        track_count: 1,
        cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genres: JSON.stringify(['Indie', 'Folk']),
        platforms: JSON.stringify(['Spotify', 'Bandcamp']),
        status: 'pre-release',
        upc: '123456789014',
        catalog_number: 'IND001'
      }
    ];

    for (const release of releases) {
      await query(
        'INSERT INTO releases (id, title, artist_id, label_id, type, release_date, total_duration, track_count, cover_url, genres, platforms, status, upc, catalog_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [release.id, release.title, release.artist_id, release.label_id, release.type, release.release_date, release.total_duration, release.track_count, release.cover_url, release.genres, release.platforms, release.status, release.upc, release.catalog_number]
      );
    }

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    console.log('🎉 Seeding finished. Exiting...');
    process.exit(0);
  });
}

export { seedDatabase };
