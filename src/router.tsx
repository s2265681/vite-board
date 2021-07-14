import { Router as IRouter, RouterAPI, router as dvaRouter } from 'dva';
import Layout from 'components/Layout';
import React, { Suspense, lazy } from 'react';
const Overview = lazy(() => import('pages/Overview'));
const Demo = lazy(() => import('pages/Demo'));
const NoPage = lazy(()=> import('pages/404'))
const Login = lazy(()=> import('pages/Login'))
const List = lazy(()=> import('pages/List'))
const FabricBoard = lazy(()=> import('pages/FabricBoard'))
const KonvaBoard = lazy(()=> import('pages/KonvaBoard'))

const { Route, Router, Switch, Redirect } = dvaRouter;

const router: IRouter = (routerApi?: RouterAPI) => {
  if (!routerApi) return {};
  return (
    <Router history={routerApi.history}>
      <Layout>
        <Suspense fallback={null}>
          <Switch>
            <Route path='/overview' component={Overview} />
            <Route path='/demo' component={Demo} />
            <Route path='/404' component={NoPage} />
            <Route path='/Login' component={Login} />
            <Route path='/List' component={List} />
            <Route path='/m/FabricBoard' component={FabricBoard} />
            <Route path='/m/KonvaBoard' component={KonvaBoard} />
            <Redirect to='/404'/>
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default router;
