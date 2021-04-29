import React from 'react'
import {createChat} from "../utils/chat";
import {formatNumber} from "../utils/countdownTools";
import {getEmoteNode} from "../api/twitchemotes";
import {getBttvEmoteNode, getGlobalBttvEmotes} from "../api/betterTTV";
import _ from 'lodash'

const TwitchContext = React.createContext({})

const _TIMESTAMP_FORMATTER = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full', timeStyle: 'long'
})

export class TwitchStore extends React.Component {
    constructor(props) {
        super(props)
        this.client = null
        this.emotes = {}
        this.subBadges = {}
        this.bitBadges = {}
        this.cheermotes = {}

        this.state = {
            messages:{},
            channelUsers: {},
            queriedChannels: []
        }
    }

    componentDidMount() {
        this.client = createChat(this.chatEvents)
        getGlobalBttvEmotes().then(this.updateEmotes)
    }

    componentWillUnmount() {
        if (this.client) {
            this.client.then(({chatClient}) => chatClient.quit()).catch(() => {})
        }
    }

    updateEmotes = (emotes) => {
        const found = {}
        emotes.forEach(emote => found[emote.code] = emote)
        this.emotes = {...this.emotes, ...found}
    }

    updateChannelBadges = ({subscriber_badges, cheermotes, bit_badges}) => {
        this.updateSubscriberBadges(subscriber_badges)
        this.updateBitBadges(bit_badges)
        this.updateCheermotes(cheermotes)
    }

    updateSubscriberBadges = (subscriber_badges) => {
        if (subscriber_badges) {
            this.subBadges = {...subscriber_badges}
            console.log(this.subBadges)
        }
    }
    updateBitBadges = (bitBadges) => {
        if (bitBadges) {
            this.bitBadges = {...bitBadges}
        }
    }
    updateCheermotes = (cheermotes) => {
        if (cheermotes) {
            this.cheermotes = {...cheermotes}
        }
    }

    onMessage = (msg) => {
        // need to get channel emote data - where from?
        // const channelId = msg.channelId
        // if (!this.state.queriedChannels.includes(channelId)) {
        //     this.getChannelEmoteData(channelId)
        //         .then(this.updateChannelBadges)
        //     this.setState({queriedChannels: [...this.state.queriedChannels, channelId]})
        // }
        const messages = {...this.state.messages}
        messages[msg.id] = msg
        this.setState({messages})

    }

    onDelete = (channel, messageId) => {
        // ??
        if (this.state.messages[messageId]) {
            const updated = {...this.state.messages}
            delete updated[messageId]
            this.setState({messages: updated})
        }
    }

    onAction = (msg) => {

    }

    onResub = (msg) => {

    }

    onSub = (msg) => {

    }

    onJoin = ({channel, user}) => {
        const channels = {...this.state.channelUsers}
        channels[channel] = [...(channels[channel] || []), user]
        console.log('join', channel, user, channels[channel].length)
        this.setState({channelUsers: channels})
    }

    onPart = ({channel, user}) => {
        const channels = {...this.state.channelUsers}
        channels[channel] = _.pull((channels[channel] || []), user)
        console.log('part', channel, user, channels[channel].length)
        this.setState({channelUsers:channels})
    }

    onEmoteOnly = () => {
        // need not readonly?
        // set a timer to turn off the emote only - which is reset if called again
    }

    parseMessage = (msg) => {
        //console.log(msg)
        const {id, userInfo, tags} = msg
        const {displayName, color = '#000000'} = userInfo

        const epoch = parseInt(tags.get('tmi-sent-ts'))
        const timestamp = new Date(epoch)
        // ignore that it says mins and secs, for hours and mins...
        const time = `${formatNumber(timestamp.getHours())}:${formatNumber(timestamp.getMinutes())}`
        const timeTitle = _TIMESTAMP_FORMATTER.format(timestamp)

        const split = msg.parseEmotes()
        return (
            <div key={id} className="chat-message">
                <time className="chat-time" dateTime={timestamp} title={timeTitle}>{time}</time>
                <div style={{color: color}} className="chat-user">{`${displayName}:`}</div>
                <div className="message-content">
                    {split.map(part => this.handleEmote(part))}
                </div>
            </div>
        )
    }

    handleEmote = (msgPart) => {
        if (msgPart.type === 'emote') {
            return getEmoteNode(msgPart)
        }
        // todo check other possibly things that it could return?
        return this.checkForBttvEmotes(msgPart)
    }

    checkForBttvEmotes = ({text}) => {
        let parsed = text
        // slow as shit way
        Object.keys(this.emotes).forEach(key => {
            parsed = parsed.replaceAll(key, getBttvEmoteNode(this.emotes[key]))
        })
        //console.log(parsed.toString())

        return <>{parsed}</>
    }

    viewerCount = (channel) => {
        return Object.keys(this.state.channelUsers[channel]).length
    }

    chatEvents = {
        onMessage: this.onMessage,
        onJoin: this.onJoin,
        onPart: this.onPart,
        onDelete: this.onDelete
    }

    render() {

        return (
            <TwitchContext.Provider value={
                {
                    messages: this.state.messages,
                    viewerCount: this.viewerCount,
                    parseMessage: this.parseMessage,
                    channelUsers: this.state.channelUsers
                }
            }>
                {this.props.children}
            </TwitchContext.Provider>
        )
    }
}

export default TwitchContext