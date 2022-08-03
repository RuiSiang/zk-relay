# zk-relay

## Usage

```
npm install
npm run build
npm run start
```

## Client Example

```
npx ts-node client-example
```

## Description

`app.js` is the code for the relay server
`client-example.ts` is an example for writing a client that can connect to the relay server

## Events

| Event     | Description                                                                                 | Type          |
| --------- | ------------------------------------------------------------------------------------------- | ------------- |
| subscribe | subscribe to the respective channel for different banks in order to listen for relay events | client->relay |
| transmit  | transmit payload for relaying                                                               | client->relay |
| relay     | relay payload to the respective channel/bank                                                | relay->client |
