import React, {useContext, useEffect, useState} from 'react';
import ChatHandler from "../context/ChatHandler";

import './components.scss'

const Chat = () => {
    const {messages, parseMessage} = useContext(ChatHandler)
    const [parsed, setParsed] = useState([])

    useEffect(() => {
        setParsed([...messages])
    },[messages])

    return (
        <div className="twitch-chat">
            <div className="chat-header">Stream Chat</div>
            <div className="chat-box">
                {parsed?.map((m) => (
                        <div key={m.id} className="chat-item">
                            {parseMessage(m)}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Chat;
