export function generateInnocenceFacts(innocents) {
  return function generateFacts(state) {
    const shortestTimeOnDeathRow = generateShortestTimeSpentOnDeathRow(
      innocents
    );
    const longestTimeOnDeathRow = generateLongestTimeSpentOnDeathRow(innocents);

    const averageNumberOfYearsSpentOnDeathRow = generateAverageNumberOfYearsSpentOnDeathRow(
      innocents
    );

    const mostCommonNumberOfReasons = generateMostCommonNumberOfReasons(
      innocents
    );

    const innocenceFacts = {
      averageNumberOfYearsSpentOnDeathRow: averageNumberOfYearsSpentOnDeathRow,
      shortestTimeOnDeathRow: shortestTimeOnDeathRow,
      longestTimeOnDeathRow: longestTimeOnDeathRow,
      mostCommonNumberOfReasons: mostCommonNumberOfReasons
    };

    return { innocenceFacts: innocenceFacts };
  };
}

const generateAverageNumberOfYearsSpentOnDeathRow = innocents => {
  const averageNumberOfYearsSpentOnDeathRow =
    innocents.reduce((total, next) => total + next.years_between, 0) /
    innocents.length;

  return averageNumberOfYearsSpentOnDeathRow;
};

const generateShortestTimeSpentOnDeathRow = innocents => {
  const shortestTimeSpent = Math.min.apply(
    Math,
    innocents.map(innocent => {
      return innocent.exonerated - innocent.convicted;
    })
  );

  const shortestTimeOnDeathRow = innocents.filter(innocent => {
    return innocent.exonerated - innocent.convicted === shortestTimeSpent;
  });

  return shortestTimeOnDeathRow;
};

const generateLongestTimeSpentOnDeathRow = innocents => {
  const longestTimeSpent = Math.max.apply(
    Math,
    innocents.map(innocent => {
      return innocent.exonerated - innocent.convicted;
    })
  );

  const longestTimeOnDeathRow = innocents.filter(innocent => {
    return innocent.exonerated - innocent.convicted === longestTimeSpent;
  });

  return longestTimeOnDeathRow;
};

const generateMostCommonNumberOfReasons = innocents => {
  const lengths = innocents.map(innocent => {
    return innocent.reasons.length;
  });
  const mostCommonNumberOfReasons = lengths.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1;
    return a;
  }, {});

  return mostCommonNumberOfReasons;
};
