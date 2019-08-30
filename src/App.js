import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';

import Navbar from "./components/layout/Navbar";
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import OktaLogin from './components/auth/OktaLogin';

const config = {
    issuer: 'YOUR_DOMAIN',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: 'YOUR_ID'
};

function onAuthRequired(history) {
    history.push('/login')
}

function App() {
    return (
        <BrowserRouter>
            <Security
                issuer={config.issuer}
                client_id={config.client_id}
                redirect_uri={config.redirect_uri}
            >
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Route path="/" exact={true} component={Home} />
                        <SecureRoute path="/staff" exact={true} component={Staff} />
                        <Route
                            path="/login"
                            render={() => (
                                <OktaLogin baseUrl="YOUR_DOMAIN" />
                            )}
                        />
                        <Route path="/implicit/callback" component={ImplicitCallback} />
                    </div>
                </div>
            </Security>
        </BrowserRouter>
    );
}

export default App;
