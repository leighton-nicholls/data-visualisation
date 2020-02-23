import { calculateAverageDate } from "../../shared-functions";
import moment from "moment";

export function generateMurderOpinionLineChart(murderOpinions) {
  return function generateChart(state) {
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
      }
    ];

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
          value.y = date.favour;
        }
      });
    });

    disfavourValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.disfavour;
        }
      });
    });

    neutralValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.neutral;
        }
      });
    });

    favourValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    disfavourValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    neutralValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    lineChartData[0].values = favourValues;
    lineChartData[1].values = disfavourValues;
    lineChartData[2].values = neutralValues;

    return {
      murderOpinionLineChartData: lineChartData
    };
  };
}

export function generateMoralOpinionLineChart(moralOpinions) {
  return function generateChart(state) {
    const dates = [];
    moralOpinions.forEach(moralOpinion => {
      moralOpinion.forEach(innerMoralOpinion => {
        let averageDate = calculateAverageDate(
          innerMoralOpinion.from_date,
          innerMoralOpinion.to_date
        );
        dates.push({
          year: averageDate.getFullYear(),
          date: moment(averageDate).format("DD/MM/YYYY"),
          acceptable: innerMoralOpinion.acceptable,
          wrong: innerMoralOpinion.wrong,
          depends: innerMoralOpinion.depends,
          neutral: innerMoralOpinion.no_opinion
        });
      });
    });

    const lineChartData = [
      {
        label: "Acceptable",
        values: []
      },
      {
        label: "Wrong",
        values: []
      },
      {
        label: "Depends",
        values: []
      },
      {
        label: "Neutral/no opinion",
        values: []
      }
    ];

    const years = [];

    moralOpinions.forEach(moralOpinion => {
      moralOpinion.forEach(innerMoralOpinion => {
        let averageDate = calculateAverageDate(
          innerMoralOpinion.from_date,
          innerMoralOpinion.to_date
        );

        !years.includes(averageDate.getFullYear()) &&
          years.push(averageDate.getFullYear());
      });
    });

    const acceptableValues = years.map(year => ({ x: year, y: 0 }));
    const wrongValues = years.map(year => ({ x: year, y: 0 }));
    const dependsValues = years.map(year => ({ x: year, y: 0 }));
    const neutralValues = years.map(year => ({ x: year, y: 0 }));

    acceptableValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.acceptable;
        }
      });
    });

    wrongValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.wrong;
        }
      });
    });

    dependsValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.depends;
        }
      });
    });

    neutralValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.depends;
        }
      });
    });

    acceptableValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    wrongValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    dependsValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    neutralValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    lineChartData[0].values = acceptableValues;
    lineChartData[1].values = wrongValues;
    lineChartData[2].values = dependsValues;
    lineChartData[3].values = neutralValues;
    return {
      moralOpinionLineChartData: lineChartData
    };
  };
}

export function generateFrequencyOpinionLineChart(frequencyOpinions) {
  return function generateChart(state) {
    const dates = [];
    frequencyOpinions.forEach(frequencyOpinion => {
      frequencyOpinion.forEach(innerFrequencyOpinion => {
        let averageDate = calculateAverageDate(
          innerFrequencyOpinion.from_date,
          innerFrequencyOpinion.to_date
        );
        dates.push({
          year: averageDate.getFullYear(),
          date: moment(averageDate).format("DD/MM/YYYY"),
          too_often: innerFrequencyOpinion.too_often,
          right_amount: innerFrequencyOpinion.right_amount,
          not_enough: innerFrequencyOpinion.not_enough,
          neutral: innerFrequencyOpinion.no_opinion
        });
      });
    });

    const lineChartData = [
      {
        label: "Too often",
        values: []
      },
      {
        label: "Right amount",
        values: []
      },
      {
        label: "Not enough",
        values: []
      },
      {
        label: "Neutral/no opinion",
        values: []
      }
    ];

    const years = [];

    frequencyOpinions.forEach(frequencyOpinion => {
      frequencyOpinion.forEach(innerFrequencyOpinion => {
        let averageDate = calculateAverageDate(
          innerFrequencyOpinion.from_date,
          innerFrequencyOpinion.to_date
        );

        !years.includes(averageDate.getFullYear()) &&
          years.push(averageDate.getFullYear());
      });
    });

    const tooOftenValues = years.map(year => ({ x: year, y: 0 }));
    const rightAmountValues = years.map(year => ({ x: year, y: 0 }));
    const notEnoughValues = years.map(year => ({ x: year, y: 0 }));
    const neutralValues = years.map(year => ({ x: year, y: 0 }));

    tooOftenValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.too_often;
        }
      });
    });

    rightAmountValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.right_amount;
        }
      });
    });

    notEnoughValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.not_enough;
        }
      });
    });

    neutralValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.neutral;
        }
      });
    });

    tooOftenValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    rightAmountValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    notEnoughValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    neutralValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    lineChartData[0].values = tooOftenValues;
    lineChartData[1].values = rightAmountValues;
    lineChartData[2].values = notEnoughValues;
    lineChartData[3].values = neutralValues;

    return {
      frequencyOpinionLineChartData: lineChartData
    };
  };
}

