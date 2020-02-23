export function generateSentencingFacts(sentences, executions) {
  return function generateFacts(state) {
    const mergedArrays = generateMergedDataForRatioFinding(
      sentences,
      executions
    );

    const {
      minDifferenceRatio,
      statesWithLowestExecutionToSentencingRatio
    } = generateLowestExecutionToSentencingRatio(mergedArrays);
    const {
      maxDifferenceRatio,
      statesWithHighestExecutionToSentencingRatio
    } = generateHighestExecutionToSentencingRatio(mergedArrays);

    const sentencingFacts = {
      sentencingRatios: {
        minDifferenceRatio: minDifferenceRatio,
        maxDifferenceRatio: maxDifferenceRatio,
        statesWithLowestExecutionToSentencingRatio: statesWithLowestExecutionToSentencingRatio,
        statesWithHighestExecutionToSentencingRatio: statesWithHighestExecutionToSentencingRatio
      }
    };

    return { sentencingFacts: sentencingFacts };
  };
}

const generateMergedDataForRatioFinding = (sentences, executions) => {
  const sentencingTotalsByState = sentences.map(sentence => {
    let total = sentence.years.reduce((a, b) => +a + +b.sentence, 0);
    return { state: sentence.state, sentencingTotal: total };
  });

  const states = executions.map(execution => {
    return execution.state;
  });

  const executionsTotalsByStateObject = states.reduce((total, value) => {
    total[value] = (total[value] || 0) + 1;
    return total;
  }, {});

  const executionsTotalsByState = Object.keys(
    executionsTotalsByStateObject
  ).map(key => ({
    state: key,
    executionTotal: executionsTotalsByStateObject[key]
  }));

  const mergedArrays = sentencingTotalsByState.map(sentence => {
    const sentenceItem = executionsTotalsByState.find(
      execution => execution.state === sentence.state
    );

    sentence.executionTotal = sentenceItem ? sentenceItem.executionTotal : 0;

    return sentence;
  });

  return mergedArrays;
};

const generateLowestExecutionToSentencingRatio = mergedArrays => {
  const minDifferenceRatio = Math.min.apply(
    Math,
    mergedArrays.map(element => {
      let lowestValue =
        element.executionTotal < element.sentencingTotal
          ? element.executionTotal
          : element.sentencingTotal;
      let highestValue =
        element.executionTotal < element.sentencingTotal
          ? element.sentencingTotal
          : element.executionTotal;

      let diff = lowestValue / highestValue;
      return isNaN(diff) !== true ? diff : 0;
    })
  );

  const statesWithLowestExecutionToSentencingRatio = mergedArrays.filter(
    element => {
      let lowestValue =
        element.executionTotal < element.sentencingTotal
          ? element.executionTotal
          : element.sentencingTotal;
      let highestValue =
        element.executionTotal < element.sentencingTotal
          ? element.sentencingTotal
          : element.executionTotal;
      let diff = lowestValue / highestValue;
      return diff === minDifferenceRatio && element.state;
    }
  );

  return { minDifferenceRatio, statesWithLowestExecutionToSentencingRatio };
};

const generateHighestExecutionToSentencingRatio = mergedArrays => {
  const maxDifferenceRatio = Math.max.apply(
    Math,
    mergedArrays.map(element => {
      let lowestValue =
        element.executionTotal < element.sentencingTotal
          ? element.executionTotal
          : element.sentencingTotal;
      let highestValue =
        element.executionTotal < element.sentencingTotal
          ? element.sentencingTotal
          : element.executionTotal;
      let diff = lowestValue / highestValue;
      return isNaN(diff) !== true ? diff : 0;
    })
  );

  const statesWithHighestExecutionToSentencingRatio = mergedArrays.filter(
    element => {
      let lowestValue =
        element.executionTotal < element.sentencingTotal
          ? element.executionTotal
          : element.sentencingTotal;
      let highestValue =
        element.executionTotal < element.sentencingTotal
          ? element.sentencingTotal
          : element.executionTotal;
      let diff = lowestValue / highestValue;
      return diff === maxDifferenceRatio && element.state;
    }
  );

  return { maxDifferenceRatio, statesWithHighestExecutionToSentencingRatio };
};
