import { StaticAuthProvider } from 'twitch-auth';
import {config} from "./config";

// https://d-fischer.github.io/twitch/docs/basic-usage/creating-instance.html
export const authProvider = new StaticAuthProvider(config.clientId, config.accessId);
