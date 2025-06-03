import { query } from '../config/database.js';

// @desc    Get all labels
// @route   GET /api/labels
// @access  Public
export const getLabels = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, type } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT l.*, 
             p.name as publisher_name,
             COUNT(DISTINCT rel.id) as release_count,
             COUNT(DISTINCT a.id) as artist_count,
             COALESCE(SUM(an.metric_value), 0) as monthly_streams
      FROM labels l
      LEFT JOIN publishers p ON p.id = l.publisher_id
      LEFT JOIN releases rel ON rel.label_id = l.id
      LEFT JOIN artists a ON a.id = rel.artist_id
      LEFT JOIN analytics an ON an.entity_type = 'release' 
                            AND an.entity_id = rel.id 
                            AND an.metric_type = 'streams'
                            AND an.date >= CURRENT_DATE - INTERVAL '30 days'
      WHERE l.status = 'active'
    `;

    const queryParams = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      queryText += ` AND (l.name ILIKE $${paramCount} OR l.location ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    if (type) {
      paramCount++;
      queryText += ` AND l.type = $${paramCount}`;
      queryParams.push(type);
    }

    queryText += ` GROUP BY l.id, p.name ORDER BY l.name`;
    
    paramCount++;
    queryText += ` LIMIT $${paramCount}`;
    queryParams.push(limit);
    
    paramCount++;
    queryText += ` OFFSET $${paramCount}`;
    queryParams.push(offset);

    const result = await query(queryText, queryParams);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) FROM labels WHERE status = 'active'`;
    const countParams = [];
    let countParamCount = 0;

    if (search) {
      countParamCount++;
      countQuery += ` AND (name ILIKE $${countParamCount} OR location ILIKE $${countParamCount})`;
      countParams.push(`%${search}%`);
    }

    if (type) {
      countParamCount++;
      countQuery += ` AND type = $${countParamCount}`;
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

// @desc    Get single label
// @route   GET /api/labels/:id
// @access  Public
export const getLabel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT l.*, 
              p.name as publisher_name,
              COUNT(DISTINCT rel.id) as release_count,
              COUNT(DISTINCT a.id) as artist_count,
              COALESCE(SUM(an.metric_value), 0) as monthly_streams
       FROM labels l
       LEFT JOIN publishers p ON p.id = l.publisher_id
       LEFT JOIN releases rel ON rel.label_id = l.id
       LEFT JOIN artists a ON a.id = rel.artist_id
       LEFT JOIN analytics an ON an.entity_type = 'release' 
                             AND an.entity_id = rel.id 
                             AND an.metric_type = 'streams'
                             AND an.date >= CURRENT_DATE - INTERVAL '30 days'
       WHERE l.id = $1 AND l.status = 'active'
       GROUP BY l.id, p.name`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Label not found'
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

// @desc    Create new label
// @route   POST /api/labels
// @access  Private
export const createLabel = async (req, res, next) => {
  try {
    const {
      name,
      type,
      publisher_id,
      location,
      founded_year,
      logo_url,
      genres,
      description
    } = req.body;

    const result = await query(
      `INSERT INTO labels (name, type, publisher_id, location, founded_year, logo_url, genres, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, type, publisher_id, location, founded_year, logo_url, genres, description]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update label
// @route   PUT /api/labels/:id
// @access  Private
export const updateLabel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      publisher_id,
      location,
      founded_year,
      logo_url,
      genres,
      description,
      status
    } = req.body;

    const result = await query(
      `UPDATE labels 
       SET name = $1, type = $2, publisher_id = $3, location = $4, 
           founded_year = $5, logo_url = $6, genres = $7, description = $8, status = $9
       WHERE id = $10 AND status = 'active'
       RETURNING *`,
      [name, type, publisher_id, location, founded_year, logo_url, genres, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Label not found'
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

// @desc    Delete label
// @route   DELETE /api/labels/:id
// @access  Private
export const deleteLabel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      `UPDATE labels SET status = 'inactive' WHERE id = $1 AND status = 'active' RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Label not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Label deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
