function requireFields(obj, fields) {
  for (const f of fields) {
    if (!obj?.[f]) throw { status: 400, message: `${f} is required` };
  }
}

module.exports = { requireFields };
