const tmi = require('tmi.js');

// Define configuration options and create client
const opts = {
  identity: {
    username: `${process.env.TWITCH_BOT_USERNAME}`,
    password: `${process.env.TWITCH_ACCESS_TOKEN}`
  },
  channels: [
    'squchan'
  ]
};

const client = new tmi.client(opts);

var usersTracking = []; // [ { username: string, lastMessage: <timestamp in second>, isCursed: boolean } ]
var usersNotTracked = [
  "nightbot",
  "soundalerts",
  "spinel97",
  "sery_bot",
  "streamelements"
];

client.on('message', onMessageHandler);
client.on('connected',  (addr, port) => { console.log(`* Connected to ${addr}:${port}`); });

client.connect();

function onMessageHandler (channel, tags, msg, self) {
  const commandName = msg.trim();

  if (self) { return; }

  if (
      (usersTracking.filter( (elem) => elem.username === tags.username).length == 0)
      && (!usersNotTracked.includes(tags.username))
  ){
    usersTracking.push({ username: tags.username, lastMessage: tags['tmi-sent-ts'], isCursed: false });
  } else {
    usersTracking = usersTracking.map((elem) => {
      if (elem.username === tags.username){
        return { username: elem.username, lastMessage: tags['tmi-sent-ts'], isCursed: elem.isCursed };
      }
      return elem;
    });
  }

  // Remove all users in the list that didn't message in the last 10min
  const now = Date.now();
  usersTracking = usersTracking.filter( (elem) => {
    return (now - elem.lastMessage) <= 600000
  });

  if (commandName === "!cursed"){
    if (usersTracking.filter((elem) => elem.isCursed).length === 0){
      client.say(channel, `Nobody is cursed at the moment, time to gift SquDink`);
      return;
    }
    client.say(channel, `${usersTracking.filter((elem) => elem.isCursed)[0].username}'s dick is a noodle ! everybody look at him and laugh KEKWPoint !`);
  }
}
/* eslint-disable */
client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  if (numbOfSubs === 5 && usersTracking.length > 0){
    console.log(`${username} is casting a noodle...`);
    const random = Math.floor(Math.random() * usersTracking.length);
    usersTracking = usersTracking.map((elem) => {
      if (elem.username === usersTracking[random].username){
        return { username: elem.username, lastMessage: elem.lastMessage, isCursed: true }
      }
      return { username: elem.username, lastMessage: elem.lastMessage, isCursed: false }
    });
    console.log(`${channel} Skedaddle Skedoodle ${usersTracking[random].username}'s dick is now a noodle !`);
    client.say(channel, `Skedaddle Skedoodle ${usersTracking[random].username}'s dick is now a noodle !`);
  }
});
