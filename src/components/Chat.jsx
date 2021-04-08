import React, {useEffect, useRef} from 'react';
import {ChatClient} from 'twitch-chat-client';
import {ApiClient} from "twitch";
import {authProvider} from "../config/TwitchAuthProvider";
import {config} from "../config/config";

const Chat = () => {
    const chatClient = useRef({})
    const apiClient = useRef({})
    const messages = useRef([])

    useEffect(() => {
        if (!chatClient.current?.isConnected) {
            const used = create(chatClient, apiClient)
            return () => {used.chatRef.current?.quit()}
        }
    },[])

    return (
        <div>
            Chat Test
            {messages.current.map((m, i) => <div key={i}>{m}</div>)}
        </div>
    )
}

export default Chat;

const create = async (chatRef, apiRef) => {
    // move these to state
    chatRef.current = new ChatClient(authProvider, {channels: config.channels});
    apiRef.current = new ApiClient({authProvider});
// listen to more events...
    await chatRef.current.connect();

    return {chatRef, apiRef}
}
