import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Overlays from "./components/Overlays";
import IndexPage from "./IndexPage";

const App = () => {

    return (
        <div className="captf-github ui container">
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/overlays/:widget" component={Overlays} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;