require('dotenv').config()
const Discord = require("discord.js");

const bot = new Discord.Client();



const prefix = process.env.PREFIX;


bot.on("ready", () => {
    console.log(`Im Awake!`);

    bot.user.setActivity("Roblox Hackers!", {type: 3});
});


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        const msg = await message.channel.send("Pinging...");
        msg.edit(`Pong! Latency Is ${msg.createdTimestamp}ms. API Latency Is ${Math.round(bot.ping)}ms`);
    }

    if(command === 'help') {
        embed = new discord.RichEmbed ()
        .setAuthor("Cosmic Gen Commands")
        .setDescription("=**Ban ?ban \n **Kick ?kick \n **Ping ?ping ")
        .setFooter("We will be updating the bot everyday!")
        .setColor("#FF00FF")
        message.channel.send(embed);
    }
    if(command === 'kick') {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('**You Have Insufficient Permissions**');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.channel.send("Please mention a valid user");
        if(!member.kickable) return message.channel.send("**Sorry, I Can Not Kick That Person...**");

        let reason = args.slice(1).join('  ');
        if(!reason) reason = "**No Reason Provided...**"

        await member.kick(reason)
            .catch(e => message.channel.send(`**Sorry I Couldnt Kick Them Error: ${e}`));
        message.channel.send(`:white_check_mark: **User Kicked!**`);
    }

    
    if(command === 'ban') {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('**You Have Insufficient Permissions**');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.channel.send("Please mention a valid user");
        if(!member.bannable) return message.channel.send("**Sorry, I Can Not Ban That Person...**");

        let reason = args.slice(1).join('  ');
        if(!reason) reason = "**No Reason Provided...**"

        await member.ban(reason)
            .catch(e => message.channel.send(`**Sorry I Couldnt Ban Them Error: ${e}`));
        message.channel.send(`:white_check_mark: **User Banned!**`);
    }

});

bot.login(process.env.TOKEN);