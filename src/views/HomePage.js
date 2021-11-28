import React, { Component } from 'react';
import api from '../api-service/api';
import Button from '../components/Button';
import MoviesGallery from '../components/MoviesGallery';
import MyLoader from '../components/MyLoader';
import Notification from '../components/Notification';

class HomePage extends Component {
  state = {
    movies: [],
    page: 1,
    error: '',
    loader: false,
  };

  async componentDidMount() {
    try {
      this.setState({ movies: [], page: 1, error: '', loader: true });
      const { page } = this.state;
      const movies = await api.getTrendingMovies(page);
      this.addTrendingMoviesToState(movies, page);
    } catch (err) {
      this.setState({ error: err });
    }
  }

  handleOnButtonClick = page => () => {
    this.setState({ loader: true });
    api
      .getTrendingMovies(page)
      .then(movies => this.addTrendingMoviesToState(movies, page))
      .then(
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }),
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loader: false });
      });
  };

  addTrendingMoviesToState = (movies, page) => {
    this.setState({ movies, page, error: '', loader: false });
  };

  render() {
    const { error, movies, loader, page } = this.state;
    const showButtons = !loader && movies[0] && true;
    const disabled = true;
    return (
      <>
        {error && <Notification message="Something wrong :(" />}
        <MoviesGallery movies={movies} />
        {loader && <MyLoader />}
        {showButtons && (
          <>
            {page === 1 ? (
              <Button
                onClick={this.handleOnButtonClick(page - 1)}
                name={`<<< Prev page ${page - 1}`}
                disabled={disabled}
              />
            ) : (
              <Button
                onClick={this.handleOnButtonClick(page - 1)}
                name={`<<< Prev page №${page - 1}`}
              />
            )}
            <Button
              onClick={this.handleOnButtonClick(page)}
              name={`Current page №${page}`}
              disabled={disabled}
            />
            <Button
              onClick={this.handleOnButtonClick(page + 1)}
              name={`Next page ${page + 1} >>>`}
            />
          </>
        )}
      </>
    );
  }
}

export default HomePage;