import React from "react";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/unauthorized",
                    /*state: { from: props.location }*/
                }}
                />
            )}
    />
)