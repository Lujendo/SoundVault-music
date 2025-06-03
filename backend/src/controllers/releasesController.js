import { query } from '../config/database.js';

// @desc    Get all releases
// @route   GET /api/releases
// @access  Public
export const getReleases = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, type, status, artist_id, label_id } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT r.*, 
             a.name as artist_name,
             a.stage_name as artist_stage_name,
             l.name as label_name
      FROM releases r
      LEFT JOIN artists a ON a.id = r.artist_id
      LEFT JOIN labels l ON l.id = r.label_id
      WHERE 1=1
    `;

    const queryParams = [];

    if (search) {
      queryText += ` AND (r.title LIKE ? OR r.description LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (type) {
      queryText += ` AND r.type = ?`;
      queryParams.push(type);
    }

    if (status) {
      queryText += ` AND r.status = ?`;
      queryParams.push(status);
    }

    if (artist_id) {
      queryText += ` AND r.artist_id = ?`;
      queryParams.push(artist_id);
    }

    if (label_id) {
      queryText += ` AND r.label_id = ?`;
      queryParams.push(label_id);
    }

    queryText += ` ORDER BY r.release_date DESC`;
    queryText += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await query(queryText, queryParams);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as count FROM releases r WHERE 1=1`;
    const countParams = [];

    if (search) {
      countQuery += ` AND (r.title LIKE ? OR r.description LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (type) {
      countQuery += ` AND r.type = ?`;
      countParams.push(type);
    }

    if (status) {
      countQuery += ` AND r.status = ?`;
      countParams.push(status);
    }

    if (artist_id) {
      countQuery += ` AND r.artist_id = ?`;
      countParams.push(artist_id);
    }

    if (label_id) {
      countQuery += ` AND r.label_id = ?`;
      countParams.push(label_id);
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

// @desc    Get single release
// @route   GET /api/releases/:id
// @access  Public
export const getRelease = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT r.*, 
              a.name as artist_name,
              a.stage_name as artist_stage_name,
              l.name as label_name
       FROM releases r
       LEFT JOIN artists a ON a.id = r.artist_id
       LEFT JOIN labels l ON l.id = r.label_id
       WHERE r.id = ?`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
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

// @desc    Create new release
// @route   POST /api/releases
// @access  Private
export const createRelease = async (req, res, next) => {
  try {
    const {
      title,
      artist_id,
      label_id,
      type,
      release_date,
      total_duration,
      track_count,
      cover_url,
      genres,
      platforms,
      status,
      upc,
      catalog_number,
      description
    } = req.body;

    const result = await query(
      `INSERT INTO releases (title, artist_id, label_id, type, release_date, total_duration, track_count, cover_url, genres, platforms, status, upc, catalog_number, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, artist_id, label_id, type, release_date, total_duration, track_count, cover_url, JSON.stringify(genres), JSON.stringify(platforms), status, upc, catalog_number, description]
    );

    // Get the inserted record
    const insertedResult = await query(
      `SELECT r.*, a.name as artist_name, a.stage_name as artist_stage_name, l.name as label_name
       FROM releases r
       LEFT JOIN artists a ON a.id = r.artist_id
       LEFT JOIN labels l ON l.id = r.label_id
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

// @desc    Update release
// @route   PUT /api/releases/:id
// @access  Private
export const updateRelease = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      artist_id,
      label_id,
      type,
      release_date,
      total_duration,
      track_count,
      cover_url,
      genres,
      platforms,
      status,
      upc,
      catalog_number,
      description
    } = req.body;

    const result = await query(
      `UPDATE releases 
       SET title = ?, artist_id = ?, label_id = ?, type = ?, release_date = ?, 
           total_duration = ?, track_count = ?, cover_url = ?, genres = ?, 
           platforms = ?, status = ?, upc = ?, catalog_number = ?, description = ?
       WHERE id = ?`,
      [title, artist_id, label_id, type, release_date, total_duration, track_count, cover_url, JSON.stringify(genres), JSON.stringify(platforms), status, upc, catalog_number, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    // Get the updated record
    const updatedResult = await query(
      `SELECT r.*, a.name as artist_name, a.stage_name as artist_stage_name, l.name as label_name
       FROM releases r
       LEFT JOIN artists a ON a.id = r.artist_id
       LEFT JOIN labels l ON l.id = r.label_id
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

// @desc    Delete release
// @route   DELETE /api/releases/:id
// @access  Private
export const deleteRelease = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `DELETE FROM releases WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Release not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Release deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
