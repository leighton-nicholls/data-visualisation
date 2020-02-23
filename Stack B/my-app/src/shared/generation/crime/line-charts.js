import { calculateAverageDate } from "../../shared-functions";
import moment from "moment";

// playing around to see how much difference the graph looks for opinion fields etc in comparison to the crime rates,
// simply because the crime can be so high on the scale it is difficult to see any trends
const SCALEADJUSTER = 1;

export function generateCrimeLineChartData(
  executions,
  murderOpinions,
  sentences,
  crimes
) {
  return function generateChart(state) {
    const { executionValues } = generateExecutionValues(executions);

    const { crimeMurderValues } = generateViolentCrimeRateValues(crimes);

    const { populationValues } = generatePopulationValues(crimes);

    const {
      favourValues,
      disfavourValues,
      neutralValues
    } = generateOpinionValues(murderOpinions);
    const { sentencingValues } = generateSentencingValues(sentences);

    const lineChartData = [
      {
        label: "Favour",
        values: []
      },
      {
        label: "Disfavour",
        values: []
      },
      {
        label: "Neutral/no opinion",
        values: []
      },
      { label: "Population", values: [] },
      { label: "Murder and nonnegligent manslaughter rate", values: [] }
    ];

    executionValues.length > 0 &&
      lineChartData.push({ label: "Executions", values: [...executionValues] });
    sentencingValues.length > 0 &&
      lineChartData.push({ label: "Sentences", values: [...sentencingValues] });

    lineChartData[0].values = favourValues;
    lineChartData[1].values = disfavourValues;
    lineChartData[2].values = neutralValues;

    lineChartData[3].values = populationValues;

    lineChartData[4].values = crimeMurderValues;
    return { crimeLineChartData: lineChartData };
  };
}

const generateExecutionValues = executions => {
  const executionYears = executions.map(execution => {
    return execution.execution_date.getFullYear();
  });

  const distinctYears = [
    ...new Set(
      executions.map(execution => execution.execution_date.getFullYear())
    )
  ];

  const executionValues = distinctYears.map(year => ({ x: year, y: 0 }));

  executionValues.forEach(value => {
    executionYears.forEach(year => {
      if (value.x == year) {
        value.y = value.y + 1;
      }
    });
  });

  return { executionValues };
};

const generatePopulationValues = crimesOverall => {
  const population = crimesOverall.map(crime => {
    return {
      year: crime.year,
      population: parseInt(crime.population.toString().substr(0, 3))
    };
  });

  const populationYears = [...new Set(population.map(crime => crime.year))];

  const populationValues = populationYears.map(year => ({ x: year, y: 0 }));

  populationValues.forEach(value => {
    population.forEach(pop => {
      if (value.x === pop.year) {
        value.y = pop.population;
      }
    });
  });

  return { populationValues };
};

const generateViolentCrimeRateValues = crimesOverall => {
  const violentCrimeTotal = crimesOverall.map(crime => {
    return {
      year: crime.year,
      violent_crime_total: crime.violent_crime_rate
    };
  });

  const violentCrimeYears = [
    ...new Set(violentCrimeTotal.map(crime => crime.year))
  ];

  const crimeMurderValues = violentCrimeYears.map(year => ({
    x: year,
    y: 0
  }));

  crimeMurderValues.map(value => {
    violentCrimeTotal.map(violentCrime => {
      if (value.x === violentCrime.year) {
        value.y = violentCrime.violent_crime_total;
      }
    });
  });

  return { crimeMurderValues };
};

const generateOpinionValues = murderOpinions => {
  const dates = [];
  murderOpinions.forEach(murderOpinion => {
    murderOpinion.forEach(innerMurderOpinion => {
      let averageDate = calculateAverageDate(
        innerMurderOpinion.from_date,
        innerMurderOpinion.to_date
      );
      dates.push({
        year: averageDate.getFullYear(),
        date: moment(averageDate).format("DD/MM/YYYY"),
        favour: innerMurderOpinion.favour,
        disfavour: innerMurderOpinion.disfavour,
        neutral: innerMurderOpinion.neutral
      });
    });
  });

  const years = [];

  murderOpinions.forEach(murderOpinion => {
    murderOpinion.forEach(innerMurderOpinion => {
      let averageDate = calculateAverageDate(
        innerMurderOpinion.from_date,
        innerMurderOpinion.to_date
      );

      !years.includes(averageDate.getFullYear()) &&
        years.push(averageDate.getFullYear());
    });
  });

  const favourValues = years.map(year => ({ x: year, y: 0 }));
  const disfavourValues = years.map(year => ({ x: year, y: 0 }));
  const neutralValues = years.map(year => ({ x: year, y: 0 }));

  favourValues.forEach(value => {
    dates.forEach(date => {
      if (value.x === date.year) {
        value.y = date.favour * SCALEADJUSTER;
      }
    });
  });

  disfavourValues.forEach(value => {
    dates.forEach(date => {
      if (value.x === date.year) {
        value.y = date.disfavour * SCALEADJUSTER;
      }
    });
  });

  neutralValues.forEach(value => {
    dates.forEach(date => {
      if (value.x === date.year) {
        value.y = date.neutral * SCALEADJUSTER;
      }
    });
  });

  favourValues.sort((a, b) => (a.x > b.x ? 1 : -1));

  disfavourValues.sort((a, b) => (a.x > b.x ? 1 : -1));

  neutralValues.sort((a, b) => (a.x > b.x ? 1 : -1));

  return { favourValues, disfavourValues, neutralValues };
};

const generateSentencingValues = sentences => {
  const rawYears = sentences.map((sentence, index) => {
    return sentence.years;
  });

  const objArray = [];
  rawYears.map(year => {
    year.map((item, index) => {
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

  const sentencingValues = result.map(year => ({ x: year.year, y: 0 }));

  sentencingValues.map(value => {
    result.map(year => {
      if (value.x === year.year) {
        value.y = year.sentence;
      }
    });
  });

  return { sentencingValues };
};
