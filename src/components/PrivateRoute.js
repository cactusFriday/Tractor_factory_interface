import React from "react";
import axios from 'axios';
import { Redirect, Route } from "react-router";

const getTokenValidationUrl = "https://tractor-factory-interface.herokuapp.com/api/user";

export const PrivateRouteMonitoring = ({ component: Component, ...rest }) => {

    function checkToken() {
        let result = false;
        if (!localStorage.token) {
            result = false;
        }
        else {
            result = false;   
        };
        return result;
    }

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.token ? (
                    <Component {...props} />) :
                    (
                        <Redirect to={{
                            pathname: "/unauthorized",
                            state: { from: props.location }
                        }}
                        />)
            }
        />
    )
}

export const PrivateRouteUsers = ({ component: Component, ...rest }) => {

    function checkToken() {
        let result = false;
        if (!localStorage.token) {
            result = false;
        }
        else {
            if (localStorage.group === "Admin") {
                result = true;
            }
            else {
                result = false;
            }     
        };
        return result;
    }

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.token ? (
                    checkToken() ? 
                    (<Component {...props} />) : (
                        <Redirect to={{
                            pathname: "/notenoughrights",
                            state: { from: props.location }
                        }}
                        />
                    )) :
                    (
                        <Redirect to={{
                            pathname: "/unauthorized",
                            state: { from: props.location }
                        }}
                        />)
            }
        />
    )
}

export const PrivateRouteConfig = ({ component: Component, ...rest }) => {

    function checkToken() {
        let result = false;

        if (!localStorage.token) {
            result = false;
        }
        else {
            if (localStorage.group === "Admin") {
                result = true;
            }
            else {
                result = false;
            }  
        };

        return result;
    }

    const isValid = async () => {
        const response = await axios.get(getTokenValidationUrl, {
            headers: {
                'Authorization': `Token ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
        });
        console.log(response);
        console.log(response.status === 200);
        let result = response.status === 200 ? true : false;
        return true; 
    }

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.token ? (
                    checkToken() ? 
                    (<Component {...props} />) : (
                        <Redirect to={{
                            pathname: "/notenoughrights",
                            state: { from: props.location }
                        }}
                        />
                    )) :
                    (
                        <Redirect to={{
                            pathname: "/unauthorized",
                            state: { from: props.location }
                        }}
                        />)
            }
        />
    )
}