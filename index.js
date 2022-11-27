const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()
const text = require('./const')


const bot = new Telegraf(process.env.BOT_TOKEN); 
bot.start((ctx) => ctx.reply(`Whats up ${ctx.message.from.first_name ? 
    ctx.message.from.first_name :'Незнакомец'}`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('work', async (ctx) => {
    try {
        await ctx.replyWithHTML('Logs', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Отправить смс', 'btn_1'),Markup.button.callback('Повторный код', 'btn_2')],
                [Markup.button.callback('Заблокировать', 'btn_3')]
            ]
        ))
    }
    catch(e) {
        console.error(e)
    }
});

bot.action('btn_1', async (ctx) => {
    try { 
       await ctx.replyWithHTML('обработка кнопки 1', {disable_web_page_preview: true})
    }
    catch(e) { 
        console.error(e) 
    }
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
