const client = require('../sidecar/mqttClient');
const { getWordCountWithinRange } = require('../shared/utils');

let assignedRange = [];
const proposerNodeId = 1; 

client.on('connect', () => {
  console.log(`Proposer -  ${proposerNodeId} Connected to  broker`);
  client.subscribe('proposer/config');
  client.subscribe('proposer/line');
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  if (topic === 'proposer/config') {
    const data = JSON.parse(msg);
    if (data.id === proposerNodeId) {
      assignedRange = data.range;
      console.log(`Proposer -  ${proposerNodeId} Assigned range:`, assignedRange);
    }
  }
  if (topic === 'proposer/line') {
    if (!assignedRange.length) return;
    console.log(`Proposer -  ${proposerNodeId} Received line:`, msg);
    const { counts, wordList } = getWordCountWithinRange(msg, assignedRange);
    const result = { proposerNodeId, counts, wordList };
    console.log(`Proposer -  ${proposerNodeId} publish counts:`, result);
    client.publish('acceptor/result', JSON.stringify(result));
  }
});