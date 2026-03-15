const mineflayer = require('mineflayer')
const http = require('http')

// سيرفر ويب بسيط لـ Render
http.createServer((req, res) => {
  res.write("Bot is Live on 1.21.1");
  res.end();
}).listen(process.env.PORT || 3000); 

console.log("🚀 جاري تشغيل المحرك المطور لنسخة 1.21.1...");

function startBot() {
  const bot = mineflayer.createBot({
    host: '4_player_in_1_world.aternos.me', // العنوان من صورتك
    port: 52892,                         // البورت من صورتك
    username: '1YouceF1_Admin', 
    version: '1.21.11',                   // تم التحديث لنسخة سيرفرك
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('✅ تم دخول البوت بنجاح! ابحث عنه في السيرفر الآن.')
  })

  // قبول الريسورس باك تلقائياً
  bot.on('resourcePack', () => {
    console.log('📦 تم استلام الريسورس باك وقبوله.')
    bot.acceptResourcePack();
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    const parts = message.split(' ')
    if (parts[0].toLowerCase() === 'tp' && parts.length === 2) {
      bot.chat(`/teleport ${username} ${parts[1]}`)
    }
  })

  bot.on('error', (err) => console.log('❌ خطأ:', err.message))
  
  bot.on('end', () => {
    console.log('🔄 انقطع الاتصال، سأعود بعد 10 ثوانٍ...')
    setTimeout(startBot, 10000)
  })
}

startBot()
