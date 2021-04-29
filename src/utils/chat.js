import {ApiClient} from "twitch";
import {ChatClient} from "twitch-chat-client";
import {authProvider} from "../config/TwitchAuthProvider";
import {config} from "../config/config";

const basicOptions = {
    channels: config.channels,
    requestMembershipEvents: true,
    readOnly: true
}

export const createChat = async ({onMessage, onJoin, onPart, onDelete}, eventStore = {}) => {
    const chatClient = new ChatClient(authProvider, basicOptions);
    const apiClient = new ApiClient({authProvider});

    await chatClient.connect();

    chatClient.onMessage((channel, user, message, msg) => {
        onMessage(msg)
    })

    chatClient.onMessageRemove((channel, messageId) => {
        onDelete(channel, messageId)
    })

    chatClient.onJoin((channel, user) => {
        onJoin({channel, user})
    })

    chatClient.onPart((channel, user) => {
        onPart({channel, user})
    })

    const ignoredMessages = ['PING', 'PONG', 'USERSTATE', 'ROOMSTATE', 'GLOBALUSERSTATE',
        '353', '366', '375', '372', '376', '001', '002', '003', '004', 'JOIN', 'PART', 'CAP']

    chatClient.onAnyMessage((msg => {
        if (!ignoredMessages.includes(msg.command)) {
            console.log(msg)
        }
    }))

    return {chatClient: chatClient, apiClient: apiClient}
}

