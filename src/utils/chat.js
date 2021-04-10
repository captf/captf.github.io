import {ApiClient} from "twitch";
import {ChatClient} from "twitch-chat-client";
import {authProvider} from "../config/TwitchAuthProvider";
import {config} from "../config/config";

const basicOptions = {
    channels: config.channels,
    requestMembershipEvents: true,
    readOnly: true
}

export const createChat = async (addMessage, eventStore) => {
    const chatClient = new ChatClient(authProvider, basicOptions);
    const apiClient = new ApiClient({authProvider});

    await chatClient.connect();

    chatClient.onMessage((channel, user, message, msg) => {
        addMessage(msg)
    })

    chatClient.onMessageRemove((channel, messageId) => {

    })

    chatClient.onAnyMessage((msg => {
        //console.log(msg)
    }))

    return {chatClient: chatClient, apiClient: apiClient}
}

