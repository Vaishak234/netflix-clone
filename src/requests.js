const API_KEY = "1acc2b2649ea64bbfd8b583a05f9eb7a"

const requests = {
  
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTvShows:`/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchPopularTvShows:`/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchOnTheAirTvShows:`/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
  fetchOnTodayTvShows:`/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
 
}

export default requests;