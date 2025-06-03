import { query } from '../config/database.js';

// @desc    Get all artists
// @route   GET /api/artists
// @access  Public
export const getArtists = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, genre } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT a.*, 
             COUNT(DISTINCT r.id) as song_count,
             COUNT(DISTINCT rel.id) as release_count,
             COALESCE(SUM(roy.revenue), 0) as total_revenue
      FROM artists a
      LEFT JOIN recordings r ON r.artist_id = a.id
      LEFT JOIN releases rel ON rel.artist_id = a.id
      LEFT JOIN royalties roy ON roy.artist_id = a.id
      WHERE a.is_active = true
    `;

    const queryParams = [];

    if (search) {
      queryText += ` AND (a.name LIKE ? OR a.stage_name LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
      queryText += ` AND JSON_CONTAINS(a.genres, ?)`;
      queryParams.push(`"${genre}"`);
    }

    queryText += ` GROUP BY a.id ORDER BY a.name`;
    queryText += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await query(queryText, queryParams);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as count FROM artists WHERE is_active = true`;
    const countParams = [];

    if (search) {
      countQuery += ` AND (name LIKE ? OR stage_name LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
      countQuery += ` AND JSON_CONTAINS(genres, ?)`;
      countParams.push(`"${genre}"`);
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single artist
// @route   GET /api/artists/:id
// @access  Public
export const getArtist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT a.*, 
              COUNT(DISTINCT r.id) as song_count,
              COUNT(DISTINCT rel.id) as release_count,
              COALESCE(SUM(roy.revenue), 0) as total_revenue
       FROM artists a
       LEFT JOIN recordings r ON r.artist_id = a.id
       LEFT JOIN releases rel ON rel.artist_id = a.id
       LEFT JOIN royalties roy ON roy.artist_id = a.id
       WHERE a.id = ? AND a.is_active = true
       GROUP BY a.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new artist
// @route   POST /api/artists
// @access  Private
export const createArtist = async (req, res, next) => {
  try {
    const {
      name,
      stage_name,
      email,
      phone,
      birth_date,
      nationality,
      genres,
      bio,
      image_url,
      social_media
    } = req.body;

    const result = await query(
      `INSERT INTO artists (name, stage_name, email, phone, birth_date, nationality, genres, bio, image_url, social_media)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, stage_name, email, phone, birth_date, nationality, JSON.stringify(genres), bio, image_url, JSON.stringify(social_media)]
    );

    // Get the inserted record
    const insertedResult = await query(
      `SELECT * FROM artists WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: insertedResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update artist
// @route   PUT /api/artists/:id
// @access  Private
export const updateArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      stage_name,
      email,
      phone,
      birth_date,
      nationality,
      genres,
      bio,
      image_url,
      social_media
    } = req.body;

    const result = await query(
      `UPDATE artists 
       SET name = ?, stage_name = ?, email = ?, phone = ?, birth_date = ?, 
           nationality = ?, genres = ?, bio = ?, image_url = ?, social_media = ?
       WHERE id = ? AND is_active = true`,
      [name, stage_name, email, phone, birth_date, nationality, JSON.stringify(genres), bio, image_url, JSON.stringify(social_media), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }

    // Get the updated record
    const updatedResult = await query(
      `SELECT * FROM artists WHERE id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: updatedResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete artist
// @route   DELETE /api/artists/:id
// @access  Private
export const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `UPDATE artists SET is_active = false WHERE id = ? AND is_active = true`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Artist not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Artist deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
