import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './components/Container';
import Header from './components/Header';
import MyLoader from './components/MyLoader';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);

const App = () => (
  <Container>
    <Header />
    <Suspense fallback={<MyLoader />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies" component={MoviesPage} />
      </Switch>
    </Suspense>
  </Container>
);

export default App;