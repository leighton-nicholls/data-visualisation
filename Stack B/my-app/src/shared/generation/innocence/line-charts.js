import { groupByMultiple, generateYearsArray } from "../../shared-functions";

export function generateInnocenceConvictionsOverallLineChartData(innocents) {
  return function generateChart(state) {
    // no need to check for exoneration as well, because there must always be a first conviction before an exoneration can possibly happen
    const minYear = Math.min.apply(
      null,
      innocents.map(innocent => {
        return innocent.convicted;
      })
    );

    const maxYear = new Date().getFullYear();

    const years = generateYearsArray(maxYear, minYear);

    const lineChartData = {
      label: "# Convictions",
      values: []
    };

    years.map(year => {
      lineChartData.values.push({ x: year, y: 0 });
    });

    innocents.forEach(innocent => {
      lineChartData.values.forEach(value => {
        if (innocent.convicted === value.x) {
          value.y = value.y + 1;
        }
      });
    });

    return { innocenceConvictionsOverallLineChartData: lineChartData };
  };
}

export function generateInnocenceConvictionsByStateLineChartData(innocents) {
  return function generateChart(state) {
    const grouped = groupByMultiple(["state", "convicted"], innocents);

    // no need to check for exoneration as well, because there must always be a first conviction before an exoneration can possibly happen
    const minYear = Math.min.apply(
      null,
      innocents.map(innocent => {
        return innocent.convicted;
      })
    );

    const currentYear = new Date().getFullYear();

    const years = generateYearsArray(currentYear, minYear);

    const lineChartData = [];

    const states = [...new Set(Object.keys(grouped).map(state => state))];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    Object.keys(grouped).forEach(key => {
      let values = Object.values(grouped[key]);
      lineChartData.forEach(data => {
        if (key === data.label) {
          values.forEach(outerGroupValue => {
            outerGroupValue.forEach(innerGroupValue => {
              data.values.forEach(dataValue => {
                if (dataValue.x === innerGroupValue.convicted) {
                  dataValue.y = dataValue.y + 1;
                }
              });
            });
          });
        }
      });
    });

    return { innocenceConvictionsByStateLineChartData: lineChartData };
  };
}

export function generateInnocenceExonerationsOverallLineChartData(innocents) {
  return function generateChart(state) {
    // no need to check for exoneration as well, because there must always be a first conviction before an exoneration can possibly happen
    const minYear = Math.min.apply(
      null,
      innocents.map(innocent => {
        return innocent.exonerated;
      })
    );

    const currentYear = new Date().getFullYear();

    const years = generateYearsArray(currentYear, minYear);

    const lineChartData = {
      label: "# Exonerations",
      values: []
    };

    years.map(year => {
      lineChartData.values.push({ x: year, y: 0 });
    });

    innocents.forEach(innocent => {
      lineChartData.values.forEach(value => {
        if (innocent.exonerated === value.x) {
          value.y = value.y + 1;
        }
      });
    });

    return { innocenceExonerationsOverallLineChartData: lineChartData };

    return {};
  };
}

export function generateInnocenceExonerationsByStateLineChartData(innocents) {
  return function generateChart(state) {
    const grouped = groupByMultiple(["state", "convicted"], innocents);

    // no need to check for exoneration as well, because there must always be a first conviction before an exoneration can possibly happen
    const minYear = Math.min.apply(
      null,
      innocents.map(innocent => {
        return innocent.exonerated;
      })
    );

    const currentYear = new Date().getFullYear();

    const years = generateYearsArray(currentYear, minYear);

    const lineChartData = [];

    const states = [...new Set(Object.keys(grouped).map(state => state))];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    Object.keys(grouped).forEach(key => {
      let values = Object.values(grouped[key]);
      lineChartData.forEach(data => {
        if (key === data.label) {
          values.forEach(outerGroupValue => {
            outerGroupValue.forEach(innerGroupValue => {
              data.values.forEach(dataValue => {
                if (dataValue.x === innerGroupValue.exonerated) {
                  dataValue.y = dataValue.y + 1;
                }
              });
            });
          });
        }
      });
    });

    return { innocenceExonerationsByStateLineChartData: lineChartData };
  };
}

export function generateStatesHavingInnocentsByYearLineChartData(innocents) {
  return function generateChart(state) {
    const years = [...new Set(innocents.map(innocent => innocent.exonerated))];

    const values = years.map(year => {
      return { x: year, y: 0 };
    });

    values.forEach(val => {
      let states = innocents.filter(innocent => {
        return innocent.exonerated == val.x;
      });

      let uniqueStates = [...new Set(states.map(state => state.state))];
      val.y = uniqueStates.length;
    });

    const lineChartData = {
      label: "Total states having innocent exonerations",
      values: []
    };

    lineChartData.values = values;

    return {
      statesHavingInnocentsByYearOverallLineChartData: lineChartData
    };
  };
}
