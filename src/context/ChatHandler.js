import React from 'react'
import {createChat} from "../utils/chat";
import {formatNumber} from "../utils/countdownTools";

const ChatContext = React.createContext({})

const _TWITCH_EMOTE_HOST = "https://static-cdn.jtvnw.net/emoticons/v2/"

const _TIMESTAMP_FORMATTER = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full', timeStyle: 'long'
})

export class ChatHandler extends React.Component {
    constructor(props) {
        super(props)
        this.client = createChat(this.onMessage)
        this.state = {
            messages:[],
            emotes:[],
            subBadges:[],
            bitBadges:[],
            cheermotes:[]
        }
    }

    onMessage = (msg) => {
        //const channelId = msg.channelId
        // use that in a request to https://api.twitchemotes.com/api/v4/channels/:channel_id
        // to get the relevant info on the channel, to fill in parts of above

        this.setState({messages: [...this.state.messages, msg]})

        // can then also get any emotes in the message, and look them up in
        // https://api.twitchemotes.com/api/v4/emotes?id=
    }

    onDelete = (message) => {
        // ??
    }

    onAction = (msg) => {

    }

    onResub = (msg) => {

    }

    onSub = (msg) => {

    }

    onEmoteOnly = () => {
        // need not readonly?
        // set a timer to turn off the emote only - which is reset if called again
    }

    parseMessage = (msg) => {
        const {id, userInfo, tags} = msg
        const {displayName, color = '#000000'} = userInfo

        const epoch = parseInt(tags.get('tmi-sent-ts'))
        const timestamp = new Date(epoch)
        // ignore that it says mins and secs, for hours and mins...
        const time = formatNumber({mins: timestamp.getHours(), secs: timestamp.getMinutes()})
        const timeTitle = _TIMESTAMP_FORMATTER.format(timestamp)

        const split = msg.parseEmotes()
        return (
            <div key={id} className="chat-message">
                <time className="chat-time" dateTime={timestamp} title={timeTitle}>{time}</time>
                <span style={{color: color}} className="chat-user">{`${displayName}:`}</span>
                <span className="message-content">
                    {split.map((part, i) => this.handleEmote(part, i))}
                </span>
            </div>
        )
    }

    handleEmote = (msgPart, key) => {
        if (msgPart.type === 'emote') {
            const {id, name} = msgPart
            // todo: figure out size better?
            const baseUrl = `${_TWITCH_EMOTE_HOST}/${id}/default/dark/`
            return <img className="chat-emote"
                        key={key}
                        src={`${baseUrl}1.0`}
                        srcSet={`${baseUrl}1.0 1x, ${baseUrl}2.0 2x, ${baseUrl}3.0 3x, ${baseUrl}4.0 4x`}
                        alt={name} />
        }
        // todo check other possibly things that it could return?
        return <React.Fragment key={key}>{msgPart.text}</React.Fragment>
    }

    componentWillUnmount() {
        if (this.client) {
            this.client.then(({chatClient}) => chatClient.quit()).catch(() => {})
        }
    }

    render() {
        return (
            <ChatContext.Provider value={{messages: this.state.messages, parseMessage: this.parseMessage}}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export default ChatContext