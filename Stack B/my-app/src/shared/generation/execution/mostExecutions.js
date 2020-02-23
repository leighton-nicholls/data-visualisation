import {
  findMostCommonYear,
  sumMostCommonYear,
  groupByMultiple,
  calculateDateDifference
} from "../../shared-functions";

import moment from "moment";

export function generateMostExecutionsOverview(executions) {
  return function generateChart(state) {
    const males = executions.filter(execution => {
      return execution.gender === "Male";
    });

    const females = executions.filter(execution => {
      return execution.gender === "Female";
    });

    const { firstFemaleExecuted } =
      females.length > 0 && findFirstFemaleExecuted(females);

    const { latestFemaleExecuted } =
      females.length > 0 && findLatestFemaleExecuted(females);

    const { firstMaleExecuted } =
      males.length > 0 && findFirstMaleExecuted(males);

    const { latestMaleExecuted } =
      males.length > 0 && findLatestMaleExecuted(males);

    const {
      mostExecutionsGroupedByDayByAllStates
    } = generateMostExecutionsGroupedByDayByAllStates(executions);
    const { largestGapBetweenExecutions } = generateLargestGapBetweenExecutions(
      executions
    );

    const {
      mostExecutionsOnSingleYearBySingleState
    } = generateMostExecutionsOnSingleYearByIndividualState(executions);
    const {
      mostExecutionsOnSingleMonthBySingleState
    } = generateMostExecutionsOnSingleMonthByIndividualState(executions);

    const {
      mostCommonExecutionYear,
      mostExecutionsInSingleYear
    } = generateMostExecutionsInSingleYear(executions);

    const {
      mostExecutionsInSingleYearByLethalInjection,
      mostExecutionsInSingleYearByElectrocution,
      mostExecutionsInSingleYearByGas,
      mostExecutionsInSingleYearByFiringSquad,
      mostExecutionsInSingleYearByHanging,
      mostCommonExecutionYearByLethalInjection,
      mostCommonExecutionYearByElectrocution,
      mostCommonExecutionYearByGas,
      mostCommonExecutionYearByFiringSquad,
      mostCommonExecutionYearByHanging
    } = generateMostExecutionsInSingleYearByMethods(executions);

    const {
      total,
      date,
      states
    } = generateMostExecutionsOnSingleDayByAllStates(executions);

    const mostExecutionsOnSingleMonthByAllStates = generateMostExecutionsOnSingleMonthByAllStates(
      executions
    );

    const peopleWithHighestNumberOfVictims = generatePeopleWithHighestNumberOfVictims(
      executions
    );

    const mostExecutions = {
      mostExecutionsInSingleYear: {
        number: mostExecutionsInSingleYear,
        year: mostCommonExecutionYear
      },
      mostExecutionsInSingleYearByLethalInjection: {
        number: mostExecutionsInSingleYearByLethalInjection,
        year: mostCommonExecutionYearByLethalInjection
      },
      mostExecutionsInSingleYearByElectrocution: {
        number: mostExecutionsInSingleYearByElectrocution,
        year: mostCommonExecutionYearByElectrocution
      },
      mostExecutionsInSingleYearByGas: {
        number: mostExecutionsInSingleYearByGas,
        year: mostCommonExecutionYearByGas
      },
      mostExecutionsInSingleYearByFiringSquad: {
        number: mostExecutionsInSingleYearByFiringSquad,
        year: mostCommonExecutionYearByFiringSquad
      },
      mostExecutionsInSingleYearByHanging: {
        number: mostExecutionsInSingleYearByHanging,
        year: mostCommonExecutionYearByHanging
      },
      mostExecutionsByAllStateBySingleDay: {
        total: total,
        date: date,
        states: states
      },
      mostExecutionsOnSingleMonthBySingleState: {
        year: mostExecutionsOnSingleMonthBySingleState.year,
        month: mostExecutionsOnSingleMonthBySingleState.month,
        state: mostExecutionsOnSingleMonthBySingleState.state,
        occurences: mostExecutionsOnSingleMonthBySingleState.occurences
      },
      mostExecutionsByAllStateBySingleMonth: {
        year: mostExecutionsOnSingleMonthByAllStates.year,
        month: mostExecutionsOnSingleMonthByAllStates.month,
        states: mostExecutionsOnSingleMonthByAllStates.states,
        total: mostExecutionsOnSingleMonthByAllStates.total
      },
      mostExecutionsOnSingleYearBySingleState: {
        year: mostExecutionsOnSingleYearBySingleState.year,
        occurences: mostExecutionsOnSingleYearBySingleState.occurences,
        state: mostExecutionsOnSingleYearBySingleState.state
      },
      largestGapBetweenExecutions: {
        from_date: largestGapBetweenExecutions.from_date,
        to_date: largestGapBetweenExecutions.to_date,
        difference: largestGapBetweenExecutions.difference
      },
      mostExecutionsGroupedByDayByAllStates: {
        year: mostExecutionsGroupedByDayByAllStates.year,
        month: mostExecutionsGroupedByDayByAllStates.month,
        day: mostExecutionsGroupedByDayByAllStates.day,
        states: mostExecutionsGroupedByDayByAllStates.stateOccurences
      },
      female: {
        females: females,
        firstFemaleExecuted: firstFemaleExecuted,
        latestFemaleExecuted: latestFemaleExecuted
      },
      male: {
        males: males,
        firstMaleExecuted: firstMaleExecuted,
        latestMaleExecuted: latestMaleExecuted
      },
      peopleWithHighestNumberOfVictims: peopleWithHighestNumberOfVictims
    };

    return {
      mostExecutions: mostExecutions
    };
  };
}

