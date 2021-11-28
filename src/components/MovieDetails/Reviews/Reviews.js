import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from '../../Notification';
import api from '../../../api-service/api';
import styles from './Reviews.module.css';

class Reviews extends Component {
  state = { page: 1, reviews: null };

  async componentDidMount() {
    const { id } = this.props;
    const { page } = this.state;
    if (id) {
      const reviews = await api
        .getMovieById(id, '/reviews', `&page=${page}`)
        .then(response => response.data.results);
      this.setState({ reviews });
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <ul className={styles.Reviews}>
        {!reviews && <Notification message="There are no reviews" />}
        {reviews &&
          reviews.map(review => {
            const { author, content, id } = review;
            return (
              <li key={id} className={styles.ListItem}>
                <p className={styles.Author}>{`Author: ${author}`}</p>
                <p className={styles.Content}>{content}</p>
              </li>
            );
          })}
      </ul>
    );
  }
}

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Reviews;