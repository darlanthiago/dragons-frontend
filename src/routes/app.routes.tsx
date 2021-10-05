import { Route, Switch } from "react-router-dom";

import { Dragon } from "../pages/Dragon";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dragon} />
    </Switch>
  );
};
