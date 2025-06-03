import { query } from '../config/database.js';

// @desc    Get all publishers
// @route   GET /api/publishers
// @access  Public
export const getPublishers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, type } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT p.*,
             COUNT(DISTINCT a.id) as artist_count,
             COUNT(DISTINCT r.id) as song_count,
             COALESCE(SUM(roy.revenue), 0) as total_revenue
      FROM publishers p
      LEFT JOIN labels l ON l.publisher_id = p.id
      LEFT JOIN releases rel ON rel.label_id = l.id
      LEFT JOIN artists a ON a.id = rel.artist_id
      LEFT JOIN recordings r ON r.artist_id = a.id
      LEFT JOIN royalties roy ON roy.publisher_id = p.id
      WHERE p.is_active = true
    `;

    const queryParams = [];
    let paramCount = 0;

    if (search) {
      queryText += ` AND (p.name LIKE ? OR p.location LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (type) {
      queryText += ` AND p.type = ?`;
      queryParams.push(type);
    }

    queryText += ` GROUP BY p.id ORDER BY p.name`;
    queryText += ` LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await query(queryText, queryParams);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as count FROM publishers WHERE is_active = true`;
    const countParams = [];

    if (search) {
      countQuery += ` AND (name LIKE ? OR location LIKE ?)`;
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (type) {
      countQuery += ` AND type = ?`;
      countParams.push(type);
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

// @desc    Get single publisher
// @route   GET /api/publishers/:id
// @access  Public
export const getPublisher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT p.*,
              COUNT(DISTINCT a.id) as artist_count,
              COUNT(DISTINCT r.id) as song_count,
              COALESCE(SUM(roy.revenue), 0) as total_revenue
       FROM publishers p
       LEFT JOIN labels l ON l.publisher_id = p.id
       LEFT JOIN releases rel ON rel.label_id = l.id
       LEFT JOIN artists a ON a.id = rel.artist_id
       LEFT JOIN recordings r ON r.artist_id = a.id
       LEFT JOIN royalties roy ON roy.publisher_id = p.id
       WHERE p.id = ? AND p.is_active = true
       GROUP BY p.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Publisher not found'
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

// @desc    Create new publisher
// @route   POST /api/publishers
// @access  Private
export const createPublisher = async (req, res, next) => {
  try {
    const {
      name,
      type,
      location,
      email,
      phone,
      website,
      logo_url,
      founded_year,
      description
    } = req.body;

    const result = await query(
      `INSERT INTO publishers (name, type, location, email, phone, website, logo_url, founded_year, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, type, location, email, phone, website, logo_url, founded_year, description]
    );

    // Get the inserted record
    const insertedResult = await query(
      `SELECT * FROM publishers WHERE id = ?`,
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

// @desc    Update publisher
// @route   PUT /api/publishers/:id
// @access  Private
export const updatePublisher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      location,
      email,
      phone,
      website,
      logo_url,
      founded_year,
      description
    } = req.body;

    const result = await query(
      `UPDATE publishers
       SET name = ?, type = ?, location = ?, email = ?, phone = ?,
           website = ?, logo_url = ?, founded_year = ?, description = ?
       WHERE id = ? AND is_active = true`,
      [name, type, location, email, phone, website, logo_url, founded_year, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Publisher not found'
      });
    }

    // Get the updated record
    const updatedResult = await query(
      `SELECT * FROM publishers WHERE id = ?`,
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

// @desc    Delete publisher
// @route   DELETE /api/publishers/:id
// @access  Private
export const deletePublisher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `UPDATE publishers SET is_active = false WHERE id = ? AND is_active = true`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Publisher not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Publisher deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
