const Discord = require('discord.js');
const { webhookId, webhookToken } = require('../config-discord/config-webhook.json');
const hook = new Discord.WebhookClient({ id: webhookId, token: webhookToken });

// console.log(hook)

class DiscordBot{
    static sendMessage(messageStr){
        hook.send(messageStr);
    }

    static scoreNotify(discordId, name){
        let msg = "";
        if (discordId){
            msg+=`<@${discordId}> `;
        }
        
        msg+= ` Hello ${name}, your score has just been updated`
        hook.send(msg);
    }
}

// DiscordBot.sendMessage("test message from Henry")

module.exports = DiscordBot;