const generateMostExecutionsInSingleYear = executions => {
  const executionYears = executions.map(execution => {
    return new Date(execution.execution_date).getFullYear();
  });

  const mostCommonExecutionYear = findMostCommonYear(executionYears);

  const mostExecutionsInSingleYear = sumMostCommonYear(
    executionYears,
    mostCommonExecutionYear
  );

  return {
    mostCommonExecutionYear,
    mostExecutionsInSingleYear
  };
};

const generateMostExecutionsInSingleYearByMethods = executions => {
  const executionsByLethalInjection = executions.filter(execution => {
    return execution.execution_method == "Lethal Injection";
  });
  const executionsByElectrocution = executions.filter(execution => {
    return execution.execution_method == "Electrocution";
  });

  const executionsByGas = executions.filter(execution => {
    return execution.execution_method == "Gas";
  });
  const executionsByFiringSquad = executions.filter(execution => {
    return execution.execution_method == "Firing Squad";
  });

  const executionsByHanging = executions.filter(execution => {
    return execution.execution_method == "Hanging";
  });

  const lethalInjectionYears = executionsByLethalInjection.map(execution => {
    return new Date(execution.execution_date).getFullYear();
  });
  const electrocutionYears = executionsByElectrocution.map(execution => {
    return new Date(execution.execution_date).getFullYear();
  });
  const gasYears = executionsByGas.map(execution => {
    return new Date(execution.execution_date).getFullYear();
  });
  const firingSquadYears = executionsByFiringSquad.map(execution => {
    return new Date(execution.execution_date).getFullYear();
  });

  const hangingYears = executionsByHanging.map(execution => {
    return new Date(execution.execution_date).getFullYear();
  });

  const mostCommonExecutionYearByLethalInjection = findMostCommonYear(
    lethalInjectionYears
  );

  const mostCommonExecutionYearByElectrocution = findMostCommonYear(
    electrocutionYears
  );

  const mostCommonExecutionYearByGas = findMostCommonYear(gasYears);

  const mostCommonExecutionYearByFiringSquad = findMostCommonYear(
    firingSquadYears
  );

  const mostCommonExecutionYearByHanging = findMostCommonYear(hangingYears);

  const mostExecutionsInSingleYearByLethalInjection = sumMostCommonYear(
    lethalInjectionYears,
    mostCommonExecutionYearByLethalInjection
  );
  const mostExecutionsInSingleYearByElectrocution = sumMostCommonYear(
    electrocutionYears,
    mostCommonExecutionYearByElectrocution
  );
  const mostExecutionsInSingleYearByGas = sumMostCommonYear(
    gasYears,
    mostCommonExecutionYearByGas
  );
  const mostExecutionsInSingleYearByFiringSquad = sumMostCommonYear(
    firingSquadYears,
    mostCommonExecutionYearByFiringSquad
  );

  const mostExecutionsInSingleYearByHanging = sumMostCommonYear(
    hangingYears,
    mostCommonExecutionYearByHanging
  );

  return {
    mostExecutionsInSingleYearByLethalInjection,
    mostExecutionsInSingleYearByElectrocution,
    mostExecutionsInSingleYearByGas,
    mostExecutionsInSingleYearByFiringSquad,
    mostExecutionsInSingleYearByHanging,
    mostCommonExecutionYearByLethalInjection,
    mostCommonExecutionYearByElectrocution,
    mostCommonExecutionYearByGas,
    mostCommonExecutionYearByFiringSquad,
    mostCommonExecutionYearByHanging
  };
};

