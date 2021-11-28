import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api-service/api';
import styles from './Cast.module.css';

class Cast extends Component {
  state = { cast: null };

  async componentDidMount() {
    const { id } = this.props;
    const cast = await api
      .getMovieById(id, '/credits')
      .then(response => response.data.cast);
    this.setState({ cast });
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className={styles.Cast}>
        {cast &&
          cast.map(actor => {
            const { profile_path: img, id, name, character } = actor;
            return (
              <li key={id} className={styles.ListItem}>
                <p className={styles.Name}>{name}</p>
                <p className={styles.Character}>{character}</p>
                <img
                  src={
                    img
                      ? `https://image.tmdb.org/t/p/w200${img}`
                      : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                  }
                  alt="name"
                  width="200px"
                  className={styles.Image}
                />
              </li>
            );
          })}
      </ul>
    );
  }
}

Cast.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Cast;