## Installation

This bot requires [Node.js 8.0.0](https://nodejs.org/en/) or higher.  
This bot uses [Discord.js](https://discord.js.org/) and [Akairo](https://1computer1.github.io/discord-akairo).  

1. Download [git](https://git-scm.com/downloads).
2. Clone with `git clone https://github.com/1Computer1/megumin-selfbot.git`.
3. Open up a command prompt (or your preferred terminal) at the bot folder.
4. Run `npm install` to install required dependencies.
5. Setup your settings inside `config.json` (see **Configuration** below).
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

#### Location - `location`
The default location for the `time` command.  

#### Grammar - `grammar`
Capitalizes your sentences and fixes contractions.  
Does not actually make your grammar that much better.  
By default, it is off.  

#### Caching - `cache`
Amount of messages to keep in cache (default 50).    
Set to 0 to disable message caching, possibly saving memory.  
Will make the edits command useless.  
Will also probably disable the ability to run commands on an edit.  

#### Exit on Disconnect - `exitOnDisconnect`
Exits the process on disconnect.  
Recommended to use with uws and a process manager (eg PM2).  

#### Sticker Images - `stickerImages`
When sending images, they will be sent as an attachment rather than in embed. 
Images saved as file (see below) will not work with this off.    

#### Download Images - `downloadImages`
When adding new images, they will be saved to `src/data/images` rather than saved as a link.  
Images saved as a file will not work with the above setting off.  
