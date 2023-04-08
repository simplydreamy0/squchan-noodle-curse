<h1 align="center">Welcome to SquChan's Noodle Curse  👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/dynamic/json?url=https://api.github.com/repos/DreamyProtect/squchan-noodle-curse/releases/latest&label=version&query=$.tag_name&color=blue" />
  <a href="https://github.com/DreamyProtect/squchan-noodle-curse/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/DreamyProtect/squchan-noodle-curse/blob/main/LICENSE" target="_blank">
    <img alt="License: BSD 3--Clause &#34;New&#34; or &#34;Revised&#34; License" src="https://img.shields.io/badge/License-BSD 3--Clause &#34;New&#34; or &#34;Revised&#34; License-yellow.svg" />
  </a>
  <a href="https://twitter.com/DreamyProtect" target="_blank">
    <img alt="Twitter: DreamyProtect" src="https://img.shields.io/twitter/follow/DreamyProtect.svg?style=social" />
  </a>
</p>

## Why ?

Have you seen this cat ?

![Picture of SquChan](docs/img/squ.jpg)

She's cute right ? Turns out she can use magic and transform your dick into a noodle. This bot is just a helper in her chat that will keep track of the active users and, whenever someone gifts a 5 subs bombs, according to her sound alert, will randomly pick up an active user and curse him !

That's basically it.

## Starting the bot

This project uses node 19.

```bash
node main.js
```

You can also build and start an OCI compliant container image. Here's an example with docker:
```bash
docker build --platform=linux/amd64 -t local/squchannoodlecurse/bot:latest .
docker run -d -e TWITCH_BOT_USERNAME=<username> -e TWITCH_ACCESS_TOKEN=<access_token> local/squchannoodlecurse/bot:latest
```
