# CiviLWarBot

## Tickets
Need to create ticket when someone click on the button.\
Create a channel for the following and get only staff and owner of the ticket see it.

  - [x] Whitelist Tickets 
  - [x] Background Tickets
  - [x] Help Tickets
  - [x] Death Tickets



# Commands
- [x] freq
- [ ] call
- [x] close
- [x] wl
- [ ] bg
- [ ] ban

## Radio
Create radio channel on demand
example I want to connect myself to a radio frequence 112.5 I type the command /freq 112.5
  - If the channel exist the bot only move myself to the appropriate channel
  - If the channel does not exist, bot creates it and thenn move me to

TODO when the channel is empty delete it.

## Call
Create a hidden channel with two other chan:
 * call n° XXXX
 * accept
 * refuse

when the caller ask for a call the bot will create the three hidden channel\
When the callie want to answer to the call it goes to the freshly created hidden channel accept and will be moved to the hidden call channel\
If the callie when to decline the call it goes to the refuse channel and both three channels will be destroyed.

## Close
Usage: `/close`
Close the ticket where you type it.
If you are not a privilegied user, acrtion will be refused
If the channel is not a ticket it is refused

## Whitelist
Usage: `/wl <steam-id> <discord-id>`
Add to DB a record linking both ID to a unnique identifier

## background

## Ban
