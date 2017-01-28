<p align="center">
    <a href=https://github.com/1Computer1/megumin-selfbot>
        <img src=https://u.nya.is/uckdrf.png/>
    </a>
</p>  

## Features
- An eval command.
- Changing game and status.
- Image and text tags.
- Message pruning.
- Various fun emoji commands.
- Some other things.

## Installation
This bot requires [Node.js 6.9.4](https://nodejs.org/en/) or higher.  
Dependencies that will be installed are chalk, discord.js, discord-akairo, and moment.  
Install erlpack and uws for extra performance.  

#### Method A:
1. Download [git](https://git-scm.com/downloads).
2. Open up a command prompt in a folder.
3. Run `npm install 1computer1/megumin-selfbot`.
4. Setup your settings inside src/data/config.json.
5. Run `node megumin.js`.
6. You're ready to go!

#### Method B:
1. Download this repository to a folder.
2. Open up a command prompt at the bot folder.
3. Run `npm install`.
4. Setup your settings inside src/data/config.json.
5. Run `node megumin.js`.
6. Enjoy!

## Commands
By default, the prefix is /. You can change this in the config.json.  
Images can be sent by starting a message with {imagename}.  
Tags can be used by adding [tagname] anywhere in the message.  

#### ping
Pong!  

#### eval / e
Evaluates Javascript code.  
Not recommended for the average user.  

#### game
Sets your current playing game.  
Leave blank to stop playing game.  

#### status
Sets your current status.  
Can be one of: online, idle, dnd, or invisible.  

#### greentext / green
Makes some greentext.  
Each new line will be prefixed with a >.  

#### orangetext / orange
Makes some orangetext.  
Each new line will be suffixed with a <.  

#### prune
Prunes your messages.  
Specify a number to prune that many messages.  
By default it is 10.  

#### quote
Quotes a message.  
Supply this command with a message ID.  
All text after the ID will be your reply.  

#### shout / big
Converts your text to emojis.  

#### react
Reacts to the previous message with the specified text.  

#### superreact
Don't use this one.  
Especially not with the parameter set to 20.  

#### tag / tags
Use `tag list` to see a list of all your tags.  

Use `tag add` to add a tag.  
The first parameter is the tag name, the second is its content.  
You can specify a multiple words long tag name or content by enclosing them in double quotes.  

Use `tag remove` to remove a tag.  
You can specify a multiple words long tag name by enclosing it in double quotes.  

Use `tag reload` to reload the tags.json if you have modified it outside of this command.

#### image / images
Use `image list` to see a list of all your images.  

Use `image add` to add a image.  
The first parameter is the image name, the second is the link to the image.  
You can specify a multiple words long image name by enclosing it in double quotes.  

Use `image remove` to remove a image.  
You can specify a multiple words long image name by enclosing it in double quotes.  

Use `image reload` to reload the images.json if you have modified it outside of this command.

## Customization
You can customize the selfbot all you want!  
To learn how, visit the [Discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome) and the [Akairo documentation](https://1computer1.github.io/discord-akairo/).  
Of course, learn some Javascript as well.  
