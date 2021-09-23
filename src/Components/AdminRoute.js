import React from "react";
import {Route,Redirect} from "react-router-dom";

 const AdminRoute =({component:Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
            sessionStorage.token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;