function findinRange(char, range) {
  const upper = char.toUpperCase();
  return range.includes(upper);
}

function getWordCountWithinRange(line, range) {
  const words = line.trim().split(/\s+/);
  const counts = {};
  const wordList = {};

  for (const word of words) {
    const firstChar = word[0].toUpperCase();
    if (findinRange(firstChar, range)) {
      counts[firstChar] = (counts[firstChar] || 0) + 1;
      wordList[firstChar] = wordList[firstChar] || [];
      wordList[firstChar].push(word);
    }
  }
  return { counts, wordList };
}

module.exports = { findinRange, getWordCountWithinRange };