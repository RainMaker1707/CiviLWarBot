const {EmbedBuilder, channelMention} = require("discord.js")

const color = 0xFC2D00

async function createTicketWL(bot){
    const msg  = "Bienvenue sur **CivilWar95**.\nAvant toute chose veuillez prendre le temps de"
                +" lire le "+channelMention("1113445219598340118")
                +" et le "+ channelMention("1113447196147322930") +" du "
                +"serveur."
                +"\n - Votre pseudo sur Discord ET en jeu doit correspondre au prénom et au nom de votre personnage"
                +"\n- Puis créez un ticket via le bouton **[Demande de Whitelist]**"
                +"\n- Renseignez dans ce ticket votre SteamID"
                +"\n\nUne fois le ticket créé, un membre du staff prendra contact avec vous pour passer à l'étape de l'entretien. "
                +"Si vous êtes disponible immédiatement, patientez dans le canal "+ channelMention("1131629828081201324")+" ou "+ channelMention("1131629464023998664") +".\n\n"
                +"Dès que le ticket sera créé, un membre du staff prendra contact avec vous pour entamer votre whitelist."
    const EmbedWL = new EmbedBuilder()
        .setColor(color)
        .setTitle("🛃 Whitelist 🛃")
        .setDescription(msg)
    bot.channels.fetch("1113446931591602206").then((chan)=>{
        chan.send({ 
            embeds: [EmbedWL],
            components: [
                {
                    type: 1,
                    components : [{
                        type: 2,
                        style: 4,
                        label: "Demande de Whitelist",
                        custom_id: "wl_ticket"
                    }]
                }
            ]
        })
    })
}

function createTicketDeath(bot){
    const msg  = "Dans la configuration actuelle du serveur, le décès n'est pas une fatalité. Lorsque-vous mourrez il vous est permis de continuer "
                +"à jouer avec votre personnage en le considérant comme blessé et sortant de l'hôpital.\n"
                +"Si néanmoins vous souhaitez mettre fin à votre personnage, veuillez le déclarer via le bouton **[Déclarer une mort RP]**\n"
                +"Si vous êtes en conflit avec quelqu'un et que vous jugez que le seul moyen de résoudre le problème nécessite le décès d'un des parti.\n"
                +"Vous avez la possibilité de soumettre un dossier de mort RP via le bouton **[Dossier de mort RP]**\n\n"
                +"⚠️  **Attention**\n" 
                +"Dès lors que vous soumettez un dossier de mort RP vous êtes vous aussi sous le coup d'une hypothétique mort RP.\n " 
                +"Si vous perdez la vie lors d'une scène où la personne que vous comptez tuer est présente alors vous perdrez votre personnage.\n\n"
                +"Notez qu'un dossier de mort RP est confidentiel. Le joueur visé ne sera pas mis au courant de la demande. Une fois la personne visée"
                +"assassinée veuillez le déclarer via le bouton **[Déclarer une mort RP]**"

    const EmbedRPDeath = new EmbedBuilder()
        .setColor(color)
        .setTitle("📘 Gestion des morts RP 📘")
        .setDescription(msg)

    bot.channels.cache.find(channel => channel.id === "1114274956566605874" ).send({ 
        embeds: [EmbedRPDeath],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Déclarer une mort RP",
                    custom_id: "rp_death_ticket"
                },
                {
                    type: 2,
                    style: 4,
                    label: "Dossier de mort RP",
                    custom_id: "death_ask_ticket"
                }
                ]
            }
        ]
    })
}

function createTicketHelp(bot){
    const msg = "**Vous pouvez créer un ticket dans cette section pour toute demande relative à :**"
    +"\n - Un soucis avec un autre joueur"
    +"\n- Un bug en jeu nécessitant un remboursement ou un TP"
    +"\n- Une question que vous souhaitez garder confidentielle"
    +"\n- Une demande particulière"
    +"\n\nSi vous rencontrez un **problème technique avec votre jeu**, veuillez-vous rediriger vers le canal "+ channelMention("1113937283675074670") +"\n"
    +"Dans la situation où vous rencontrez un soucis en jeu un **justificatif attestant d'un dysfonctionnement** est requis (Screenshot, vidéo...)"
    +"\n\nNotez que le temps de traitement de votre demande peut varier en fonction de la disponibilité des membres du staff. Par ailleurs,"
    +" il est inutile d'essayer de les contacter par MP"

    const EmbedSupport = new EmbedBuilder()
        .setColor(color)
        .setTitle("📕  Demande d'aide 📕")
        .setDescription(msg)

    bot.channels.fetch("1113937575950954557" ).then((chan)=> chan.send({ 
        embeds: [EmbedSupport],
        components: [
            {
                type: 1,
                components : [{
                    type: 2,
                    style: 4,
                    label: "Créer un ticket",
                    custom_id: "support_ticket"
                }]
            }
        ]
    }))
}

