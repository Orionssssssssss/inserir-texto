const http = require('http')
const mineflayer = require('mineflayer')

// Servidor Web básico para o Fly.io passar na verificação HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot de Minecraft rodando online!')
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`)
})

// Código do Bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'inserirtexto-gWHK.aternos.me',
    port: 38060,
    username: 'inserirtexto',
    version: false
  })

  bot.on('spawn', () => {
    console.log('inserirtexto entrou com sucesso no servidor Aternos!')

    // Rotina anti-AFK com movimentação
    setInterval(() => {
      // 1. Mexer o braço
      bot.swingArm('right')

      // 2. Olhar para uma direção aleatória
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw, pitch, false)

      // 3. Dar um pulo e andar para a frente
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
