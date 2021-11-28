import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../api-service/api';
import Button from '../components/Button';
import MoviesGallery from '../components/MoviesGallery';
import MainLoader from '../components/MainLoader';
import Notification from '../components/Notification';
import SearchBar from '../components/SearchBar';

class MoviesPage extends Component {
  state = {
    movies: [],
    page: 1,
    error: '',
    loader: false,
    query: '',
  };

  componentDidMount() {
    const { query } = this.getQueryFromProps(this.props);
    let { page = 1 } = this.getQueryFromProps(this.props);
    page = +page;
    if (query) {
      this.setState({ query, page });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query) {
      try {
        // eslint-disable-next-line
        this.setState({ loader: true });
        const movies = await api.getByQueryMovies(query, page);
        this.addMoviesToState(movies, page);
        this.props.history.push({ search: `query=${query}&page=${page}` });
      } catch (err) {
        // eslint-disable-next-line
        this.setState({ error: err });
      }
    }
  }

  handleOnButtonClick = page => () => {
    const { query } = this.state;
    this.setState({ loader: true });
    api
      .getByQueryMovies(query, page)
      .then(movies => this.addMoviesToState(movies, page))
      .then(() => {
        this.props.history.push({ search: `query=${query}&page=${page}` });
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loader: false });
      });
  };

  addMoviesToState = (movies, page) => {
    this.setState({ movies, page, error: '', loader: false });
  };

  handleFormData = ({ query }) => {
    this.setState({
      page: 1,
      query,
      movies: [],
      error: '',
    });
  };

  getQueryFromProps = props => queryString.parse(props.location.search);

  render() {
    const { error, movies, loader, page } = this.state;
    const showButtons = !loader && movies[0] && true;
    const disabled = true;
    return (
      <>
        <SearchBar onSubmit={this.handleFormData} />
        {error && <Notification message="Something wrong :(" />}
        {movies[0] && <MoviesGallery movies={movies} />}
        {loader && <MainLoader />}
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

MoviesPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default MoviesPage;