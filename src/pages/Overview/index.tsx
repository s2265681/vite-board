import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import moment from 'moment';


import { router } from 'dva';
const { Switch, Route, useRouteMatch, Redirect } = router;

import Create from './Create';
import Join from './Join';
import All from './All';

const Overview: FC = () => {
  const { path = '/overview' } = useRouteMatch();
  return (
    <Switch>
      <Route exact path='/overview' render={() => (<Redirect to="/overview/all"/> )} />
      <Route exact path={`${path}/all`} component={All}/>
      <Route exact path={`${path}/create`} component={Create} />
      <Route exact path={`${path}/join`} component={Join} />
    </Switch>
  );
};

export default Overview;
