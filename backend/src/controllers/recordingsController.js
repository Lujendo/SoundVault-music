import { query } from '../config/database.js';

// @desc    Get all recordings
// @route   GET /api/recordings
// @access  Public
export const getRecordings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, genre, status, artist_id } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT r.*, 
             a.name as artist_name,
             a.stage_name as artist_stage_name,
             COALESCE(SUM(roy.revenue), 0) as total_revenue
      FROM recordings r
      LEFT JOIN artists a ON a.id = r.artist_id
      LEFT JOIN royalties roy ON roy.recording_id = r.id
      WHERE 1=1
    `;

    const queryParams = [];

    if (search) {
      queryText += ` AND (r.title LIKE ? OR r.album LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
      queryText += ` AND r.genre = ?`;
      queryParams.push(genre);
    }

    if (status) {
      queryText += ` AND r.status = ?`;
      queryParams.push(status);
    }

    if (artist_id) {
      queryText += ` AND r.artist_id = ?`;
      queryParams.push(artist_id);
    }

    queryText += ` GROUP BY r.id ORDER BY r.created_at DESC`;
    queryText += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await query(queryText, queryParams);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as count FROM recordings r WHERE 1=1`;
    const countParams = [];

    if (search) {
      countQuery += ` AND (r.title LIKE ? OR r.album LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
      countQuery += ` AND r.genre = ?`;
      countParams.push(genre);
    }

    if (status) {
      countQuery += ` AND r.status = ?`;
      countParams.push(status);
    }

    if (artist_id) {
      countQuery += ` AND r.artist_id = ?`;
      countParams.push(artist_id);
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

// @desc    Get single recording
// @route   GET /api/recordings/:id
// @access  Public
export const getRecording = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT r.*, 
              a.name as artist_name,
              a.stage_name as artist_stage_name,
              COALESCE(SUM(roy.revenue), 0) as total_revenue
       FROM recordings r
       LEFT JOIN artists a ON a.id = r.artist_id
       LEFT JOIN royalties roy ON roy.recording_id = r.id
       WHERE r.id = ?
       GROUP BY r.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recording not found'
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

// @desc    Create new recording
// @route   POST /api/recordings
// @access  Private
export const createRecording = async (req, res, next) => {
  try {
    const {
      title,
      artist_id,
      album,
      duration,
      recorded_date,
      genre,
      bpm,
      key_signature,
      producer,
      studio,
      status,
      file_url,
      cover_url,
      metadata
    } = req.body;

    const result = await query(
      `INSERT INTO recordings (title, artist_id, album, duration, recorded_date, genre, bpm, key_signature, producer, studio, status, file_url, cover_url, metadata)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, artist_id, album, duration, recorded_date, genre, bpm, key_signature, producer, studio, status, file_url, cover_url, JSON.stringify(metadata)]
    );

    // Get the inserted record
    const insertedResult = await query(
      `SELECT r.*, a.name as artist_name, a.stage_name as artist_stage_name
       FROM recordings r
       LEFT JOIN artists a ON a.id = r.artist_id
       WHERE r.id = ?`,
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

// @desc    Update recording
// @route   PUT /api/recordings/:id
// @access  Private
export const updateRecording = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      artist_id,
      album,
      duration,
      recorded_date,
      genre,
      bpm,
      key_signature,
      producer,
      studio,
      status,
      file_url,
      cover_url,
      metadata
    } = req.body;

    const result = await query(
      `UPDATE recordings 
       SET title = ?, artist_id = ?, album = ?, duration = ?, recorded_date = ?, 
           genre = ?, bpm = ?, key_signature = ?, producer = ?, studio = ?, 
           status = ?, file_url = ?, cover_url = ?, metadata = ?
       WHERE id = ?`,
      [title, artist_id, album, duration, recorded_date, genre, bpm, key_signature, producer, studio, status, file_url, cover_url, JSON.stringify(metadata), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recording not found'
      });
    }

    // Get the updated record
    const updatedResult = await query(
      `SELECT r.*, a.name as artist_name, a.stage_name as artist_stage_name
       FROM recordings r
       LEFT JOIN artists a ON a.id = r.artist_id
       WHERE r.id = ?`,
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

// @desc    Delete recording
// @route   DELETE /api/recordings/:id
// @access  Private
export const deleteRecording = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `DELETE FROM recordings WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recording not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recording deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
