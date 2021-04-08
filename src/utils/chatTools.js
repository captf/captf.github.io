const SERVER_MESSAGE_PREFIX = ':tmi.twitch.tv'
const REQUEST_CAPABILITY = 'CAP REQ'
const ACKNOWLEDGE_CAPABILITY = 'CAP * ACK'
const CAPABILITY_MEMBERSHIP = ':twitch.tv/membership'
const CAPABILITY_TAGS = ':twitch.tv/tags'
const CAPABILITY_COMMANDS = ':twitch.tv/commands'

const JOIN_CHANNEL = 'JOIN'
const LEAVE_CHANNEL = 'PART'
const MESSAGE = 'PRIVMSG'

const PING = 'PING' // use with regex to grab the rest to send back in with the pong?
const PONG = 'PONG'

// how does a delete message work?
/*
potential commands of note, to run automatically, to parse data from?
/user {username}
/timeout {username} [seconds] - temp ban, 10 mins, or duration
/[un]ban {username}
/commercial {30|60|90|etc}
/host {channel}
/raid {channel}
/marker {description} - add an optional description at the current point.
 */

/*
Get an oauth token
https://id.twitch.tv/oauth2/authorize?client_id=CLIENT_ID
	&redirect_uri=REDIRECT_URI
	&response_type=code
	&scope=chat:read+chat:edit


 */

// can I check account age easily?

// https://d-fischer.github.io/twitch-chat-client/docs/examples/basic-bot.html