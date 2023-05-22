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

const config = require('./config.json');
const rest = new Discord.REST({ version: '9'}).setToken(config.token) 
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds]});

var map = fs.readdirSync('./command').filter(file => file.endsWith('.js'))
var cmd = {};
var k = [];
(async () => {
    for(i of map) {
        let cmds = require(`./command/${i}`);
        k.push(cmds.info)
        cmd[cmds.info.name] = {}
        cmd[cmds.info.name].exec = cmds.exec
        console.log(`Loaded ${cmds.info.name}`)
    }
    try {
        await rest.put(Discord.Routes.applicationCommands(config.client_id), { body: k })
    } catch(e) {
        console.error(e)
    }
    
})().then( () => {
    client.login(config.token)
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {
    //console.log(interaction)
    if(!interaction.isChatInputCommand()) { return }
    cmd[interaction.commandName].exec(interaction)
});


process.on("uncaughtException", (e) => {
    console.error(e)
})

client.login(config.token)
