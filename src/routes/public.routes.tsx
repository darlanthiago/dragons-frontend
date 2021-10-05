import { Route, Switch } from "react-router";
import { Login } from "../pages/Login";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
};
