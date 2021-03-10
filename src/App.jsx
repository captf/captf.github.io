import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Overlays from "./components/Overlays";
import IndexPage from "./IndexPage";
import Clock from './components/Clock'
import Timer from './components/Timer'

const App = () => {

    return (
        <div className="captf-github ui container">
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/overlays/clock" exact component={Clock} />
                    <Route path="/overlays/timer/:time" render={timer} />
                </div>
            </BrowserRouter>
        </div>
    );
};

const timer = ({match}) => {
	return <Timer time={match.params.time} />
}

export default App;