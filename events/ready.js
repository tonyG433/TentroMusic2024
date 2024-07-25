const logger = require('../utils/logger')
const chalk = require("chalk");
const {useMainPlayer} = require("discord-player");
const {YoutubeiExtractor} = require("discord-player-youtubei");


module.exports = {
    name: 'ready',
    run(client) {
        logger('Ready', 'Logged in as' + ' ' + chalk.bold.white(client.user.username) + ' ' + 'and ready to go!')
        //require('../handlers/command')(client, true)
            //.then(() => {
               // logger('DEPLOY', 'Slash commands have been successfully deployed.')
        const player = useMainPlayer();

        // generate dependencies report
        console.log(player.scanDeps());
        // ^------ This is similar to discord-voip's `generateDependenciesReport()` function, but with additional informations related to discord-player

        // log metadata query, search execution, etc.
        player.on('debug', console.log);
        // ^------ This shows how your search query is interpreted, if the query was cached, which extractor resolved the query or which extractor failed to resolve, etc.

        // log debug logs of the queue, such as voice connection logs, player execution, streaming process etc.
        player.events.on('debug', (queue, message) => console.log(`[DEBUG ${queue.guild.id}] ${message}`));
            //})

        player.extractors.register(YoutubeiExtractor, {
            streamOptions: {
                useClient: "ANDROID"
            }
        })
    }
}
