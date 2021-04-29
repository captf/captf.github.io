import axios from 'axios'

const bTTVAxios = axios.create({
    baseURL: 'https://api.betterttv.net/3/cached/'
})

export const getGlobalBttvEmotes = () => {
    return bTTVAxios.get('emotes/global')
        .then(({data}) => data)
        .catch(handleError)

    /*
    { id, code, imageType, userId}
     */
}

export const getChannelBttvEmotes = (channelId) => {
    return bTTVAxios.get(`users/twitch/${channelId}`)
        .then(({data}) => data)
        .catch(handleError)
}

export const getBttvEmoteNode = ({id, code}) => {
    const base = escape(`https://cdn.betterttv.net/emote/${id}`)
    return <img
        src={`${base}/1x`}
        alt={escape(code)}
        srcSet={`${base}/1x 1x, ${base}/2x 2x, ${base}/3x 3x`}
    />
}

const handleError = (error) => {
    console.log('BTTV Emote Error', error);
    return {}
}

// https://api.betterttv.net/3/cached/frankerfacez/emotes/global
// for a user: https://api.betterttv.net/3/cached/users/twitch/:userId
// https://api.betterttv.net/3/cached/frankerfacez/users/twitch/:userId
// emote link format: https://cdn.betterttv.net/emote/:id/:size (1x, 2x, 3x, etc)
// https://api.betterttv.net/3/cached/badges


// taken directly from the bttv js source:
const htmlEntities = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#x60;'
};

const escape = (string) => {
    return String(string).replace(/[<>"'`]/g, s => htmlEntities[s]);
}