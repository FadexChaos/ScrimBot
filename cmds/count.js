const ytdl = require('ytdl-core')

module.exports.run = async (bot, message, args) => {

    const streamOptions = {seek: 0, volume: 1}
    let voiceChannelID = "518906300508274716";

    console.log("Starting voice command");

    if (voiceChannelID != null) {
        if (message.guild.channels.get(voiceChannelID)){
            let vc = message.guild.channels.get(voiceChannelID);
            console.log("Next stop, connection");

            vc.join().then(connection => {
                console.log("[Voice Channel] Joined countdown channel");
                const stream = ytdl('https://www.youtube.com/watch?v=miPyFB3MjsE', {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);

                dispatcher.on("end", end => {
                    console.log("[Voice Channel] left the countdown channel")
                    vc.leave();
                })
            }).catch(err => {
                console.log(err);
            });

        }
    }
}



module.exports.help = {
    name: "count"
}