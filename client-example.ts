import { io, Socket } from 'socket.io-client'

export default class Client {
  private socket: Socket
  private static instance: Client
  private bank: string = ''

  public static getInstance(url: string) {
    if (!Client.instance) {
      try {
        Client.instance = new Client(url)
      } catch (err) {
        console.log('Socket init error')
      }
    }
    return Client.instance
  }

  constructor(url: string) {
    this.socket = io(url, {
      reconnectionDelayMax: 10000,
    })
    this.socket.on('connect', () => {
      console.log('Connected to relay server')
    })
    this.socket.on('disconnect', () => {
      console.log('Disconnected from relay server')
    })
    this.socket.on('relay', (payload) => {
      // do something
      console.log('Received payload from relay:', payload)
    })
  }
  public subscribe = (bank: string) => {
    if (this.bank) {
      throw new Error('You can only subscribe to one bank')
    }
    this.socket.emit('subscribe', { bank: 'Bank A' })
    this.bank = bank
    console.log(`Subscribed to bank ${bank}`)
  }
  public transmit = (to: string, proof: string) => {
    if (!this.bank) {
      throw new Error('You must subscribe to a bank first')
    }
    this.socket.emit('transmit', { from: this.bank, to, proof })
    console.log(`Payload transmitted to ${to}`)
  }
}

const client = Client.getInstance('http://127.0.0.1:6000')
client.subscribe('Bank A')
client.transmit('Bank B', '0x01')
