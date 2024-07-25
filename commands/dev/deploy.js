const { SlashCommandBuilder} = require('discord.js');
const {devs} = require('../../config.json');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('../../config.json');
const { REST } = require('@discordjs/rest');
const fs = require("fs");
const logger = require("../../utils/logger");
const chalk = require("chalk");

const rest = new REST({ version: '10' }).setToken(token);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deploy')
        .setDescription('Deploys the slash commands'),
    async slashRun(client, interaction) {
        const arrayCommands = []


    }
};
