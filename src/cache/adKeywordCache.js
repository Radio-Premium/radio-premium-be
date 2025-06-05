const cachedAdKeywords = [];

export const setAdKeywords = (keywords) => {
  keywords.map((keyword) => {
    cachedAdKeywords.push(keyword);
  });
};

export const getAdKeywords = () => cachedAdKeywords;
