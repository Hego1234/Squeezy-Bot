const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const client = new Discord.Client();
const prefix = botconfig.prefix;
const token = require('./token.json');
const tInfo = botconfig.TOKEN;
const fs = require('fs');

client.commands = new Discord.Collection

fs.readdir("./commands/", (err, files) => {
  let folders = fs.readdirSync('./commands/');
  for(const folder of folders){
    let files = fs.readdirSync(`./commands/${folder}/`);
    for(const file of files){
      client.commands.set(file.split('.').shift(), require(`./commands/${folder}/${files}`));
  }
  }
  });

client.on("ready", async() => {
client.user.setActivity(`with Hego#0001`, {type: 'Playing'});
console.log(`${client.user} is online!`)
});

client.on('message', async (message) => {
 if(message.author.bot) return;
  if(message.content.indexOf(botconfig.prefix) !== 0) return;
  
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args);
});
client.login(tInfo);
