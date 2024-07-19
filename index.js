require('dotenv').config(); // Charger les variables d'environnement

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const keepAlive = require('./server.js');

// Garder le bot en vie
keepAlive();

// Fonction pour créer un embed d'erreur
async function errorEmbed(text, message) {
  const newEmbed = new EmbedBuilder()
    .setColor("#FF7676")
    .setDescription(`**❌ | ${text} **`);
  return message.channel.send({ embeds: [newEmbed] });
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

//=============================================
const channel_id = "put channel ID here"; // Remplacer par l'ID de votre canal
//=============================================

client.on('messageCreate', async (message) => {
  if (!message.guild) return; // Ignorer les messages qui ne sont pas dans un serveur
  if (message.author.bot) return; // Ignorer les messages des bots

  try {
    if (message.channel.id !== channel_id) return; // Vérifier si le message est dans le bon canal

    // Obtenir la réponse de l'API Brainshop
    let res = await axios.get(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(message.content)}`);
    message.reply(res.data.cnt);
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error); // Afficher l'erreur dans la console
    errorEmbed("Erreur du bot, veuillez réessayer !", message);
  }
});

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} est en ligne !`);
});

client.login(process.env.TOKEN);
