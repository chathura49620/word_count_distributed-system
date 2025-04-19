const client = require('../sidecar/mqttClient');

const finalCounts = {};
const words = {};

client.on('connect', () => {
  console.log('[Learner] Connected to MQTT broker');
  client.subscribe('learner/final');
});

client.on('message', (topic, message) => {
  const { counts, wordList } = JSON.parse(message.toString());
  console.log('[Learner] Received final counts:', { counts, wordList });

  for (const letter in counts) {
    finalCounts[letter] = (finalCounts[letter] || 0) + counts[letter];
    words[letter] = words[letter] || [];
    words[letter].push(...wordList[letter]);
  }

  console.clear();
  console.log('\n Word Count');
  console.log('*******#######*********');
  Object.keys(finalCounts).sort().forEach(letter => {
    const count = finalCounts[letter];
    const finalwords = [...new Set(words[letter])].join(', ');
    console.log(`${letter}: ${count} => ${finalwords}`);
  });
});