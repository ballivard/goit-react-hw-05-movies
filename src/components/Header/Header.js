import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.Nav}>
      <ul className={styles.List}>
        <li>
          <NavLink
            exact
            to="/"
            className={styles.NavLink}
            activeClassName={styles.active}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={styles.NavLink}
            activeClassName={styles.active}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;