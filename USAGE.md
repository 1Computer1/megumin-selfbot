## Commands
By default, the prefix is `/`.  
You can change this in the `config.json`.  
Commands are also ran when you edit a message.  

See the tag and image command to see how to use tags or images.  

#### ping - `ping`

Pong!  

#### eval / e - `eval <code...>`

Evaluates Javascript code.  
Not recommended for the average user.  
Has a `print()` method that prepends/appends to the output, including async things.  
Also a `data` object that persists throughout evaluations.  
Also a `lastResult` for the previous eval result.  

#### async / a - `async <code...>`

Allows usage of `await` in addtion to things from eval.  

#### deferred / def - `deferred [lang]`

Waits until you type `.` then evaluates all messages typed until that point.  
Deleted messages will not affect the eval.  
Type `..` instead to cancel the eval.  

#### python / py - `python <code...>`

Evaluates Python code.  
Requires Python in your PATH.  

#### ruby / rb - `ruby <code...>`

Evaluates Ruby code.  
Requires Ruby in your PATH.  

#### stats / info / about - `stats`

Displays the memory usage, uptime, and a link to here.  

#### reload - `reload <command>`

Reloads a command.  

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

#### locate - `locate <emoji>`

Gets the name of the guild that the emoji comes from.  

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

#### reverse - `reverse [text...]`

Reverses your message.  

#### flip - `flip [text...]`

Flips and reverses your message.  

#### embed - `embed [text...]`

Embeds your message.  
Also works with tags!  

#### xkcd - `xkcd [comic...]`

Gets XKCD comics.  
Leave parameters blank for a random XKCD.  
Use any text to get a relevant XKCD.  
Use a number for a specific XKCD.  
Use 0 for the current XKCD.  

#### docs - `docs <query> [version]`

Searches the Discord.js docs.  
Choose between `stable` or `master` for version.  

#### time - `time [place...]`

Gets the currrent time, somewhere.  
If the place is not specified, it uses the default one from `config.json`.  

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

Use `tag reload` to reload the `tags.json` if you have modified it outside of this command.  

Tags can be used by doing `[tagname]` in your message.  
For example, `hey check this out [animeStuffs] it's so cool! [woah]`.  
To force a tag to not be used, simply add a backslash, `\[tagname]`.  

#### image / images / img / i - `image [option] [args...]`

Use `image list` to see a list of all your images.  

Use `image add` to add an image.  
The first parameter is the image name, the second is the link to the image.  
You can specify a multiple words long image name by enclosing it in double quotes.  

Use `image del` to remove an image.  
You can specify a multiple words long image name by enclosing it in double quotes.  

Use `image reload` to reload the `images.json` if you have modified it outside of this command.  

Images can be used by starting a message with `{imagename}`.  
It will not work anywhere else in the message.  
Everything after the image tag will be the actual message.  

#### log / logs - `log [id] [channel:id]`

Fetches 100 messages and saves it to the `src/data/logs` folder.  
Include an ID to fetch 100 messages before that message.  
Include `channel:id` to change channel to fetch in.  
