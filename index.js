const config = require('./config.json')
const fs = require("fs");
const { Client, GatewayIntentBits, Partials, Collection, ActivityType} = require('discord.js');
const {Player} = require("discord-player");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ],
    allowedMentions: { parse: ["users"] },
    partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    presence: {
        activities: [{
            name: `Music`,
            type: ActivityType.Listening
        }]
    }
})

// Slash commands
client.slashCommands = new Collection()

const player = new Player(client);

player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

// Slash commands loading
require('./handlers/command')(client, false)

// loads the events
require('./handlers/event')(client)

require('./events/playerEvents')

// Logs in
client.login(config.token);