const generateMostExecutionsOnSingleYearByIndividualState = executions => {
  const executionDates = executions.map(execution => {
    return {
      year: execution.execution_date.getFullYear(),
      state: execution.state
    };
  });

  const grouped = groupByMultiple(["year"], executionDates);

  let mostExecutionsOnSingleYearBySingleState = {
    year: 0,
    state: "",
    occurences: 0
  };

  Object.keys(grouped).map(groupKey => {
    let values = Object.values(grouped[groupKey]);
    var r = {};
    values.forEach(o => {
      r[o.state] = (r[o.state] || 0) + 1;
    });

    const stateWithHighestOccurence = Object.keys(r).reduce((a, b) =>
      r[a] > r[b] ? a : b
    );

    let occurenceCount = r[stateWithHighestOccurence];

    if (mostExecutionsOnSingleYearBySingleState.occurences < occurenceCount) {
      mostExecutionsOnSingleYearBySingleState["year"] = values[0].year;
      mostExecutionsOnSingleYearBySingleState[
        "state"
      ] = stateWithHighestOccurence;
      mostExecutionsOnSingleYearBySingleState["occurences"] = occurenceCount;
    }
  });

  return {
    mostExecutionsOnSingleYearBySingleState: mostExecutionsOnSingleYearBySingleState
  };
};

const generateLargestGapBetweenExecutions = executions => {
  const executionDates = executions.map(execution => {
    return execution.execution_date;
  });

  executionDates.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const differenceDates = executionDates.map((date, index) => {
    let date1 = executionDates[index];
    let date2 = executionDates[index + 1]
      ? executionDates[index + 1]
      : executionDates[index];

    return {
      from_date: moment(date1).format("DD/MM/YYYY"),
      to_date: moment(date2).format("DD/MM/YYYY"),
      difference: calculateDateDifference(date1, date2)
    };
  });

  const maxDifferenceValue = Math.max.apply(
    Math,
    differenceDates.map(o => {
      return o.difference;
    })
  );

  const index = differenceDates.findIndex(
    x => x.difference === maxDifferenceValue
  );

  const largestGapBetweenExecutions = differenceDates[index];

  return {
    largestGapBetweenExecutions: largestGapBetweenExecutions
  };
};

const generateMostExecutionsOnSingleMonthByIndividualState = executions => {
  const executionDates = executions.map(execution => {
    return {
      year: execution.execution_date.getFullYear(),
      month: execution.execution_date.toLocaleString("default", {
        month: "long"
      }),
      state: execution.state
    };
  });

  const grouped = groupByMultiple(["month", "year"], executionDates);

  let mostExecutionsOnSingleMonthBySingleState = {
    year: 0,
    month: "",
    state: "",
    occurences: 0
  };

  Object.keys(grouped).map(outerGroupKey => {
    let values = Object.values(grouped[outerGroupKey]);
    values.map(outerValue => {
      var r = {};
      outerValue.forEach(o => {
        r[o.state] = (r[o.state] || 0) + 1;
      });

      const stateWithHighestOccurence = Object.keys(r).reduce((a, b) =>
        r[a] > r[b] ? a : b
      );

      let occurenceCount = r[stateWithHighestOccurence];

      if (
        mostExecutionsOnSingleMonthBySingleState.occurences < occurenceCount
      ) {
        mostExecutionsOnSingleMonthBySingleState["year"] = outerValue[0].year;
        mostExecutionsOnSingleMonthBySingleState["month"] = outerValue[0].month;
        mostExecutionsOnSingleMonthBySingleState[
          "state"
        ] = stateWithHighestOccurence;
        mostExecutionsOnSingleMonthBySingleState["occurences"] = occurenceCount;
      }
    });
  });

  return {
    mostExecutionsOnSingleMonthBySingleState: mostExecutionsOnSingleMonthBySingleState
  };
};

const generateMostExecutionsOnSingleDayByAllStates = executions => {
  const executionDates = executions.map(execution => {
    return execution.execution_date;
  });

  const dateTotals = executionDates.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const rawDate = Object.keys(dateTotals).reduce((a, b) =>
    dateTotals[a] > dateTotals[b] ? a : b
  );

  const total = dateTotals[rawDate];

  const extractStates = executions.filter(execution => {
    return execution.execution_date == rawDate;
  });

  const states = extractStates.map(execution => {
    return execution.state;
  });

  const date = moment(rawDate).format("DD/MM/YYYY");

  return {
    total,
    date,
    states
  };
};

