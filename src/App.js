import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Join from "./components/Join"
import Room from "./components/Room"

export default class App extends Component {
    render() {
        return <div className="container">
            <Router>
                <Switch>
                    <Route exact path="/" component={Join} />
                    <Route exact path="/:room/:name" component={Room} />
                    <Route component={Join} />
                </Switch>
            </Router>
        </div>
    }
}