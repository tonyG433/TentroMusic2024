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
                .setRequired(true)),
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
                searchEngine: 'youtube' // Specify YouTube as the search engine
            });

            if (!searchResult || !searchResult.tracks.length) {
                return interaction.followUp('No results were found!');
            }else {

                const { track } = await player.play(channel, searchResult.tracks[0].url, {
                    nodeOptions: {
                        metadata: interaction
                    }
                });

                const pause = new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('Pause')
                    .setStyle(ButtonStyle.Danger);

                const resume = new ButtonBuilder()
                    .setCustomId('resume')
                    .setLabel('Resume')
                    .setStyle(ButtonStyle.Secondary);

                const row = new ActionRowBuilder()
                    .addComponents(pause, resume);

                const Embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${track.title}`)
                    .setDescription(`**has been added to the queue**`)
                    .setThumbnail(track.thumbnail)

                return interaction.followUp({
                    embeds: [Embed],
                    components: [row]
                });

            }




        } catch (e) {
            console.error(e);
            return interaction.followUp(`Something went wrong: ${e.message}`);
        }

    }
};
