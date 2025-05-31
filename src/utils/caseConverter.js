export const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
      toCamelCase(val),
    ])
  );
};

export const toSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      key.replace(/([A-Z])/g, "_$1").toLowerCase(),
      toSnakeCase(val),
    ])
  );
};

export const stringToSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};
