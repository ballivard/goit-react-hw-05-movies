import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '353ed7f9cde53334d7d957e96740060e';

const api = {
  getTrendingMovies(page) {
    return axios
      .get(`trending/movie/week?api_key=${API_KEY}&page=${page}`)
      .then(response => response.data.results);
  },
  getByQueryMovies(query, page) {
    return axios
      .get(`search/movie?api_key=${API_KEY}&page=${page}&query=${query}`)
      .then(response => response.data.results);
  },
  getMovieById(id, option = '', page = '') {
    return axios.get(`movie/${id}${option}?api_key=${API_KEY}${page}`);
  },
};

export default api;