const generateMostExecutionsOnSingleMonthByAllStates = executions => {
  const executionDates = executions.map(execution => {
    return {
      year: execution.execution_date.getFullYear(),
      month: execution.execution_date.toLocaleString("default", {
        month: "long"
      }),
      state: execution.state
    };
  });

  const grouped = groupByMultiple(["year", "month"], executionDates);

  let mostExecutionsOnSingleMonthByAllStates = {
    year: 0,
    month: "",
    states: [],
    total: 0
  };
  let states = [];

  Object.keys(grouped).map(outerGroupKey => {
    let values = Object.values(grouped[outerGroupKey]);
    values.map(outerValue => {
      if (mostExecutionsOnSingleMonthByAllStates.total < outerValue.length) {
        mostExecutionsOnSingleMonthByAllStates["states"] = [];
        states = [];
        mostExecutionsOnSingleMonthByAllStates["year"] = outerValue[0].year;
        mostExecutionsOnSingleMonthByAllStates["month"] = outerValue[0].month;
        outerValue.map(innerValue => {
          if (states.some(value => value.state === innerValue.state)) {
            let index = states.findIndex(x => x.state === innerValue.state);
            states[index].occurences = states[index].occurences + 1;
          } else {
            states.push({ state: innerValue.state, occurences: 1 });
          }
        });
        mostExecutionsOnSingleMonthByAllStates["states"] = states;
        mostExecutionsOnSingleMonthByAllStates["total"] = outerValue.length;
      }
    });
  });

  return mostExecutionsOnSingleMonthByAllStates;
};

const generateMostExecutionsGroupedByDayByAllStates = executions => {
  const executionDates = executions.map(execution => {
    return {
      year: execution.execution_date.getFullYear(),
      month: execution.execution_date.toLocaleString("default", {
        month: "long"
      }),
      day: execution.execution_date.getDay(),
      state: execution.state
    };
  });

  const grouped = groupByMultiple(["year", "month", "day"], executionDates);

  let mostExecutionsGroupedByDayByAllStates = {
    year: 0,
    month: "",
    day: 0,
    stateOccurences: []
  };

  Object.keys(grouped).forEach(firstGroupKey => {
    let firstValues = Object.values(grouped[firstGroupKey]);
    Object.keys(firstValues).forEach(secondGroupKey => {
      let secondValues = Object.values(firstValues[secondGroupKey]);

      Object.keys(secondValues).forEach(thirdGroupKey => {
        let thirdValues = Object.values(secondValues[thirdGroupKey]);

        if (
          thirdValues.length >
          mostExecutionsGroupedByDayByAllStates.stateOccurences.length
        ) {
          mostExecutionsGroupedByDayByAllStates.stateOccurences = [];

          thirdValues.forEach(value => {
            mostExecutionsGroupedByDayByAllStates.year = value.year;
            mostExecutionsGroupedByDayByAllStates.month = value.month;
            mostExecutionsGroupedByDayByAllStates.day = value.day;
            if (
              !mostExecutionsGroupedByDayByAllStates.stateOccurences.filter(
                state => state.state === value.state
              ).length > 0
            ) {
              mostExecutionsGroupedByDayByAllStates.stateOccurences.push({
                state: value.state,
                occurences: 1
              });
            } else {
              let index = mostExecutionsGroupedByDayByAllStates.stateOccurences.findIndex(
                x => x.state === value.state
              );
              mostExecutionsGroupedByDayByAllStates.stateOccurences[
                index
              ].occurences =
                mostExecutionsGroupedByDayByAllStates.stateOccurences[index]
                  .occurences + 1;
            }
          });
        }
      });
    });
  });

  return {
    mostExecutionsGroupedByDayByAllStates: mostExecutionsGroupedByDayByAllStates
  };
};

const findFirstFemaleExecuted = females => {
  const firstFemaleExecuted = females.reduce((l, e) =>
    e.execution_date > l.execution_date ? l : e
  );

  return {
    firstFemaleExecuted
  };
};

const findLatestFemaleExecuted = females => {
  const latestFemaleExecuted = females.reduce((l, e) =>
    e.execution_date > l.execution_date ? e : l
  );

  return {
    latestFemaleExecuted
  };
};

const findFirstMaleExecuted = males => {
  const firstMaleExecuted = males.reduce((l, e) =>
    e.execution_date > l.execution_date ? l : e
  );

  return {
    firstMaleExecuted
  };
};

const findLatestMaleExecuted = males => {
  const latestMaleExecuted = males.reduce((l, e) =>
    e.execution_date > l.execution_date ? e : l
  );

  return {
    latestMaleExecuted
  };
};

const generatePeopleWithHighestNumberOfVictims = executions => {
  const highestNumberOfVictimsCount = Math.max.apply(
    Math,
    executions.map(execution => {
      return execution.number_of_victims;
    })
  );

  const peopleWithHighestNumberOfVictims = executions.filter(execution => {
    return execution.number_of_victims == highestNumberOfVictimsCount;
  });

  return peopleWithHighestNumberOfVictims;
};
