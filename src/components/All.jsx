import React from 'react';
import Clock from "./Clock";
import Countdown from "./Countdown";
import Chat from "./twitch/Chat";
import ViewerCount from "./twitch/ViewerCount";

const All = () => {
    return (
        <div>
            {/*<Clock />*/}
            {/*<Countdown minute="0" />*/}
            <ViewerCount />
            <Chat />
        </div>
    );
};

export default All;