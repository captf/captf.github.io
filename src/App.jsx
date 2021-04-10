import React from 'react';
import IndexPage from "./IndexPage";
import Clock from './components/Clock'
import Countdown from './components/Countdown'
import {useRoutes} from "hookrouter";
import Chat from "./components/Chat";
import {ChatHandler} from "./context/ChatHandler";

const routes = {
    '/': () => <IndexPage />,
    '/overlays/clock': () => <Clock />,
    '/overlays/countdown/:minute': ({minute}) => <Countdown minute={minute} />,
    '/overlays/chat': () => <Chat />
}

const App = () => {
    const routeResult = useRoutes(routes)

    return (
        <ChatHandler>
            <div className="captf-github container">
                {routeResult || 'Nothing Yet'}
            </div>
        </ChatHandler>
    )
}

export default App;