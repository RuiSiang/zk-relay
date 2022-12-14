import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const server = new Server(httpServer, {
  path: '/',
})

server.on('connection', async (client) => {
  console.log(`Client ${client.id} connected`)
  client.on('subscribe', async (payload: { bank: string }) => {
    console.log(`Client ${client.id} subscribed to bank ${payload.bank}`)
    client.join(payload.bank)
  })
  client.on(
    'transmit',
    async (payload: {
      id: string
      from: string
      to: string
      amount: string
      proof: string
    }) => {
      console.log(`AML data transmitted from ${payload.from} by ${client.id}`)
      console.log(`AML data relayed to ${payload.to} by ${client.id}`)
      server.to(payload.to).emit('relay', payload)
    }
  )
  server.on('disconnect', () => {
    console.log(`Client ${client.id} disconnected`)
  })
})

httpServer.listen(parseInt(process.env.PORT || '6000'))
