const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'inserirtexto-gWHK.aternos.me',
    port: 38060,
    username: 'inserirtexto',
    version: false
  })

  bot.on('spawn', () => {
    console.log('inserirtexto entrou no servidor Aternos!')

    // Rotina anti-AFK avançada
    setInterval(() => {
      // 1. Mexer o braço
      bot.swingArm('right')

      // 2. Olhar para uma direção aleatória
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw, pitch, false)

      // 3. Dar um pequeno pulo e passo para frente
      bot.setControlState('jump', true)
      bot.setControlState('forward', true)

      // Parar de andar e pular após 1 segundo
      setTimeout(() => {
        bot.setControlState('jump', false)
        bot.setControlState('forward', false)
      }, 1000)

    }, 20000) // Executa a cada 20 segundos
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
