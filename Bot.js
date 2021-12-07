require('dotenv').config(); //initialize dotenv

const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const cron = require('cron'); //import cron

const imageLimit = 14

function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(imageLimit);
    let img = Math.floor(Math.random() * (max - min)) + min;
    img = ('0' + img).slice(-2)
    const url = `https://grapestana.github.io/images/${img}.jpg` 
    return url
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let sendImage = async () => {
    const guild = client.guilds.cache.get('688135365714116700');
    const channel = guild.channels.cache.get('917583219497508874');
    const img = getRandomInt();
    channel.send(img);
    channel.send('Você comanda a daily hoje!');
};

client.once("ready", () => {
    console.log(`Online as ${client.user.tag}`);
    let scheduledMessage = new cron.CronJob('00 55 11 * * 1,2,3,4,5', sendImage);
    //sendImage();

    // When you want to start it, use:
    scheduledMessage.start();
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on('message', msg => {
    if (msg.content === '!Batata') {
        sendImage();
    }
});



//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN='OTEzNDQwODk4MTk5NzI0MDMy.YZ-iIQ.pS0NWuZkXvNjq_IZZjDG30mpKiY'); //login bot using token