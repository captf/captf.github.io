import React from 'react';
import IndexPage from "./IndexPage";
import Clock from './components/Clock'
import Countdown from './components/Countdown'
import {useRoutes} from "hookrouter";
import Chat from "./components/twitch/Chat";
import All from "./components/All";

const routes = {
    '/': () => <IndexPage />,
    '/all': () => <All />,
    '/overlays/clock': () => <Clock />,
    '/overlays/countdown/:minute': ({minute}) => <Countdown minute={minute} />,
    '/overlays/chat': () => <Chat />
}

const App = () => {
    const routeResult = useRoutes(routes)

    return (
        <div className="captf-github container">
            {routeResult || 'Nothing Yet'}
        </div>
    )
}

export default App;