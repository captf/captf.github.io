import axios from 'axios'
import React from "react";

const twitchEmote = axios.create({
    baseURL: 'https://api.twitchemotes.com/api/v4/'
})
const _TWITCH_EMOTE_HOST = "https://static-cdn.jtvnw.net/emoticons/v2/"


export const getChannelEmoteData = (channelId) => {
    return twitchEmote.get(`channels/${channelId}`)
        .then(({data}) => { return {...data}})
        .catch(handleError)
}

export const getEmoteNode = ({id, name}) => {
    // todo: figure out size better?
    //todo key for this
    const baseUrl = `${_TWITCH_EMOTE_HOST}/${id}/default/dark/`
    return <img className="chat-emote"
                src={`${baseUrl}1.0`}
                srcSet={`${baseUrl}1.0 1x, ${baseUrl}2.0 2x, ${baseUrl}3.0 3x, ${baseUrl}4.0 4x`}
                alt={name} />

}

const handleError = (error) => {
    console.log('Twitch Emote Error', error);
    return {}
}

