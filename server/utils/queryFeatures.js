export function buildQuery(model, queryString, baseFilter = {}) {
  const { page = 1, limit = 20, sort = '-createdAt', search, ...filters } = queryString;
  const mongoFilter = { ...baseFilter };

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') mongoFilter[key] = value;
  });

  if (search) {
    mongoFilter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  return model.find(mongoFilter).sort(sort).skip(skip).limit(Number(limit));
}
