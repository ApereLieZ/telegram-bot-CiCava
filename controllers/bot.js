const { Telegraf } = require('telegraf');
const fs = require('fs');
require("dotenv").config();


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    checkPersons(ctx);
    //console.log(ctx);
})

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.launch();
console.log("Bot started");



module.exports.messageBroadcaster = async function (message) {
    try {
        const rawData = fs.readFileSync(".//persons.json");
        let jsonObj = JSON.parse(rawData);
        for (let userID of jsonObj.users) {
            console.log(jsonObj.users);
            await bot.telegram.sendMessage(userID, message);
        }
        return "ok";
    }catch(err){
        return err;
    }    
}


function checkPersons(ctx) {
    const rawData = fs.readFileSync(".//persons.json");
    let jsonObj = JSON.parse(rawData);
    if (jsonObj.users.length === 0 || !jsonObj.users.includes(ctx.update.message.chat.id)) {
        jsonObj.users.push(ctx.update.message.chat.id);
        console.log(jsonObj);
        fs.writeFileSync(".//persons.json", JSON.stringify(jsonObj));
        ctx.reply('You have been registered');
        return;
    }
    ctx.reply("Welcom back")

}