const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'inserirtexto-gWHK.aternos.me',
    port: 38060,
    username: 'botteste',
    version: false
  })

  bot.on('spawn', () => {
    console.log('botteste entrou com sucesso no servidor Aternos!')
  })

  // Movimento de braço anti-AFK a cada 30 segundos
  bot.on('spawn', () => {
    setInterval(() => {
      bot.swingArm('right')
    }, 30000)
  })

  bot.on('end', () => {
    console.log('Desconectado. Tentando reconectar em 10 segundos...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', (err) => {
    console.log('Erro no bot:', err)
  })
}

createBot()