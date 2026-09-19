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
    host: 'mosquitofish.aternos.host',
    port: 38060,
    username: 'inserirtexto',
    // Define a versão exata do Minecraft (ex: '1.20.4' ou '1.20.6' dependendo do teu servidor)
    // Deixar 'false' faz a Aternos recusar a conexão
    version: '1.20.4', 
    checkTimeoutInterval: 60 * 1000 // Evita desconexões por tempo de espera
  })

  bot.on('spawn', () => {
    console.log('inserirtexto entrou com sucesso no servidor Aternos!')

    // Rotina anti-AFK com movimentação
    setInterval(() => {
      if (!bot.entity) return

      // 1. Mexer o braço
      bot.swingArm('right')

      // 2. Olhar para uma direção aleatória
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw, pitch, true)

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

  bot.on('end', (reason) => {
    console.log(`Desconectado (${reason}). Tentando reconectar em 20 segundos...`)
    // Aumentado para 20s para evitar bloqueio de IP na Aternos
    setTimeout(createBot, 20000)
  })

  bot.on('error', (err) => {
    console.log('Erro no bot:', err)
  })
}

createBot()
