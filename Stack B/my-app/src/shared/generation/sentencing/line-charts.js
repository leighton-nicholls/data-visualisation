export function generateSentencingOverallLineChart(sentences) {
  return function generateChart(state) {
    const rawYears = sentences.map((sentence, index) => {
      return sentence.years;
    });

    const objArray = [];
    rawYears.forEach(year => {
      year.forEach((item, index) => {
        objArray.push({
          sentence: item.sentence,
          year: item.year
        });
      });
    });

    var r = {};
    objArray.forEach(o => {
      r[o.year] = (r[o.year] || 0) + o.sentence;
    });

    var result = Object.keys(r).map(k => {
      return { year: parseInt(k), sentence: r[k] };
    });

    const lineChartData = {
      label: "Sentencing",
      values: []
    };

    const values = result.map(year => ({ x: year.year, y: 0 }));

    values.forEach(value => {
      result.forEach(year => {
        if (value.x === year.year) {
          value.y = year.sentence;
        }
      });
    });

    lineChartData.values = values;

    return {
      sentencingOverallLineChartData: lineChartData
    };
  };
}

export function generateSentencingByStateLineChart(sentences) {
  return function generateChart(state) {
    const lineChartData = [];

    sentences.forEach(sentence => {
      lineChartData.push({
        label: sentence.state,
        values: []
      });
    });

    lineChartData.forEach(data => {
      sentences.forEach(sentence => {
        if (sentence.state === data.label) {
          sentence.years.forEach(year => {
            data.values.push({ x: year.year, y: year.sentence });
          });
        }
      });
    });

    lineChartData.forEach(data => {
      data.values.sort((a, b) => (a.year > b.year ? 1 : -1));
    });

    return {
      sentencingByStateLineChartData: lineChartData
    };
  };
}

export function generateExecutionToSentencingComparisonLineChart(sentences) {
  return function generateChart(state) {
    const lineChartData = [];

    sentences.forEach(sentence => {
      lineChartData.push({
        label: sentence.state,
        values: []
      });
    });

    lineChartData.forEach(data => {
      sentences.forEach(sentence => {
        if (sentence.state === data.label) {
          sentence.years.forEach(year => {
            data.values.push({ x: year.year, y: year.sentence });
          });
        }
      });
    });

    lineChartData.forEach(data => {
      data.values.sort((a, b) => (a.year > b.year ? 1 : -1));
    });

    return {
      sentencingByStateLineChartData: lineChartData
    };
  };
}

export function generateStatesCarryingOutSentencesByYearOverallLineChartData(
  sentences
) {
  return function generateChart(state) {
    const previousYear = new Date().getFullYear() - 1;
    const years = Array.from(
      { length: previousYear - 1976 },
      (value, index) => 1977 + index
    );

    const values = years.map(year => {
      return { x: year, y: 0 };
    });

    sentences.forEach((sentence, index) => {
      sentence.years.forEach(year => {
        values.forEach(val => {
          if (year.year === val.x && year.sentence > 0) {
            val.y = val.y + 1;
          }
        });
      });
    });

    const lineChartData = {
      label: "States carrying out sentences",
      values: []
    };

    lineChartData.values = values;

    return {
      statesCarryingOutSentencesByYearOverallLineChartData: lineChartData
    };
  };
}
