const mqtt = require('mqtt');
const mqttLocalBrokerURL = 'mqtt://localhost:1883'; 

const client = mqtt.connect(mqttLocalBrokerURL);

client.on('connect', () => {
  console.log('MQTT broker connected');
});

client.on('error', (err) => {
  console.error('Connection Error:', err);
});

module.exports = client;
