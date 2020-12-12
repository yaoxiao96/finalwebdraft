import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipeList from './RecipeList.jsx';
import Profile from './Profile.jsx';
import RecipeView from './RecipeView.jsx';
import RecipeEdit from './RecipeEdit.jsx';
import Home from './Home.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/properties" component={apartmentlist} />
      <Route path="/profile" component={Profile} />
      <Route path="/view/:id" component={Apartmentview} />
      // <Route path="/edit/:id" component={RecipeEdit} />
      <Route component={NotFound} />
    </Switch>
  );
}