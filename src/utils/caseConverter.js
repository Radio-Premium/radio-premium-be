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
