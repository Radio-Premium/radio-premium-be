const cachedAdKeywords = [];

export const setAdKeywords = (keywords) => {
  cachedAdKeywords.splice(0, cachedAdKeywords.length, ...keywords);
};

export const getAdKeywords = () => cachedAdKeywords;
