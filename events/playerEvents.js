const { useMainPlayer, createProgessBar} = require('discord-player');
const {ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require("discord.js");

const player=useMainPlayer();

player.events.on('playerStart', (queue, track) => {
    // we will later define queue.metadata object while creating the queue


        const pause = new ButtonBuilder()
            .setCustomId('pause')
            .setLabel('▶️')
            .setStyle(ButtonStyle.Primary);

        const resume = new ButtonBuilder()
            .setCustomId('resume')
            .setLabel('⏸️')
            .setStyle(ButtonStyle.Primary);

        const skip = new ButtonBuilder()
            .setCustomId('skip')
            .setLabel('⏭️')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(pause, resume, skip);

        const Embed = new EmbedBuilder()
            .setColor(0xd83651)
            .setAuthor({ name: 'Now playing', iconURL: 'https://media.discordapp.net/attachments/998254091295805500/998254843233828915/TentroMusicPFP_V2.png?ex=66a3c545&is=66a273c5&hm=b818244d7eb1f875630289c26390790b72a349a2cd30c49a876a9a3e626653f3&=&format=webp&quality=lossless&width=810&height=810'})
            .setTitle(`${track.title} by ${track.author}`)
            .setThumbnail(track.thumbnail)
            .setURL(`${track.url}`)
            .setDescription(`** 🔘▬▬▬▬▬▬▬▬▬▬▬▬▬▬  |  \`${track.duration}\`**`)
            .setFooter({ text: 'Tentro Music' });

        queue.metadata.channel.send({
            embeds: [Embed],
            components: [row]
        })


});