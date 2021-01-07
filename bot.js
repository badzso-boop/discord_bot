console.log('Beep Beep');

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);

let TENORTOKEN = 'PLXN0R6XCSLK';
const fetch = require('node-fetch');
var fs = require('fs');
const { Console } = require('console');
let valasztas = 0;
let fajlszam = 0;

async function readyDiscord()
{
    console.log('Bentvagyok!');
    console.log('Fajlok, kiirasa...');
    var files = fs.readdirSync('hangok_adatbazis/');
    for (const file of files) {
        if (file.endsWith('.mp3')) {
            fs.copyFile(`C:/Users/norbe/Desktop/dc/hangok_adatbazis/${file}`, `C:/Users/norbe/Desktop/dc/hangok_adatbazis_proba/${file}`, (err) => {
                if (err) throw err;
                console.log('File was copied to destination');
            });
        }
    }
    console.log('fajlok kiirva!');
}

function atnevezAthelyezKiir()
{
    var files1 = fs.readdirSync('hangok_adatbazis_proba/');
    let szoveg = '```';
    for(let i = 0; i < files1.length; i++)
    {   
        if(i == 50)
        {
            szoveg += '```';
            szoveg += '!';
            szoveg += '```';
        }
        else
        {
            szoveg += `[${i+1}]`;
            szoveg += files1[i];
            szoveg += '\n';
        }
    }
    szoveg += '```';
    let txt = szoveg.split('!')
    fajlszam = txt.length;
    for(let j = 0; j < txt.length; j++)
    {
        fs.writeFileSync(`${j}.txt`, txt[j]);
    }
    let i = 1;
    for (const file of files1) {
        if (file.endsWith('.mp3')) {
            fs.rename(`C:/Users/norbe/Desktop/dc/hangok_adatbazis_proba/${file}`, `C:/Users/norbe/Desktop/dc/hangok_adatbazis_probam/[${i}].mp3`, function (err) {
                if (err) throw err;
                console.log('File Renamed.');});
            i++;
        }
    }
}


client.on('message', gotMessage);

const valaszok_alap = [
    '😈👽🤖',
    "Choo Choo",
    "Ding! 👑💎"
]
const valaszok_jatek = [
    'Playing with the cat! 🐱',
    'Playing with the dog! 🐶',
    'Playing Hide and Seek! 🤪',
    'Sleepy! 🥱'
]

async function gotMessage(msg)
{
    console.log(msg.content);

    let tokens = msg.content.split(' ');
    //hang belep
    if(tokens[0] == '.join'){
        valasztas = tokens[1];
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            //const dispatcher = connection.play('https://zene.ujjweb.hu/zene.mp3');
            const dispatcher = connection.play(`hangok_adatbazis_probam/[${valasztas}].mp3`);
        }else {
            msg.reply('You need to be in a voice chanel for that! 😎');
        }
    }
    //hang kilep
    if(tokens[0] == '.leave') {
        if(msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.leave();
        }
    }

    //segitseg
    if(tokens[0] == '!segits')
    {
        msg.channel.send('``` - !ping \n - !hi robo \n - !jatek \n - !spam - spam @username mennyi \n - !gif - !gif search \n - !love - !love mention times \n - !join - !join {number_of_soundboard} \n - !leave \n - !soundboard ```');
    }

    if(tokens[0] == '.segics')
    {
        msg.channel.send('``` - .ping \n - .hi robo \n - .jatek \n - .gif - .gif search \n - .join - .join {number_of_soundboard} \n - .leave \n - .soundboard ```');
    }
    
    //ping
    if(tokens[0] == '.ping')
    {
        //msg.reply('pong');
        msg.channel.send('😋 pong 😋');
    }

    if(tokens[0] == '.soundboard')
    {
        atnevezAthelyezKiir()
        let fileContent = [];
        for(let i = 0; i < fajlszam; i++)
        {
            fileContent[i] = fs.readFileSync(`${i}.txt`, 'utf-8');
            msg.channel.send(fileContent[i]);
        }
    }

    //hi robo
    if(tokens[0] == '.hi' && tokens[1] == 'robo')
    {
        const i = Math.floor(Math.random() * valaszok_alap.length);
        msg.channel.send(valaszok_alap[i]);
    }

    //jatek
    if(tokens[0] == ".jatek")
    {
        const i = Math.floor(Math.random() * valaszok_jatek.length);
        client.user.setActivity(valaszok_jatek[i]);
    }

    if(tokens[0] == '.gif')
    {
        let keyword = 'girl car drive thug life'
        let kuldd = false;
        let h = 0;
        if(tokens.length > 1)
        {
            keyword = tokens.slice(1, tokens.length-1).join(" "); 
        }
        if(tokens.length == 2)
        {
            keyword = tokens.slice(1, tokens.length).join(" "); 
        }
        if(tokens.length > 2)
        {
            h = tokens.length-1;
            kuldd = true;
        }

        let url = `https://api.tenor.com/v1/search?q=${keyword}&key=${TENORTOKEN}&contentfilter=off`
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        msg.channel.send(json.results[index].url);
        if(kuldd == true)
        {
            msg.channel.send(tokens[h])
        }
    }

    //spam
    if(tokens[0] == 'spam')
    {
        const user = msg.author;
        const szoveg = msg.content;
        var res = szoveg.split(" ");
        //console.log(msg);
        //const id = msg.id();
        console.log(user.username);
        console.log(user.id);
        //msg.channel.send('<@' + szoveg + '>');
        if(res[2] > 10)
        {
            res[2] = 10;
            msg.channel.send('LASSITSá MÁN EZ SOK LESZ 🙄🙄🙄!! Átnyomtam 10re a spamet 😇😇');
        }
        for(let i = 0; i < res[2]; i++)
        {
            msg.channel.send(res[1]);
        }
    }

    if(tokens[0] == '!love')
    {
        let id = tokens[1];
        for(let i = 0; i < tokens[2]; i++)
            msg.channel.send(tokens[1] + ' ,love you to the moon and back ❤❤');
    }
}