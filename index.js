const mineflayer = require('mineflayer')
const http = require('http')

http.createServer((req, res) => {
  res.write("Bot is Live");
  res.end();
}).listen(process.env.PORT || 3000); 

function startBot() {
  const bot = mineflayer.createBot({
    host: '4_player_in_1_world.aternos.me',
    port: 52892,
    username: '1YouceF1_Admin', 
    version: '1.20.1',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot is in the server!')
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    const parts = message.split(' ')
    if (parts[0].toLowerCase() === 'tp' && parts.length === 2) {
      bot.chat(`/teleport ${username} ${parts[1]}`)
    }
  })

  setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }
  }, 20000)

  bot.on('error', (err) => console.log('Error:', err.message))
  bot.on('end', () => setTimeout(startBot, 10000))
}
startBot()
