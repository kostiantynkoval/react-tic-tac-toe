import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

export const App = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Hello Rebike !!!
            </p>
            <Link className="App-link" to="/game">Let's play!</Link>
        </header>
    </div>
);
