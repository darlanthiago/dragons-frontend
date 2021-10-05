import { Route, Switch } from "react-router";
import { Login } from "../pages/Login";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  );
};
