import React from "react";
import axios from 'axios';
import { Redirect, Route } from "react-router";
import { useHistory } from "react-router-dom";

const getTokenValidationUrl = "https://tractor-factory-interface.herokuapp.com/api/user";

export const PrivateRouteMonitoring = ({ component: Component, ...rest }) => {
    let history = useHistory();
    
    function isValid() {
        axios.get(getTokenValidationUrl, {
            headers: {
                'Authorization': `Token ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
                localStorage.removeItem('token');
                localStorage.removeItem('group');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                history.push('/sessionexpired');
            })
            return true;
    }

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.token ? (
                    isValid() ?
                        (<Component {...props} />) :
                        (
                            <Redirect to={{
                                pathname: "/sessionexpired",
                                state: { from: props.location }
                            }}
                            />)
                ) :
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

export const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
    let history = useHistory();

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
        }
        return result;
    }

    function isValid() {
        axios.get(getTokenValidationUrl, {
            headers: {
                'Authorization': `Token ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
                localStorage.removeItem('token');
                localStorage.removeItem('group');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                history.push('/sessionexpired');
            })
            return true;
    }

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.token ?
                    isValid() ?
                        (
                            checkToken() ?
                                <Component {...props} /> :
                                (<Redirect to={{
                                    pathname: "/notenoughrights",
                                    state: { from: props.location }
                                }}
                                />)
                        ) :
                        (<Redirect to={{
                            pathname: "/sessionexpired",
                            state: { from: props.location }
                        }}
                        />) :
                    (<Redirect to={{
                        pathname: "/unauthorized",
                        state: { from: props.location }
                    }}
                    />)
            }
        />
    )
}