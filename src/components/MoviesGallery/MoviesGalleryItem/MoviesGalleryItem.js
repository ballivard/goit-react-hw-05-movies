import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MoviesGalleryItem.module.css';

const MoviesGalleryItem = ({ poster, title, vote, id, location }) => (
  <li className={styles.MoviesGalleryItem}>
    <Link
      to={{
        pathname: `/movies/${id}`,
        state: { from: location },
      }}
    >
      <img
        src={
          poster
            ? `https://image.tmdb.org/t/p/w300${poster}`
            : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
        }
        alt={title}
        className={styles.MoviesGalleryItem__image}
      />
      <h2 className={styles.MoviesGalleryItem__title}>{title}</h2>
      <span className={styles.MoviesGalleryItem__vote}>{vote}</span>
    </Link>
  </li>
);

MoviesGalleryItem.defaultProps = {
  poster:
    'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg',
};

MoviesGalleryItem.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  vote: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.shape().isRequired,
};

export default withRouter(MoviesGalleryItem);