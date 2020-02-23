export function generateCountyTotals(executions) {
  const counties = executions.map(execution => {
    return execution.county;
  });

  // The comma operator “evaluates each of its operands (from left to right) and returns the value of the last operand”, so this increments the value of prev[curr] (or initialises it to 1), then returns prev.
  const countyTotals = counties.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  var sortedCounties = {};
  Object.keys(countyTotals)
    .sort((a, b) => countyTotals[b] - countyTotals[a])
    .forEach(key => {
      sortedCounties[key] = countyTotals[key];
    });

  const length = Object.values(sortedCounties).length;
  const maxValue = Object.keys(sortedCounties)[0];
  const stateName = Object.values(sortedCounties)[0];

  const countiesSummary = {
    maxCounty: maxValue,
    stateName: stateName,
    numberOfCounties: length,
    countyTotals: sortedCounties
  };
  return {
    countiesSummary: countiesSummary
  };
}

export function generateTotalExecutionsByMethod(executions) {
  return function(state) {
    const lethalInjectionTotal = executions.filter(
      execution => execution.execution_method === "Lethal Injection"
    ).length;

    const electrocutionTotal = executions.filter(
      execution => execution.execution_method === "Electrocution"
    ).length;
    const gasTotal = executions.filter(
      execution => execution.execution_method === "Gas"
    ).length;
    const firingSquadTotal = executions.filter(
      execution => execution.execution_method === "Firing Squad"
    ).length;
    const hangingTotal = executions.filter(
      execution => execution.execution_method === "Hanging"
    ).length;

    const totalExecutions = {
      totalNumberofExecutionsByLethalInjection: lethalInjectionTotal,
      totalNumberofExecutionsByElectrocution: electrocutionTotal,
      totalNumberofExecutionsByGas: gasTotal,
      totalNumberofExecutionsByFiringSquad: firingSquadTotal,
      totalNumberofExecutionsByHanging: hangingTotal
    };

    return {
      totalExecutions: totalExecutions
    };
  };
}
