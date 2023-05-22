const info = {
    name: 'echo',
    description: 'Repeat what you said',
    options: [
        {
            name: 'input',
            description: 'Say something here',
            type: 3,
            required: true,
        }
    ]
}

async function cmd(interaction) {
    const input = interaction.options.getString('input');
    await interaction.reply(`You just said: ${input}`);
}

module.exports = {
    info: info,
    exec: cmd
}