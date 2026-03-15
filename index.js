const mineflayer = require('mineflayer')

// محاكاة سيرفر ويب بسيط جداً لإرضاء Render
const http = require('http')
http.createServer((req, res) => res.end("Bot Status: OK")).listen(process.env.PORT || 3000)

console.log("=== محاولة اتصال جديدة كلياً ===")

function createBot() {
    const bot = mineflayer.createBot({
        host: '4_player_in_1_world.aternos.me',
        port: 52892,
        username: 'Bot_New_Test', // جربنا اسم جديد تماماً
        version: '1.21.1',
        auth: 'offline',
        connectTimeout: 30000 // مهلة طويلة للاتصال
    })

    bot.on('login', () => console.log('✅ دخلت مرحلة اللوجين!'))
    bot.on('spawn', () => console.log('🎮 أنا الآن داخل السيرفر!'))
    
    bot.on('error', (err) => console.log('❌ خطأ:', err))
    bot.on('kicked', (reason) => console.log('🚫 طرد بسبب:', reason))
    
    bot.on('end', () => {
        console.log('🔄 إعادة محاولة...')
        setTimeout(createBot, 5000)
    })
}

createBot()
