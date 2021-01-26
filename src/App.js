import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/style.css';
import Navbar from './components/Navbar';
import Gallery from './page/Gallery';
import routes from './utils/routes';

function App() {
  return (
    // <Router>
    //   <Navbar />
    //   <Switch>
    //     {routes.map((route, index) => (
    //       <Route
    //         key={index}
    //         path={route.path}
    //         exact={route.exact}
    //         component={route.component}
    //       />
    //     ))}
    //   </Switch>
    // </Router>
    <Gallery />
  );
}

export default App;
