const color = 0xFC2D00

function createTicketWL(bot){
    const EmbedWL = new EmbedBuilder()
        .setColor(color)
        .setTitle('Demande de Whitelist')
        .setDescription('Description de la WL: ...')

    bot.channels.cache.find(channel => channel.id ===  "1113446931591602206").send({ 
        embeds: [EmbedWL],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Create Ticket",
                    custom_id: "wl_ticket"
                }]
            }
        ]
    })
}

function createTicketDeath(bot){
    const EmbedRPDeath = new EmbedBuilder()
        .setColor(color)
        .setTitle('Déclarer sa mort')
        .setDescription('Cliquer sur le bouton pour ouvrir un channel dans lequel vous nous expliquerez comment vous etes mort ou monter un dossier de mort RP')

    bot.channels.cache.find(channel => channel.id === "1114274262442844281" ).send({ 
        embeds: [EmbedBackground],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Create mon perso",
                    custom_id: "background_ticket"
                }]
            }
        ]
    })
}

function createTicketHelp(bot){
    const EmbedSupport = new EmbedBuilder()
        .setColor(color)
        .setTitle('Demande de support')
        .setDescription('Créer un tiket et expliquer nous votre problème')

    bot.channels.cache.find(channel => channel.id === "1113937575950954557" ).send({ 
        embeds: [EmbedSupport],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Create Ticket",
                    custom_id: "support_ticket"
                }]
            }
        ]
    })
}

function createTicketBackground(bot){
    const EmbedBackground = new EmbedBuilder()
        .setColor(color)
        .setTitle('Création de personnage')
        .setDescription("Créer un tiket et raconter nous l'histoire de votre personnage") 

        bot.channels.cache.find(channel => channel.id === "1114274956566605874" ).send({ 
            embeds: [EmbedRPDeath],
            components: [
                {
                    type: 1,
                    components : [{
                        type: 2,
                        style: 4,
                        label: "Déclarer sa mort",
                        custom_id: "rp_death_ticket"
                    },
                    {
                        type: 2,
                        style: 4,
                        label: "Dossier mort RP",
                        custom_id: "death_ask_ticket"
                    }
                    ]
                }
            ]
        })
}

function createTicket(bot){
    createTicketWL(bot)
    createTicketDeath(bot)
    createTicketBackground(bot)
    createTicketHelp(bot)
}

module.exports = {
    "createTicket": createTicket,
    "createTicketWL": createTicketWL,
    "createTicketDeath": createTicketDeath,
    "createTicketBackground": createTicketBackground,
    "createtTicketHelp": createTicketHelp
}