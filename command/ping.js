const info = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];
async function ping(interaction) {
    if(!interaction.isChatInputCommand()) { return }
    if(interaction.commandName == 'ping') {
        await interaction.reply('pong')
    }
    
}

module.exports = {
    info: info,
    exec: ping
}