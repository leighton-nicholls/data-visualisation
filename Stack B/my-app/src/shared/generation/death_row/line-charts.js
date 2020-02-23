import { groupByMultiple, isValidDate } from "../../shared-functions";

// this function will retrieve only the very last date grouped by year
// For example, for death row, before 2000 there was only one publication at the end of each year (31 Dec)
// However, from 2000 onwards, there are four reports for winter, spring, fall and summer
// In order to be consistent, I only want to retrieve the very last publication (winter), so I don't also take into account
// the other three publication months
// this also accounts for missing publications, i.e. if spring and winter were the only publications published for a particular year
// the function will retrieve just winter
const retrieveLastMonthInYears = convicts => {
  const grouped = groupByMultiple(["date", "state"], convicts);

  let dates = [];

  Object.keys(grouped).forEach(outerGroupKey => {
    dates.push(new Date(outerGroupKey));
  });

  const newDates = [];

  dates.forEach(date => {
    let maxDate = new Date(
      Math.max.apply(
        null,
        dates.map(date => {
          date.setHours(0, 0, 0); // deliberately setting hours to be 0. Don't want any built-in date formatting to muck up the comparisons as a precaution
          return new Date(date);
        })
      )
    );

    const dateYear = maxDate.getFullYear();
    dates = dates.filter(innerDate => {
      return innerDate.getFullYear() !== dateYear;
    });

    // pure date equality is not possible with an conditional if check such as new Date() == new Date(). Therefore, I retrieve precise calculation with getTime()
    isValidDate(maxDate) === true && newDates.push(maxDate.getTime());
  });

  return newDates;
};

export function generateConvictsDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const dates = retrieveLastMonthInYears(convicts);

    convicts.forEach(convict => {
      convict.date.setHours(0, 0, 0);
    });

    const filteredConvicts = convicts.filter(o =>
      dates.includes(o.date.getTime())
    );

    const testConvicts = filteredConvicts.map(convict =>
      Object.assign({}, convict, { date: convict.date.getFullYear() })
    );

    const finalConvicts = testConvicts.map(convict => {
      return { year: convict.date, total: convict.total };
    });

    const deathRowTotals = Object.values(
      finalConvicts.reduce(
        (a, c) => (
          (a[c.year] = a[c.year]
            ? ((a[c.year].total += c.total), a[c.year])
            : c),
          a
        ),
        {}
      )
    );

    const lineChartData = {
      label: "# Convicts",
      values: []
    };

    deathRowTotals.forEach(total => {
      lineChartData.values.push({ x: total.year, y: total.total });
    });
    return {
      convictsDeathRowLineChartData: lineChartData
    };
  };
}

export function generateConvictsByStateDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const dates = retrieveLastMonthInYears(convicts);

    convicts.forEach(convict => {
      convict.date.setHours(0, 0, 0); // deliberately setting hours to be 0. Don't want any built-in date formatting to muck up the comparisons as a precaution
    });

    const filteredConvicts = convicts.filter(o =>
      dates.includes(o.date.getTime())
    );

    const testConvicts = filteredConvicts.map(convict =>
      Object.assign({}, convict, { date: convict.date.getFullYear() })
    );

    const finalConvicts = testConvicts.map(convict => {
      return { state: convict.state, year: convict.date, total: convict.total };
    });

    const lineChartData = [];

    const states = [...new Set(finalConvicts.map(convict => convict.state))];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    finalConvicts.forEach(convict => {
      lineChartData.forEach(data => {
        if (convict.state === data.label) {
          data.values.push({ x: convict.year, y: convict.total });
        }
      });
    });

    return {
      convictsByStateDeathRowLineChartData: lineChartData
    };
  };
}

export function generateWhiteRaceDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const whiteRaces = convicts.filter(convict => {
      return convict.races.white;
    });

    const years = [
      ...new Set(whiteRaces.map(convict => convict.date.getFullYear()))
    ];

    const states = [...new Set(whiteRaces.map(convict => convict.state))];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      whiteRaces.forEach(race => {
        if (data.label === race.state) {
          data.values.forEach(value => {
            if (value.x === race.date.getFullYear()) {
              value.y = race.races.white;
            }
          });
        }
      });
    });

    return {
      whiteRaceDeathRowLineChartData: lineChartData
    };
  };
}

export function generateBlackRaceDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const blackRaces = convicts.filter(convict => {
      return convict.races.black;
    });

    const years = [
      ...new Set(blackRaces.map(convict => convict.date.getFullYear()))
    ];

    const states = [...new Set(blackRaces.map(convict => convict.state))];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      blackRaces.forEach(race => {
        if (data.label === race.state) {
          data.values.forEach(value => {
            if (value.x === race.date.getFullYear()) {
              value.y = race.races.black;
            }
          });
        }
      });
    });

    return {
      blackRaceDeathRowLineChartData: lineChartData
    };
  };
}

export function generateAsianRaceDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const asianRaces = convicts.filter(convict => {
      return convict.races.asian;
    });

    const years = [
      ...new Set(asianRaces.map(convict => convict.date.getFullYear()))
    ];

    const states = [...new Set(asianRaces.map(convict => convict.state))];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      asianRaces.forEach(race => {
        if (data.label === race.state) {
          data.values.forEach(value => {
            if (value.x === race.date.getFullYear()) {
              value.y = race.races.asian;
            }
          });
        }
      });
    });

    return {
      asianRaceDeathRowLineChartData: lineChartData
    };
  };
}

export function generateNativeAmericanRaceDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const nativeAmericanRaces = convicts.filter(convict => {
      return convict.races["native american"];
    });

    const years = [
      ...new Set(nativeAmericanRaces.map(convict => convict.date.getFullYear()))
    ];

    const states = [
      ...new Set(nativeAmericanRaces.map(convict => convict.state))
    ];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      nativeAmericanRaces.forEach(race => {
        if (data.label === race.state) {
          data.values.forEach(value => {
            if (value.x === race.date.getFullYear()) {
              value.y = race.races["native american"];
            }
          });
        }
      });
    });

    return {
      nativeAmericanRaceDeathRowLineChartData: lineChartData
    };
  };
}

export function generatelatinoARaceDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const latinoARaces = convicts.filter(convict => {
      return convict.races["latino/a"];
    });

    const years = [
      ...new Set(latinoARaces.map(convict => convict.date.getFullYear()))
    ];

    const states = [...new Set(latinoARaces.map(convict => convict.state))];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      latinoARaces.forEach(race => {
        if (data.label === race.state) {
          data.values.forEach(value => {
            if (value.x === race.date.getFullYear()) {
              value.y = race.races["latino/a"];
            }
          });
        }
      });
    });

    return {
      latinoARaceDeathRowLineChartData: lineChartData
    };
  };
}

export function generateUnknownRaceDeathRowLineChart(convicts) {
  return function generateChart(state) {
    const unknownRaces = convicts.filter(convict => {
      return convict.races.unknown;
    });

    const years = [
      ...new Set(unknownRaces.map(convict => convict.date.getFullYear()))
    ];

    const states = [...new Set(unknownRaces.map(convict => convict.state))];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      unknownRaces.forEach(race => {
        if (data.label === race.state) {
          data.values.forEach(value => {
            if (value.x === race.date.getFullYear()) {
              value.y = race.races.unknown;
            }
          });
        }
      });
    });

    return {
      unknownRaceDeathRowLineChartData: lineChartData
    };
  };
}
