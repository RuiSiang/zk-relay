import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  path: '/',
})

io.on('connection', async (client) => {
  console.log(`Client ${client.id} connected`)
  client.on('subscribe', async (payload: { bank: string }) => {
    console.log(`Client ${client.id} subscribed to bank ${payload.bank}`)
    client.join(payload.bank)
  })
  client.on(
    'transmit',
    async (payload: { from: string; to: string; proof: string }) => {
      console.log(
        `AML data transmitted from to ${payload.from} by ${client.id}`
      )
      console.log(`AML data relayed to ${payload.to} by ${client.id}`)
      io.to(payload.to).emit('relay', payload)
    }
  )
  io.on('disconnect', () => {
    console.log(`Client ${client.id} connected`)
  })
})

httpServer.listen(3000)
