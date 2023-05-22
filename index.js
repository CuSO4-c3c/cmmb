const Discord = require('discord.js');
const fs = require('fs');

if (!fs.existsSync('./config.json')) {
    fs.writeFileSync('config.json', `{
        "token": "",
        "client_id": ""
    }`);
    console.log('created config.json');
    process.exit(0);
}

const config = require('./config.json')
const rest = new Discord.REST({ version: '10'}).setToken(config.token) 
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds]});

var map = fs.readdirSync('./command')
var cmd = {}
//console.log(map)

for(i of map) {
    var cmds = require(`./command/${i}`);
    cmd[cmds.info[0].name] = {}
    cmd[cmds.info[0].name].exec = cmds.exec
    cmd[cmds.info[0].name].call = cmds.info[0].name
    try {
        rest.put(Discord.Routes.applicationCommands(config.client_id), { body: cmds.info })
    } catch(e) {
        console.error(e)
    }
}
console.log(cmd)
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});


// ping command
///*
client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) { return }
    cmd[interaction.commandName].exec(interaction)
});
//*/


client.login(config.token)
//token 
//client id 