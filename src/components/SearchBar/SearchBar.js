import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <div className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            // eslint-disable-next-line
            autoFocus
            placeholder="Search movies"
            onChange={this.handleInputChange}
            value={query}
          />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;