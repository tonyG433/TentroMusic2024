const { useMainPlayer, createProgressBar } = require('discord-player');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

const player = useMainPlayer();

player.events.on('playerStart', async (queue, track) => {

    const progress = queue.node.createProgressBar();

    const pause = new ButtonBuilder()
        .setCustomId('pause')
        .setEmoji('<:EmojiPause:1266346828727844997>')
        .setStyle(ButtonStyle.Secondary);

    const resume = new ButtonBuilder()
        .setCustomId('resume')
        .setEmoji('<:EmojiResume:1266348013329059871>')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);

    const skip = new ButtonBuilder()
        .setCustomId('skip')
        .setEmoji('<:EmojiSkip:1266348380398026772>')
        .setStyle(ButtonStyle.Secondary);

    const volup = new ButtonBuilder()
        .setCustomId('volup')
        .setEmoji('🔊')
        .setStyle(ButtonStyle.Secondary);

    const voldown = new ButtonBuilder()
        .setCustomId('voldown')
        .setEmoji('🔉')
        .setStyle(ButtonStyle.Secondary);


    const row = new ActionRowBuilder()
        .addComponents(pause, resume, skip, volup, voldown);

    // Create the initial embed
    const progressBar = queue.node.createProgressBar();

    const embed = new EmbedBuilder()
        .setColor(0xd83651)
        .setAuthor({ name: 'Now playing', iconURL: 'https://media.discordapp.net/attachments/998254091295805500/998254843233828915/TentroMusicPFP_V2.png?ex=66a3c545&is=66a273c5&hm=b818244d7eb1f875630289c26390790b72a349a2cd30c49a876a9a3e626653f3&=&format=webp&quality=lossless&width=810&height=810' })
        .setTitle(`${track.title} by ${track.author}`)
        .setThumbnail(track.thumbnail)
        .setURL(`${track.url}`)
        .setDescription(`** ${progressBar} **`)
        .setFooter({ text: `Requested by ${track.requestedBy.username}`, iconURL: `${track.requestedBy.displayAvatarURL()}` }); //TODO ????

    // Send the initial embed with buttons
    const message = await queue.metadata.channel.send({
        embeds: [embed],
        components: [row]
    });


});