export function generateEquitableOpinionLineChart(equitableOpinions) {
  return function generateChart(state) {
    const dates = [];
    equitableOpinions.forEach(equitableOpinion => {
      equitableOpinion.forEach(innerEquitableOpinion => {
        let averageDate = calculateAverageDate(
          innerEquitableOpinion.from_date,
          innerEquitableOpinion.to_date
        );

        dates.push({
          year: averageDate.getFullYear(),
          date: moment(averageDate).format("DD/MM/YYYY"),
          fairly: innerEquitableOpinion.fairly,
          unfairly: innerEquitableOpinion.unfairly,
          neutral: innerEquitableOpinion.no_opinion
        });
      });
    });

    const lineChartData = [
      {
        label: "Fairly",
        values: []
      },
      {
        label: "Unfairly",
        values: []
      },
      {
        label: "Neutral",
        values: []
      }
    ];

    const years = [];

    equitableOpinions.forEach(equitableOpinion => {
      equitableOpinion.forEach(innerEquitableOpinion => {
        let averageDate = calculateAverageDate(
          innerEquitableOpinion.from_date,
          innerEquitableOpinion.to_date
        );

        !years.includes(averageDate.getFullYear()) &&
          years.push(averageDate.getFullYear());
      });
    });

    const fairlyValues = years.map(year => ({ x: year, y: 0 }));
    const unfairlyValues = years.map(year => ({ x: year, y: 0 }));
    const neutralValues = years.map(year => ({ x: year, y: 0 }));

    fairlyValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.fairly;
        }
      });
    });

    unfairlyValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.unfairly;
        }
      });
    });

    neutralValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.neutral;
        }
      });
    });

    fairlyValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    unfairlyValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    neutralValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    lineChartData[0].values = fairlyValues;
    lineChartData[1].values = unfairlyValues;
    lineChartData[2].values = neutralValues;

    return {
      equitableOpinionLineChartData: lineChartData
    };
  };
}

export function generateApproachesOpinionLineChart(approachOpinions) {
  return function generateChart(state) {
    const dates = [];
    approachOpinions.forEach(approachOpinion => {
      approachOpinion.forEach(innerApproachOpinion => {
        let averageDate = calculateAverageDate(
          innerApproachOpinion.from_date,
          innerApproachOpinion.to_date
        );

        dates.push({
          year: averageDate.getFullYear(),
          date: moment(averageDate).format("DD/MM/YYYY"),
          death_penalty: innerApproachOpinion.death_penalty,
          life_imprisonment: innerApproachOpinion.life_imprisonment,
          neutral: innerApproachOpinion.no_opinion
        });
      });
    });

    const lineChartData = [
      {
        label: "Death penalty",
        values: []
      },
      {
        label: "Life imprisonment",
        values: []
      },
      {
        label: "Neutral",
        values: []
      }
    ];

    const years = [];

    approachOpinions.forEach(approachOpinion => {
      approachOpinion.forEach(innerApproachOpinion => {
        let averageDate = calculateAverageDate(
          innerApproachOpinion.from_date,
          innerApproachOpinion.to_date
        );

        !years.includes(averageDate.getFullYear()) &&
          years.push(averageDate.getFullYear());
      });
    });

    const deathPenaltyValues = years.map(year => ({ x: year, y: 0 }));
    const lifeImprisonmentValues = years.map(year => ({ x: year, y: 0 }));
    const neutralValues = years.map(year => ({ x: year, y: 0 }));

    deathPenaltyValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.death_penalty;
        }
      });
    });

    lifeImprisonmentValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.life_imprisonment;
        }
      });
    });

    neutralValues.forEach(value => {
      dates.forEach(date => {
        if (value.x === date.year) {
          value.y = date.neutral;
        }
      });
    });

    deathPenaltyValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    lifeImprisonmentValues.sort((a, b) => (a.x > b.x ? 1 : -1));
    neutralValues.sort((a, b) => (a.x > b.x ? 1 : -1));

    lineChartData[0].values = deathPenaltyValues;
    lineChartData[1].values = lifeImprisonmentValues;
    lineChartData[2].values = neutralValues;

    return {
      approachesOpinionLineChartData: lineChartData
    };
  };
}
