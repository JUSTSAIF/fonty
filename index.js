import axios from 'axios'
import FormData from 'form-data'
import jsdom from 'jsdom'
import Discord from 'discord.js'
import fs from 'fs'
const client = new Discord.Client();
const config = JSON.parse(fs.readFileSync('bot.json', 'utf8'));
const prefix = config.PREFIX


const getFonts = async (text) => {
    var embed = new Discord.MessageEmbed({})
        .setAuthor("Fonty", config.images.icon)
        .setImage(config.images.cover)
        .setColor('#000000')

    const formData = new FormData();
    formData.append('name', text);
    formData.append('get', 'english');
    await axios.post("https://coolnames.online/cool.php", formData, {
        headers: formData.getHeaders()
    }
    ).then((e) => {

        const HTML = new jsdom.JSDOM(e.data)
        const Fonts = HTML.window.document.getElementsByClassName('MeanDiv')[0].getElementsByClassName('panel-success')[0].getElementsByClassName('panel-body')[0].getElementsByClassName('nav-pills')[0].getElementsByTagName('textarea')
        for (var i = 0; i < Fonts.length; i++) {
            embed.addField("Font", Fonts[i].value, true)
        }
    }).catch(err => {
        console.log("Error :: " + err)
    });
    return embed
}


client.on('ready', () => {
    console.log(`~ Logged in as ${client.user.tag}!`);
    client.user.setActivity(config.BOT_STATUS)
});

client.on('message', message => {
    if (message.content.startsWith(prefix) || !message.author.bot) {
        const args = message.content.split(":");
        const command = args[0].replace(" ", "")

        if (command == `${prefix}help`) {
            var embed = new Discord.MessageEmbed({})
                .setAuthor("Fonty", config.images.icon)
                .addField("help & Commands", `${prefix}help`)
                .addField("Font Styles", `max length : 45 | ${prefix}font : Your Text Here`)
                .addField("Symbols", `${prefix}sy`)
                .addField("contact & info", `${prefix}dev`)
                .setImage(config.images.cover)
                .setColor('#F665DE')
            message.channel.send(embed);
        } else if (command == `${prefix}font`) {
            const FontText = args[1]
            if (FontText !== null && FontText !== undefined && FontText !== "") {
                if (FontText.length < 46) {
                    getFonts(FontText).then(e => {
                        message.channel.send(e);
                    }).catch((e) => {
                        console.log(e)
                    })
                } else {
                    var embed = new Discord.MessageEmbed({}).setTitle(`max length : 45 letter`)
                        .setColor('#FF524A')
                    message.channel.send(embed);
                }
            } else {
                var embed = new Discord.MessageEmbed({}).setTitle(`Set Text ,like ${prefix}font: iam developer GG`)
                    .setColor('#FA9A33')
                message.channel.send(embed);
            }
        } else if (command == `${prefix}sy`) {
            var embed = new Discord.MessageEmbed({})
                .setAuthor("Fonty", config.images.icon).setDescription(`
                彡  ⫸ の 卍 ♛ 『』 个 × ♜ メ 父  ▊
                ☆ ➳ ω ♡ ♤ ♧ ♢ ♠ ➟ ➣ ➤ ➥ ☾ ☽ 
                ➛ ➜ ➸ ➳➴ ❦ ☥ ☩ ☧ ☬ ㊝ ▉ ❅
                ♁ ✙ ✟ ♆ ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ❰❱ 
                 ✺ ϟ ᴙ 𝒻 あ ッ ツ ヅ ⌜⌟ 「」 ❬❭〈〉❮❯ 
                ♝ ♞  �  ∞ ♩  ➨  ■  ♪ ♫ ♬ ♭ ◐ ※
                ≋ ₪ 〟 ❛ ❜ ❝ 〚 〛 ︽ ︾  º ‽ † ¿ ぐ ぁ
                ぃ い ぅ ✚ ⣿ • ◉ ❍◖ ◗ ╳ ┇ ┃ ― ━ ⎚
                `).setColor('#000000')
            message.channel.send(embed);
        } else if (command == `${prefix}dev`) {
            var embed = new Discord.MessageEmbed({})
                .setAuthor("Fonty", config.images.icon)
                .addField("Info", `Programmed By ${config.PROGRAMMER_NAME}`)
                .addField("Github", `[Click here](https://github.com/justsaif)`)
                .addField("Instagram", `[Click here](https://www.instagram.com/qq_iq/)`)
                .addField("Last Update", `2022/3/14 02:14 PM`)
                .setImage(config.images.contact)
                .setColor('#7065FF')
            message.channel.send(embed);
        }
    };
})

client.login(config.TOKEN);

