import React, { useState } from "react";

import LoginScreen from "./LoginScreen/LoginScreen";
import HomeScreen from "./HomeScreen/HomeScreen";

import { BrowserRouter } from "react-router-dom";

import { Redirect, Route, Switch, RouteComponentProps } from "react-router-dom";
import firebase from "firebase";

export const routerConfig = [
  {
    path: "/",
    component: HomeScreen,
    name: "Home",
    exact: true,
    private: true,
  },
  {
    path: "/Login",
    component: LoginScreen,
    name: "Login",
    exact: true,
    private: false,
  },
  {
    path: "/Home",
    component: HomeScreen,
    name: "Home",
    exact: true,
    private: true,
  },
];

interface PrivateRouteInterface {
  component: any;
  isLoggedIn: boolean;
  isPrivate: boolean;
}

const PrivateRoute: React.FC<PrivateRouteInterface & RouteComponentProps> = ({
  component,
  isLoggedIn,
  isPrivate,
  ...rest
}) => {
  const ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (isPrivate && !isLoggedIn) {
          return <Redirect to="/Login"></Redirect>;
        } else if (isPrivate && isLoggedIn) {
          return <ComponentToRender {...renderProps} />;
        } else if (isLoggedIn) {
          return <Redirect to="/"></Redirect>;
        } else {
          return <ComponentToRender {...renderProps} />;
        }
      }}
    />
  );
};

const Router = () => {
  const [authentication, setAuthState] = useState({
    authenticated: false,
  });

  React.useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAuthState({
            authenticated: true,
          });
        } else {
          setAuthState({
            authenticated: false,
          });
        }
      }),
    [setAuthState]
  );

  return (
    <BrowserRouter>
      <Switch>
        {routerConfig.map((config) => {
          return (
            <Route
              key={config.path}
              path={config.path}
              exact={config.exact}
              render={(props: RouteComponentProps) => {
                return (
                  <PrivateRoute
                    {...props}
                    component={config.component}
                    isPrivate={config.private}
                    isLoggedIn={authentication.authenticated}
                  />
                );
              }}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
