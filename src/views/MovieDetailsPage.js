import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api-service/api';
import Button from '../components/Button';
import Cast from '../components/MovieDetails/Cast';
import MovieDetails from '../components/MovieDetails';
import MainLoader from '../components/MainLoader';
import Notification from '../components/Notification';
import Reviews from '../components/MovieDetails/Reviews';
import styles from './MovieDetailsPage.module.css';

class MovieDetailsPage extends Component {
  state = { movie: '', loader: false };

  async componentDidMount() {
    this.setState({ loader: true });
    const id = this.props.match.params.movieId;
    const response = await api.getMovieById(id);
    const movie = response.data;
    this.setState({ movie, loader: false });
  }

  handlerOnButtonClick = from => () => this.props.history.push(from);

  render() {
    const { loader, movie } = this.state;
    const { from } = this?.props?.location?.state || {
      from: { pathname: '/' },
    };
    const { match } = this.props;
    const {
      title,
      poster_path: poster,
      tagline,
      genres,
      budget,
      revenue,
      release_date: date,
      overview,
      vote_average: average,
      vote_count: count,
      id,
    } = movie;
    return (
      <>
        <Button name="<<< Go back" onClick={this.handlerOnButtonClick(from)} />
        {loader && <MainLoader />}
        {title ? (
          <MovieDetails
            title={title}
            poster={poster}
            tagline={tagline}
            genres={genres}
            budget={budget}
            revenue={revenue}
            date={date}
            overview={overview}
            average={average}
            count={count}
          />
        ) : (
          <Notification message="Sorry, no data :(, try again" />
        )}
        <ul className={styles.List}>
          <li className={styles.ListItem}>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
                state: { from: from },
              }}
              className={styles.NavLink}
              activeClassName={styles.active}
            >
              Cast
            </NavLink>
          </li>
          <li className={styles.ListItem}>
            <NavLink
              to={{
                pathname: `${match.url}/review`,
                state: { from: from },
              }}
              className={styles.NavLink}
              activeClassName={styles.active}
            >
              Review
            </NavLink>
          </li>
        </ul>
        {id && (
          <Route path={`${match.path}/cast`} render={() => <Cast id={id} />} />
        )}
        {id && (
          <Route
            path={`${match.path}/review`}
            render={() => <Reviews id={id} />}
          />
        )}
      </>
    );
  }
}

MovieDetailsPage.defaultProps = {
  match: { params: { movieId: 0 } },
  location: { state: { from: { pathname: '/' } } },
};

MovieDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape(),
    }),
  }),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default MovieDetailsPage;