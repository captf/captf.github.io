import React, {useContext, useEffect, useState} from 'react';
import ChatHandler, {TwitchStore} from "../../context/TwitchStore";

import '../components.scss'

const ViewerCount = () => {
    return (
        <TwitchStore>
            <InnerCount />
        </TwitchStore>
    )
};

const InnerCount = () => {
    const {channelUsers} = useContext(ChatHandler)
    const [count, setCount] = useState(0)

    useEffect(()=> {
        if (channelUsers) {
            const users = channelUsers['#lee_chaos'] || []
            setCount(users.length)
        }
    },[channelUsers])

    return (
        <div className="viewer-count">
            <div>
                <i className="count-icon" />
                <div className="count-text">Viewer Count</div>
            </div>
            <div className="count-separator">: </div>
            <div className="count-figure">{count}</div>
        </div>
    );

}

export default ViewerCount;