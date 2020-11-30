import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Classifier = lazy(() => import('../../container/classifier'));

const ClassifierRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Classifier} />
    </Switch>
  );
};

export default ClassifierRoutes;
