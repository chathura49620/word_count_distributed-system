const fs = require('fs');
const path = require('path');
const client = require('../sidecar/mqttClient');

const proposerConfigs = [
  { id: 1, range: ['A', 'B', 'C'] }
];

client.on('connect', () => {
  console.log('***Coordinator***  Connected to MQTT broker');
  proposerConfigs.forEach(config => {
    console.log(`***Coordinator*** Sending config to proposer ${config.id}`);
    client.publish('proposer/config', JSON.stringify(config));
  });

  const filePath = path.join(__dirname, '../sample.txt');
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  lines.forEach((line, index) => {
    if (line.trim()) {
      console.log(`***Coordinator*** Publishing line ${index + 1}:`, line);
      client.publish('proposer/line', line);
    }
  });
});