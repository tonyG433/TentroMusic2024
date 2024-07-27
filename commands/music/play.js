const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { Player, QueryType } = require('discord-player');
const { useMainPlayer } = require('discord-player');




module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The query to search for.')
                .setRequired(true)
                .setAutocomplete(true)),

    async autocomplete(interaction) {
        const player = useMainPlayer();
        const focusedOption = interaction.options.getFocused();
        if(!focusedOption)return
        const results = await player.search(focusedOption);
            return interaction.respond(
            results.tracks.slice(0, 10).map((t) => ({
                name: t.title,
                value: t.url
            }))
        );

    },

    async slashRun(client, interaction) {

        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return interaction.reply({ content: 'You are not connected to a voice channel.', ephemeral: true });
        }

        const query = interaction.options.getString('query', true)

        await interaction.deferReply();

        try {
            const searchResult = await player.search(query, {
                requestedBy: interaction.user,
                searchEngine: 'youtube'
            });

            if (!searchResult || !searchResult.tracks.length) {
                return interaction.followUp('No results were found!');
            }else {

                const { track } = await player.play(channel, searchResult.tracks[0].url, {
                    nodeOptions: {
                        metadata: interaction,
                        leaveOnStop: false,
                        leaveOnStopCooldown: 5000,
                        leaveOnEnd: false,
                        leaveOnEndCooldown: 5000,
                        leaveOnEmpty: false,
                        leaveOnEmptyCooldown: 5000,
                    }
                });


                const Embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${track.title}`)
                    .setDescription(`**has been added to the queue**`)
                    .setThumbnail(track.thumbnail)

                return interaction.followUp({embeds: [Embed],});

            }

        } catch (e) {
            console.error(e);
            return interaction.followUp(`Something went wrong: ${e.message}`);
        }

    },

};
