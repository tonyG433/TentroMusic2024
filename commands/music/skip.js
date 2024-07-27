const { EmbedBuilder,  SlashCommandBuilder} = require('discord.js');
const { GuildMember } = require('discord.js');
const { Player, QueryType } = require('discord-player');
const { useMainPlayer } = require('discord-player');
const { useQueue } = require("discord-player");

// TODO
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song e.'), //TODO
    async slashRun(client, interaction) {

        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;

        const queue = useQueue(interaction.guild.id);
        queue.node.skip()

    }
};
