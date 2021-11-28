import React from 'react';
import PropTypes from 'prop-types';
import MoviesGalleryItem from './MoviesGalleryItem';
import styles from './MoviesGallery.module.css';

const MoviesGallery = ({ movies }) => (
  <ul className={styles.MoviesGallery}>
    {movies.map(
      ({ id, poster_path: posterPath, vote_average: voteAverage, title }) => (
        <MoviesGalleryItem
          key={id}
          poster={posterPath}
          vote={voteAverage}
          title={title}
          id={id}
        />
      ),
    )}
  </ul>
);

MoviesGallery.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MoviesGallery;