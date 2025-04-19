const client = require('../sidecar/mqttClient');

client.on('connect', () => {
  console.log('Acceptor Connected to MQTT broker succesfully');
  client.subscribe('acceptor/result');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  client.publish('learner/final', JSON.stringify(data));
});