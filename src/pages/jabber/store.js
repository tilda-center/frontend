import * as XMPP from 'stanza'


export default class JabberStore {
  constructor(detail) {
    this.detail = detail[0]
    this.setDetail = detail[1]
  }

  onMessage = (message) => {
    console.log('message', message)
    return true
  }

  connect = async (email, password) => {
    const client = XMPP.createClient({
      jid: email,
      password,
      transports: {
        websocket: 'wss://jabber.tilda.center:5443/ws',
      },
      sasl: false,
    })
    client.on('session:started', () => {
      client.enableCarbons()
      client.getRoster()
      client.updateCaps()
      client.sendPresence()
      client.discoverICEServers()
    })
    client.on('message', this.onMessage)
    client.connect()
    // client.sendMessage({
      // to: 'somebody@example.com',
      // body: 'Hello World!',
    // })
    this.setDetail({ client })
  }
}
