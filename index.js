const mineflayer = require('mineflayer')
const http = require('http')

// إنشاء سيرفر بسيط ليبقى الموقع يعمل على Render
http.createServer((req, res) => {
  res.write("Bot is Live and accepting Resource Packs");
  res.end();
}).listen(process.env.PORT || 3000); 

function startBot() {
  const bot = mineflayer.createBot({
    host: 'marlin.aternos.host', 
    port: 52892,                
    username: '1YouceF1_Admin', 
    version: '1.20.1',
    auth: 'offline'
  })

  // 1. عند دخول السيرفر
  bot.on('spawn', () => {
    console.log('✅ Bot joined the server!')
  })

  // 2. قبول الريسورس باك (الحل لمشكلتك)
  bot.on('resourcePack', () => {
    console.log('📦 Accepting Resource Pack...')
    bot.acceptResourcePack();
  });

  // 3. نظام الـ TP للجميع
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    const parts = message.split(' ')
    if (parts[0].toLowerCase() === 'tp' && parts.length === 2) {
      bot.chat(`/teleport ${username} ${parts[1]}`)
    }
  })

  // 4. التعامل مع الأخطاء وإعادة الاتصال
  bot.on('error', (err) => console.log('❌ Error:', err.message))
  bot.on('end', () => {
    console.log('🔄 Disconnected! Reconnecting in 10s...')
    setTimeout(startBot, 10000)
  })
}

// تشغيل المحرك
startBot()
