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

var usersTracking = []; // [ { username: username, lastMessage: <timestamp in second> } ]

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (channel, tags, msg, self) {
  if (self) { return; }

  if (usersTracking.filter( (elem) => elem.username === tags.username ).length == 0){
    usersTracking.push({ username: tags.username, lastMessage: tags['tmi-sent-ts'] });
  } else {
    usersTracking = usersTracking.map((elem) => {
      if (elem.username === tags.username){
        return { username: elem.username, lastMessage: tags['tmi-sent-ts'] }
      }
      return elem;
    });
  }

  // Remove all users in the list that didn't message in the last 10min
  const now = Date.now();
  usersTracking = usersTracking.filter( (elem) => {
    return (now - elem.lastMessage) <= 600000
  });
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  if (numbOfSubs === 5 && usersTracking.length > 0){
    const random = Math.floor(Math.random() * usersTracking.length);
    console.log(`${channel} Skedaddle Skedoodle ${usersTracking[random].username}'s dick is now a noodle !`);
    client.say(channel, `Skedaddle Skedoodle ${usersTracking[random].username}'s dick is now a noodle !`);
  }
});
