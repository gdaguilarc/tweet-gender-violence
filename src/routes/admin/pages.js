import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const ChangeLog = lazy(() => import('../../container/pages/ChangeLog'));
const DocumentLog = lazy(() => import('../../container/pages/DocumentLog'));
const CommingSoon = lazy(() => import('../../container/pages/ComingSoon'));

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/404`} component={NotFound} />
      <Route path={`${path}/changelog`} component={ChangeLog} />
      <Route path={`${path}/documentation`} component={DocumentLog} />
      <Route path={`${path}/comingSoon`} component={CommingSoon} />
    </Switch>
  );
};

export default PagesRoute;
