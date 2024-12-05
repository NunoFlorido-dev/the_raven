function splitSyllables(word) {
  var response = [];
  var isSpecialCase = false;
  var nums = (word.match(/[aeiou]/gi) || []).length;
  //debugger;
  if (
    isSpecialCase == false &&
    (word.match(/[0123456789]/gi) || []).length == word.length
  ) {
    // has digits
    response.push(word);
    isSpecialCase = true;
  }

  if (isSpecialCase == false && word.length < 4) {
    // three letters or less
    response.push(word);
    isSpecialCase = true;
  }

  if (isSpecialCase == false && word.charAt(word.length - 1) == "e") {
    if (isVowel(word.charAt(word.length - 2)) == false) {
      var cnt = (word.match(/[aeiou]/gi) || []).length;
      if (cnt == 3) {
        if (hasDoubleVowels(word)) {
          // words like "piece, fleece, grease"
          response.push(word);
          isSpecialCase = true;
        }
      }
      if (cnt == 2) {
        // words like "phase, phrase, blaze, name",
        if (hasRecurringConsonant(word) == false) {
          // but not like "syllable"
          response.push(word);
          isSpecialCase = true;
        }
      }
    }
  }

  if (isSpecialCase == false) {
    const syllableRegex =
      /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
    response = word.match(syllableRegex);
  }

  return response;
}

function splitParagraphIntoWords(paragraph) {
  return paragraph.split(/\s+/);
}

function getSyllablesInWords(words) {
  return words.map(splitSyllables); // Split each word into syllables
}

function getSyllablesInParagraphs(paragraphs) {
  return paragraphs.map((paragraph) => {
    const words = splitParagraphIntoWords(paragraph);
    return words.map(splitSyllables);
  });
}
