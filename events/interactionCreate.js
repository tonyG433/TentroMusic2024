const { InteractionType} = require('discord.js');
const logger = require('../utils/logger')
const {useQueue} = require("discord-player");


module.exports = {
    name: 'interactionCreate',
    async run(interaction, client) {

        if((interaction.type === InteractionType.MessageComponent)){
            const queue = useQueue(interaction.guild.id);
            if (interaction.customId === 'pause') {

                queue.node.setPaused(!queue.node.isPaused())
                await interaction.reply({ content: 'Song be paused'}); //TODO
            }
            if (interaction.customId === 'skip') {
                queue.node.skip()
                await interaction.reply({ content: 'Song be skipped'});
            }
        }
        if ((interaction.type === InteractionType.ApplicationCommand)) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.slashRun(client, interaction);
                logger('Command ran', `\nCommand: ${command.data.name}\nUser: ${interaction.user.tag}\nGuild: ${interaction.guild ? interaction.guild.name : 'None'}\n`)
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}
