# SquChan noodle curse

> A chatbot that keeps track of the active chatters, reacts to gift bombs events, and assign the noodle curse to a random active user.

## Starting the bot

This project uses node 19

```bash
node main.js
```

You can also build and start an OCI compliant container image. Here's an example with docker:
```bash
docker build --platform=linux/amd64 -t local/squchannoodlecurse/bot:latest .
docker run -d -e TWITCH_BOT_USERNAME=<username> -e TWITCH_ACCESS_TOKEN=<access_token> local/squchannoodlecurse/bot:latest
```
