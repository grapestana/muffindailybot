require('dotenv').config(); //initialize dotenv

const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const cron = require('cron'); //import cron

const imageLimit = 14

const imageLimit2 = 5


// Randomizar imagens para a daily
function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(imageLimit);
    let img = Math.floor(Math.random() * (max - min)) + min;
    img = ('0' + img).slice(-2)
    const url = `https://grapestana.github.io/images/${img}.jpg` 
    return url
}

// Randomizar gifs do bot com fome
function getRandomHungryGif() {
    min = Math.ceil(1);
    max = Math.floor(imageLimit2);
    let img = Math.floor(Math.random() * (max - min)) + min;
    img = ('0' + img).slice(-2)
    const url = `https://grapestana.github.io/gifs/${img}.gif`
    return url
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Escolher servidor e canal para jogar imagem da daily 
let sendImage = async () => {
    const guild = client.guilds.cache.get('688135365714116700');
    const channel = guild.channels.cache.get('917583219497508874');
    const img = getRandomInt();
    channel.send(img);
    channel.send('Você comanda a daily hoje!');
};

// Escolher servidor e canal para jogar gif de fome
let sendHungry = async () => {
    const guild = client.guilds.cache.get('688135365714116700');
    const channel = guild.channels.cache.get('688135365722505269');
    const img = getRandomHungryGif();
    channel.send(img);
};

// Se online começar a cron da daily
client.once("ready", () => {
    console.log(`Online as ${client.user.tag}`);
    let scheduledMessage = new cron.CronJob('00 55 11 * * 1,2,3,4,5', sendImage);
    let dailyHungry = new cron.CronJob('00 10 12 * * 1,2,3,4,5', sendHungry);
    sendHungry();

    scheduledMessage.start();
    dailyHungry.start();
});


client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong');
    }
});

client.on('message', msg => {
    if (msg.content === '!Batata') {
        sendHungry();
    }
});




//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token