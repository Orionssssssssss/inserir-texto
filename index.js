const http = require('http')
const mineflayer = require('mineflayer')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Bot de Minecraft rodando online!')
})

const PORT = process.env.PORT || 10000
server.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`)
})

function createBot() {
  const bot = mineflayer.createBot({
    host: 'handfish.aternos.host', // Substitua pelo seu DynIP exato
    port: 38060,                       // Substitua pela porta do DynIP
    username: 'inserirtexto',
    auth: 'offline',                   // Força autenticação offline (Pirata)
    version: '1.20.4',                 // Versão intermediária aceita pelo ViaVersion
    checkTimeoutInterval: 60 * 1000
  })

  bot.on('spawn', () => {
    console.log('inserirtexto entrou com sucesso no servidor Aternos!')

    setInterval(() => {
      if (!bot.entity) return
      bot.swingArm('right')
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw, pitch, true)
      bot.setControlState('jump', true)
      bot.setControlState('forward', true)
      setTimeout(() => {
        bot.setControlState('jump', false)
        bot.setControlState('forward', false)
      }, 1000)
    }, 20000)
  })

  bot.on('end', (reason) => {
    console.log(`Desconectado (${reason}). Tentando reconectar em 20 segundos...`)
    setTimeout(createBot, 20000)
  })

  bot.on('error', (err) => {
    console.log('Erro no bot:', err)
  })
}

createBot()
