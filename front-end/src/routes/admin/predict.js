import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
const Predict = lazy(() => import('../../container/predict'));

const PredictRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Predict} />
    </Switch>
  );
};

export default PredictRoutes;
