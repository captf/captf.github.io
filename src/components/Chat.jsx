import React, {useEffect /*, useMemo, useRef */, useState} from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {oath} from "../config";

const PING = 'PING :tmi.twitch.tv'
const PONG = 'PONG :tmi.twitch.tv'

const chatUrl = 'wss://irc-ws.chat.twitch.tv:443'

const Chat = () => {
    const [connected, setConnected] = useState(false)
    //const [passSent, setPassSent] = useState(false)
    //const history = useRef([])

    const {sendMessage, lastMessage, readyState,} = useWebSocket(chatUrl)

    const connectionStatus = ReadyStates[readyState];

    useEffect(() => {
        console.log('conn:', ReadyStates[readyState])
        // ideally use a timer here
        if (!connected && readyState === ReadyState.OPEN) {
            sendMessage(`PASS ${oath}`)
            sendMessage(`NICK nocaptf`)
            sendMessage(`CAP REQ :twitch.tv/membership`)
            sendMessage(`CAP REQ :twitch.tv/tags`)
            //sendMessage(`JOIN #nocaptf`)
            sendMessage(`JOIN #djdeaddancer`)
            setConnected(true)
        }
    },[readyState, connected, sendMessage])

    useEffect(() => {
        console.log(lastMessage?.data)
        if (lastMessage) {
            const {data} = lastMessage
            if (data === PING) {
                console.log('Ping pong')
                sendMessage(PONG)
            }
        }

    },[lastMessage, sendMessage])

    //history.current = useMemo(() => history.current.concat(lastMessage),[lastMessage])

    return (
        <div>
            CHAT
        </div>
    );
};

const ReadyStates = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
}

export default Chat;
