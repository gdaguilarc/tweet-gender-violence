import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Pages from './pages';
import withAdminLayout from '../../layout/withAdminLayout';

const Classifier = lazy(() => import('./classifier'));

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/classify`} component={Classifier} />
        <Route path={`${path}`} component={Pages} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
