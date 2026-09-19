const http = require('http')
const mineflayer = require('mineflayer')

// ==========================================
// CONFIGURAÇÕES DO SERVIDOR ATERNOS
// ==========================================
const CONFIG = {
  // Endereço do servidor (pode ser o IP normal ou o DynIP)
  host: 'inserirtexto-gWHK.aternos.me',
  
  // Nome de utilizador do Bot no jogo
  username: 'inserirtexto',
  
  // Modo de autenticação (offline para contas piratas/Aternos Cracked)
  auth: 'offline',
  
  // Deixe false para auto-detectar a versão via ViaVersion
  version: false,
  
  // Tempo limite de verificação (60 segundos)
  checkTimeoutInterval: 60 * 1000,
  
  // Tempo de espera para tentar reconectar após uma queda (20 segundos)
  reconnectDelay: 20000
}

// ==========================================
// SERVIDOR HTTP PARA O RENDER (KEEP-ALIVE)
// ==========================================
const PORT = process.env.PORT || 10000
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Bot AFK Minecraft 24/7 ativo no Render!')
})

server.listen(PORT, () => {
  console.log(`[HTTP] Servidor Web de Keep-Alive a rodar na porta ${PORT}`)
})

// ==========================================
// LÓGICA DO BOT MINEFLAYER
// ==========================================
let bot = null
let afkInterval = null

function createBot() {
  console.log(`[BOT] A tentar conectar a ${CONFIG.host}:${CONFIG.port}...`)

  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    auth: CONFIG.auth,
    version: CONFIG.version,
    checkTimeoutInterval: CONFIG.checkTimeoutInterval
  })

  // Quando o bot entra no servidor com sucesso
  bot.on('spawn', () => {
    console.log(`[BOT] Sucesso! O bot '${CONFIG.username}' entrou no servidor Aternos.`)

    // Limpa qualquer intervalo anterior
    if (afkInterval) clearInterval(afkInterval)

    // Rotina Anti-AFK a cada 15 segundos
    afkInterval = setInterval(() => {
      if (!bot || !bot.entity) return

      // 1. Rodar a câmara aleatoriamente
      const yaw = (Math.random() * Math.PI * 2) - Math.PI
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw, pitch, true)

      // 2. Dar um soco no ar
      bot.swingArm('right')

      // 3. Dar um pequeno passo e saltar
      bot.setControlState('forward', true)
      bot.setControlState('jump', true)

      setTimeout(() => {
        if (!bot) return
        bot.setControlState('forward', false)
        bot.setControlState('jump', false)
      }, 800)

    }, 15000)
  })

  // Tratar desconexão (tentar reconectar automaticamente)
  bot.on('end', (reason) => {
    console.log(`[BOT] Desconectado do servidor. Razão: ${reason}`)
    if (afkInterval) clearInterval(afkInterval)
    console.log(`[BOT] A tentar reconectar em ${CONFIG.reconnectDelay / 1000} segundos...`)
    setTimeout(createBot, CONFIG.reconnectDelay)
  })

  // Tratar erros do bot sem derrubar a aplicação
  bot.on('error', (err) => {
    console.log(`[ERRO] Ocorreu um erro no bot: ${err.message || err}`)
  })

  // Auto-login/registo no chat caso haja plugin de autenticação
  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register BotSenha123 BotSenha123')
    } else if (message.includes('/login')) {
      bot.chat('/login BotSenha123')
    }
  })
}

// Prevenir fecho do processo por exceções não capturadas no Node.js
process.on('uncaughtException', (err) => {
  console.log('[SISTEMA] Exceção capturada:', err.message)
})

process.on('unhandledRejection', (reason) => {
  console.log('[SISTEMA] Promessa rejeitada:', reason)
})

// Iniciar a conexão do bot
createBot()
