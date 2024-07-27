const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { MessageEmbed} = require('discord.js');
const { lyricsExtractor } = require('@discord-player/extractor');
const {useQueue}=require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Looks up the lyrics of the song which is currently playing.'),
    async slashRun(client, interaction) {

        const queue = useQueue(interaction.guild.id);
        const lyricsFinder = lyricsExtractor();
        const track = queue.currentTrack;
        interaction.deferReply()
        const lyrics = await lyricsFinder.search(track.title).catch(() => null);
        if (!lyrics) return interaction.reply({ content: 'No lyrics found', ephemeral: true });

        const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

        const embed = new EmbedBuilder()
            .setTitle(lyrics.title)
            .setURL(lyrics.url)
            .setThumbnail(lyrics.thumbnail)
            .setAuthor({
                name: lyrics.artist.name,
                iconURL: lyrics.artist.image,
                url: lyrics.artist.url
            })
            .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
            .setColor('Yellow')
            .setFooter({ text: `Lyrics provided by Genius` });

        return interaction.editReply({ embeds: [embed] });


    }
};