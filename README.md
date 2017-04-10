<p align="center">
    <a href=https://github.com/1Computer1/megumin-selfbot>
        <img src=https://u.nya.is/uckdrf.png/>
    </a>
</p>  

## Features
- A powerful eval command.
- Changing game and status.
- Image tags and inline text tags.
- Message pruning.
- User/server info commands.
- Various fun emoji commands.
- Grammar correction, kinda.
- Customizable!
- A bunch of other things!

## Installation
This bot requires [Node.js 6.9.4](https://nodejs.org/en/) or higher.  
This bot uses [Discord.js](https://discord.js.org/) and [Akairo](https://1computer1.github.io/discord-akairo).  

1. Download [git](https://git-scm.com/downloads).
2. Clone with `git clone https://github.com/1Computer1/megumin-selfbot.git`.
3. Open up a command prompt (or your preferred terminal) at the bot folder.
4. Run `npm --only=prod install` to install required dependencies.
5. Setup your settings inside `src/data/config.json` (see configuration below).
6. Rename those files to not have `.example`.
7. Run `node megumin` and enjoy!
8. Update in the future by using `git pull`.

## Configuration
Rename `config.json.example` to `config.json` and fill in with appropriate information.  

#### Token - `token`
1. Press CTRL+SHIFT+I (or equivalent on other OS).
2. Go to Applications (at top).
3. Go to Local Storage (at side).
4. Copy and paste your token.

Do not share your token with anyone!  

#### Prefix - `prefix`
The prefix to use commands.  
By default, it is `/`.  
Change it to whatever you like!  
You can use an array for multiple prefixes.  

#### Color - `color`
The color of embeds used in images and in quoting.  
Set it to a hex code, an integer, "random", or "auto" to use your current role's color.  

#### Grammar - `grammar`
Capitalizes your sentences and fixes contractions.  
Does not actually make your grammar that much better.  
By default, it is off.  

#### Caching - `cache`
Amount of messages to keep in cache (default 50).    
Set to 0 to disable message caching, possibly saving memory.  
Will make the edits command useless.  
Will also probably disable the ability to run commands on an edit.  

#### Disable Logging - `noLogs`
Disables console logging.  
Errors are still logged.  

#### Exit on Disconnect - `exitOnDisconnect`
Exits the process on disconnect.  
Recommended to use with uws and a process manager (eg PM2).  

#### Sticker Image Mode - `stickerImages`
When sending images, they will be sent as an attachment rather than in embed. 
Images saved as file (see below) will not work with this off.    

#### Download Images - `downloadImages`
When adding new images, they will be saved to `src/data/images` rather than saved as a link.  
Images saved as a file will not work with the above setting off.  

## Commands
By default, the prefix is `/`.  
You can change this in the `config.json`.  
Commands are also ran when you edit a message.  

#### ping - `ping`
Pong!  

#### eval / e - `eval <code...>`
Evaluates Javascript code.  
Not recommended for the average user.  
Has a `print()` method that prepends/appends to the output, including async things.  
Also a `data` object that persists throughout evaluations.  

#### async / a - `async <code...>`
A better version of eval.  
Requires harmony or Node 7.6.0 or higher.  
Allows usage of `await` in addtion to things from eval.  

#### python / py - `python <code...>`
Evaluates Python code.  
Requires Python in your PATH.  

#### stats / info / about - `stats`
Displays the memory usage, uptime, and a link to here.  

#### guild / server - `guild [name...]`
Gets information about a guild.  
Defaults to a random guild.  

#### icon - `icon [name...]`
Gets icon of a guild.  
Defaults to a random guild.  

#### emotes - `emotes [name...]`
Gets the emotes of the guild.  
Defaults to a random guild.  

#### user / member / whois - `user [name...]`
Gets information about a user.  
Defaults to yourself.  
Usable only in a guild.  

#### avatar - `user [name...]`
Gets avatar of a user.  
Defaults to yourself.  

#### id - `id <something...>`
Gets the ID of something (member/channel/role/emote).  
Usable only in a guild.  

#### game - `game [text...]`
Sets your current playing game.  
Leave blank to stop playing game.  

#### status - `game [status]`
Sets your current status.  
Can be one of: `online`, `idle`, `dnd`, or `invisible`.  
Defaults to `online`.  

#### greentext / green - `greentext [text...]`
Makes some greentext.  
Each new line will be prefixed with a `>`.  

#### orangetext / orange - `orangetext [text...]`
Makes some orangetext.  
Each new line will be suffixed with a `<`.  

#### color / colour - `color [color]`
Generates a random color or outputs with a specified color.  

#### prune / delete / del - `prune [amount]`
Prunes your messages.  
Specify a number to prune that many messages.  
By default it is 10.  

#### quote / q - `quote <id> [text...] [channel:id]`
Quotes a message.  
Supply this command with a message ID.  
All text after the ID will be your reply.  
Include `channel:id` to change channel of message.  

#### edits - `edits <id> [text...] [channel:id]`
Sees the edit history of a cached message.  
Supply this command with a message ID.  
All text after the ID will be your reply.  
Include `channel:id` to change channel of message.  

#### shout / big - `shout <text...>`
Converts your text to emojis.  

#### react / r - `react <text...>`
Reacts to the previous message with the specified text.  

#### superreact - `superreact [amount]`
Don't use this one.  
Especially not with the parameter set to 20.  

#### xkcd - `xkcd [comic...]`
Gets XKCD comics.  
Leave parameters blank for a random XKCD.  
Use any text to get a relevant XKCD.  
Use a number for a specific XKCD.  
Use 0 for the current XKCD.  

#### time - `time <place...>`
Gets the currrent time, somewhere.  

#### rpn - `rpn <expression...>`
Does math in [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).  
See the source code for available operators and constants.  

#### tag / tags / t - `tag [option] [args...]`
Use `tag list` to see a list of all your tags.  

Use `tag add` to add a tag.  
The first parameter is the tag name, the second is its content.  
You can specify a multiple words long tag name by enclosing them in double quotes.  

Use `tag del` to remove a tag.  
You can specify a multiple words long tag name by enclosing it in double quotes.  

Use `tag reload` to reload the tags.json if you have modified it outside of this command.  

Tags can be used by doing `[tagname]` in your message.  
For example, "hey check this out [animestuffs] it's so cool! [laugh]".  
To force a tag to not be used, simply add a backslash, `\[tagname]`.  

#### image / images / img / i - `image [option] [args...]`
Use `image list` to see a list of all your images.  

Use `image add` to add an image.  
The first parameter is the image name, the second is the link to the image.  
You can specify a multiple words long image name by enclosing it in double quotes.  

Use `image del` to remove an image.  
You can specify a multiple words long image name by enclosing it in double quotes.  

Use `image reload` to reload the images.json if you have modified it outside of this command.  

Images can be used by starting a message with `{imagename}`.  
It will not work anywhere else in the message.  
Everything after the image tag will be the actual message.  

#### log / logs - `log [id]`
Fetches 100 messages and saves it to the `src/data/logs` folder.  
Include an ID to fetch 100 messages before that message.  

## Customization
You can customize the selfbot all you want!  
To learn how, visit the [Discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome) and the [Akairo documentation](https://1computer1.github.io/discord-akairo).  
Of course, learn some Javascript as well.  
