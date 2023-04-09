const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33640880-36f1b5ee21a4606cc05d3afaa';

export const getImg = (text, page, perPage) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${text}&page=${page}&per_page=${perPage}`
  );
};
