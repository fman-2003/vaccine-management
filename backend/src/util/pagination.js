// Shared by any "list" endpoint (parents, children, vaccines, schedules)
// so the page/limit/skip math and response shape stay identical across
// every module, rather than being re-derived slightly differently each time

function getPaginationParams(query, defaultLimit = 20) {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || defaultLimit;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function buildPaginatedResponse(data, total, page, limit) {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

module.exports = { getPaginationParams, buildPaginatedResponse };
