import React, {useContext, useEffect, useState} from 'react';
import ChatHandler, {TwitchStore} from "../../context/TwitchStore";

import '../components.scss'

const Chat = () => {
    return (
        <TwitchStore>
            <InnerChat />
        </TwitchStore>
    )
}

const InnerChat = () => {
    const {messages, parseMessage} = useContext(ChatHandler)
    const [parsed, setParsed] = useState([])

    useEffect(() => {
        const received = Object.keys(messages).map(key => {
            const message = messages[key]
            return {id: message.id, msg: parseMessage(message)}
        })

        setParsed(received)
    },[messages, parseMessage])


    return (
        <div className="twitch-chat">
            <div className="chat-header">Stream Chat</div>
            <div className="chat-box">
                {parsed?.map(m => (
                        <div key={m.id} className="chat-item">
                            {m.msg}
                        </div>
                    )
                )}
            </div>
        </div>
    )


}

export default Chat;