function createTicketBackground(bot){
    const msg = "Si vous le souhaitez, il vous est possible de soumettre le background de votre personnage via cette section."
    +"\n\n ⚠️  **Attention** "
    +"Avant toutes chose veuillez prendre connaissance du " + channelMention("1113447196147322930") +" du serveur afin de créer un personnage cohérent avec l'époque et le contexte dans lequel il se trouve."
    +"\n\nDans le cas où vous comptez jouer un civil, le background est facultatif. Il devient obligatoire si vous souhaitez rejoindre une faction."

    const EmbedBackground = new EmbedBuilder()
        .setColor(color)
        .setTitle("📗  Création de Background 📗")
        .setDescription(msg) 

        bot.channels.cache.find(channel => channel.id === "1114274262442844281" ).send({ 
            embeds: [EmbedBackground],
            components: [
                {
                    type: 1,
                    components : [{
                        type: 2,
                        style: 4,
                        label: "Créer un ticket",
                        custom_id: "background_ticket"
                    }]
                }
            ]
        })
        
}

async function createTicketHousing(bot){
    const msg  = "Vous pouvez créer un ticket dans cette section pour demander à vous installer quelque part.\n\n"
                + "⚠️ *Pour la durée de la beta, il n'est possible d'emménager uniquement que dans Zelenogorsk intra-muros.*\n\n"
                + "**Tarifs :**\n - Un appartement : **35.000Hry**\n- Une maison : **75.000Hry**\n"
                + "- Les fonctionnaires du gouvernement et de la police disposent d'un appartement de fonction **gratuit** dans les HLM de Zelenogorsk.\n\n"
                + "Après avoir ouvert le ticket, dirigez-vous vers la préfecture de Zelenogorsk et demandez le gouvernement. Si vous rencontrez un joueur"
                + " appartenant à cette faction, déclarez-lui la position de votre nouvelle adresse et donnez lui l'argent.\n\n"
                + "Si aucun joueur du gouvernement n'est présent, faites-le nous savoir sur le ticket et le staff s'en occupera HRP.\n\n"
                + "**Après avoir déboursé la somme correspondant à votre achat, il vous sera donné les choses suivantes :**\n"
                + "- 1 Codelock (potentiellement un deuxième maximum si votre nouveau domicile comporte deux potentielles entrées)\n"
                + "- 1 Kit de Porte (ou deux, vous devrez rassembler vous-même les composants pour construire l'objet)\n"
                + "- Kits de barricade de fenêtre (nombre variant, vous devrez rassembler vous-même les composants pour construire l'objet)\n"
                + "- 1 Frigo - 1 SoloLocker - 1 StorageBox - 1 Wardrobe - 1 Shelf (vous pourrez rajouter uniquement des meubles lootables dans votre domicile)\n\n"
                + "Notez que le temps de traitement de votre demande peut varier en fonction de la disponibilité des membres du staff. **Par ailleurs, il est inutile d'essayer de les contacter par MP.**"

    const EmbedWL = new EmbedBuilder()
        .setColor(color)
        .setTitle("🏠 Acheter un logement 🏠")
        .setDescription(msg)
    bot.channels.fetch("1136400543250661518").then((chan)=>{
        chan.send({ 
            embeds: [EmbedWL],
            components: [
                {
                    type: 1,
                    components : [{
                        type: 2,
                        style: 4,
                        label: "Demande de logement",
                        custom_id: "housing_ticket"
                    }]
                }
            ]
        })
    })
}

function createTicket(bot){
    createTicketWL(bot)
    createTicketDeath(bot)
    createTicketBackground(bot)
    createTicketHelp(bot)
    createTicketHousing(bot)
}

module.exports = {
    "createTicket": createTicket,
    "createTicketWL": createTicketWL,
    "createTicketDeath": createTicketDeath,
    "createTicketBackground": createTicketBackground,
    "createTicketHelp": createTicketHelp,
    "createTicketHousing": createTicketHousing
}