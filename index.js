// TODO
// - fix problem with empty bios 
// - make discord token an env variable

// should probably make these .env vars
// discord auth token
// tinder auth token (changes every log-in session)

// global variables
var name1; // cant just use 'name' bc in js 'name' means name of the window(dom?)
var bio;
var lastMessage;
var lastMessageUser; // id of who ever sent/recived the last message
var tinderAccountID = 'Tinder_Account_ID'; // the respective ID of your Tinder Account
var authToken = 'Tinder_Auth_Token';
var channelID = 'Discord_Channel_ID';
var allInfo = [''];




function discordBot(){

    const Discord = require('discord.js'); // import 'Discord.js'
    const client = new Discord.Client(); // create instance of Client

    client.on('ready', () => {   // basic logs when the bot is online
        console.log(`Logged in as ${client.user.tag}!`); 
        console.log(`bot userID: ${client.user.id}`);
        console.log(`channel ID: ${channelID}`);
    });
    client.on('message', msg => {  // when there is a message in the channel

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function getTinderInfo(authToken, type){ // call the API and get the json data

            function getSpecificInfo(json, type){ // parse the json data and get name, bio, last message
                try{
                    name1 = name1 = json.data.matches[0].person.name; // get name data
                    bio = json.data.matches[0].person.bio; // get bio data
                    lastMessage = json.data.matches[0].messages[0].message; // get message data
                    lastMessageUser = json.data.matches[0].messages[0].from; // get id from who sent message
                    allInfo = [name1, bio, lastMessage, lastMessageUser];

                }
                catch (UnhandledPromiseRejectionWarning){
                    sendDiscordMsg('e'); // error, auth token expired
                }
                if (type == 'n') sendDiscordMsg('n');
                else if (type == 'b') sendDiscordMsg('b');
                else if (type == 'm') sendDiscordMsg('m');
                else if (type == 'a') sendDiscordMsg('a');
                return; // leave the function
            }

            ////////////////////////
            /// creates a promise
            ////////////////////////
            const fetch = require("node-fetch");
            fetch('https://api.gotinder.com/v2/matches?count=60&is_tinder_u=false&locale=en&message=1' , {
        
                headers: 
                { //'Postman-Token': 'bff5cc2a-7670-49a1-9ee0-8cf7aa7ee68a',
                'cache-control': 'no-cache',
                'User-agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Auth-Token': authToken }
            }) .then(res => res.json()).then(json => getSpecificInfo(json, type))   // parses json and catches any errors
        }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////
        /// send the message to the channel (not the user)
        ////////////////////////
        function sendDiscordMsg(type){
            if (type == 'n'){ 
                msg.channel.send('Name of last match:');
                msg.channel.send(name1);
            }
            else if (type == 'b'){ 
                msg.channel.send(`Bio of last match (${name1}):`);
                msg.channel.send(bio); 
            }
            else if (type == 'm'){ 
                if (lastMessageUser == tinderAccountID){
                    msg.channel.send(`Last sent message from you:`);
                    msg.channel.send(lastMessage);
                }
                else{
                    msg.channel.send(`Last recived message from ${name1}:`);
                    msg.channel.send(lastMessage);
                }
            }
            else if (type == 'e'){
                msg.channel.send('Please update the Tinder Auth Token');
                msg.channel.send('IGNORE THE REST OF MY MESSAGES UNTIL AUTH TOKEN IS UPDATED');
            }
            else if (type == 'a'){
                if (bio == undefined) {bio = 'User has no bio';}
                if (lastMessageUser == tinderAccountID){
                    msg.channel.send(`${name1}\n${bio}\n ---------- \nLast Message from you: \n${lastMessage}`);
                }
                else{
                    msg.channel.send(`${name1}\n${bio}\n ---------- \nLast Message: \n${lastMessage}`);
                }
            }

        }

        ////////////////////////
        /// get the message type 
        ////////////////////////
        if(msg.author.bot) return; // don't respond if the bot said it
        else if(msg.content.startsWith('!' + 'name')){
            getTinderInfo(authToken, 'n'); // refreshes each time its called
        }
        else if(msg.content.startsWith('!' + 'bio')){
            getTinderInfo(authToken, 'b'); // refreshes each time its called
        }
        else if(msg.content.startsWith('!' + 'lm')){
            getTinderInfo(authToken, 'm'); // refreshes each time its called
        }
        ////////////////////////
        /// clears all the messages in the channel (https://stackoverflow.com/questions/48228702/deleting-all-messages-in-discord-js-text-channel)
        ////////////////////////
        else if (msg.content.toLowerCase().startsWith('!' + "clearchat")) {
            async function clear() {
                msg.delete();
                const fetched = await msg.channel.fetchMessages({limit: 99});
                msg.channel.bulkDelete(fetched);
            }
            clear();
        }
        
        else if (msg.content.startsWith('!' + 'auth')){
            msg.channel.send('changing auth token');
            var splitMsg = msg.content.split(" ");
            authToken = splitMsg[1]; // re-declare authtoken
            msg.channel.send('auth token changed');
        }

        else if (msg.content.startsWith('!' + 'all')){
            getTinderInfo(authToken, 'a');
        }

    });
    client.login('Discord_Auth_Token');
}


discordBot();











