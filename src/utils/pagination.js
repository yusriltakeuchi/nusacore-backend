'use strict';

/**
 * Reusable Pagination Helper
 * Builds pagination metadata and SQL LIMIT/OFFSET
 */

/**
 * Parse and validate pagination query params
 * @param {Object} query - Express req.query
 * @returns {{ page, limit, offset }}
 */
function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Build pagination metadata for response
 * @param {number} totalData - Total count of records
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} pagination meta
 */
function buildPaginationMeta(totalData, page, limit) {
  const totalPages = Math.ceil(totalData / limit);
  return {
    currentPage: page,
    limit,
    totalData,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
}

module.exports = { parsePagination, buildPaginationMeta };
