const { InteractionType, ButtonBuilder, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const logger = require('../utils/logger')
const {useQueue} = require("discord-player");
const {autocomplete}=require('../commands/music/play')


module.exports = {
    name: 'interactionCreate',
    async run(interaction, client) {

        if (interaction.isAutocomplete()) {

            try {
                await autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }

        if((interaction.type === InteractionType.MessageComponent)){

            const queue = useQueue(interaction.guild.id);
            const components = interaction.message.components[0].components;

            const progressBar = queue.node.createProgressBar();
            const track = queue.currentTrack;

            const volume = queue.node.volume

            const EmbedUpdated = new EmbedBuilder()
                .setColor(0xd83651)
                .setAuthor({ name: 'Now playing', iconURL: 'https://media.discordapp.net/attachments/998254091295805500/998254843233828915/TentroMusicPFP_V2.png?ex=66a3c545&is=66a273c5&hm=b818244d7eb1f875630289c26390790b72a349a2cd30c49a876a9a3e626653f3&=&format=webp&quality=lossless&width=810&height=810'})
                .setTitle(`${track.title} by ${track.author}`)
                .setThumbnail(track.thumbnail)
                .setURL(`${track.url}`)
                .setDescription(`** ${progressBar} **`)


            await interaction.message.edit({embeds: [EmbedUpdated]})



            if (interaction.customId === 'pause') {
                if(queue)queue.node.setPaused(!queue.node.isPaused());

                await interaction.reply({ content: 'Song has been paused' });

                // Disable the pause button
                const updatedComponents = components.map(component => {
                    if (component.customId === 'pause') {
                        return ButtonBuilder.from(component).setDisabled(true);
                    }
                    if (component.customId === 'resume') {
                        return ButtonBuilder.from(component).setDisabled(false);
                    }

                    return ButtonBuilder.from(component);
                });

                await interaction.message.edit({
                    components: [new ActionRowBuilder().addComponents(updatedComponents)]
                });
            }

            if (interaction.customId === 'resume') {
                if(queue) queue.node.setPaused(!queue.node.isPaused());
                await interaction.reply({ content: 'Song Resuming'});

                const updatedComponents = components.map(component => {
                    if (component.customId === 'pause') {
                        return ButtonBuilder.from(component).setDisabled(false);
                    }
                    if (component.customId === 'resume') {
                        return ButtonBuilder.from(component).setDisabled(true);
                    }

                    return ButtonBuilder.from(component);
                });

                await interaction.message.edit({
                    components: [new ActionRowBuilder().addComponents(updatedComponents)]
                });
            }

            if (interaction.customId === 'skip') {
                if(queue){
                    queue.node.skip()
                    await interaction.reply({ content: 'Song be skipped'});
                    queue.node.setPaused(!queue.node.isPaused());
                }
            }

            if (interaction.customId === 'volup') {
                if(volume<150){
                    queue.node.setVolume(volume+10)
                    await interaction.reply({ content: `Volume has been set to \`${volume+10}\`%`, ephemeral: true});
                }
            }
            if (interaction.customId === 'voldown') {
                if(volume>10){
                    queue.node.setVolume(volume-10)
                    await interaction.reply({ content: `Volume has been set to \`${volume-10}\`%`, ephemeral: true})
                }
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

