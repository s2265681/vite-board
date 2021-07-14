import React, { FC } from "react";
import { router } from "dva";
import Create from "./Create";
import Join from "./Join";
import All from "./All";

const { Switch, Route, useRouteMatch, Redirect } = router;

const Overview: FC = () => {
  const { path = "/overview" } = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path="/overview"
        render={() => <Redirect to="/overview/all" />}
      />
      <Route exact path={`${path}/all`} component={All} />
      <Route exact path={`${path}/create`} component={Create} />
      <Route exact path={`${path}/join`} component={Join} />
    </Switch>
  );
};

export default Overview;
