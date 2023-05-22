const info = {
    name: 'simsimi',
    description: 'Talk with simsimi',
    options: [
        {
            name: 'message',
            description: 'Chat with simsimi!',
            type: 3,
            required: true
        },
        {
            name: 'language',
            description: 'Choose you prefer language (vn, en, ja, ko...). Default: vn',
            type: 3,
            required: false
        }
    ]
}
 
const axios = require('axios')

async function simsimi(interaction) {
    const input = interaction.options.getString('message');
    var lang = interaction.options.getString('language');
    if(lang == null) {
        lang = 'vn'
    }
    axios({
        method: 'POST',
        url: `https://api.simsimi.vn/v1/simtalk`, 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: `text=${input}&lc=${lang}`
    }).then(async (response) => {
        interaction.reply(response.data.message)
    })
}

module.exports = {
    info: info,
    exec: simsimi
}