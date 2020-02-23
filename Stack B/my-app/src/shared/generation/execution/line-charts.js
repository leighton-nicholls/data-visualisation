import { groupByMultiple } from "../../shared-functions";

export function generateExecutionsOverTimeLineChart(executions) {
  return function generateChart(state) {
    const executionYears = executions.map(execution => {
      return execution.execution_date.getFullYear();
    });

    const years = [...new Set(executionYears.map(year => year))];

    const lineChartData = {
      label: "Executions",
      values: []
    };

    const values = years.map(year => ({ x: year, y: 0 }));

    values.forEach(value => {
      executionYears.forEach(year => {
        value.x === year && value.y++;
      });
    });

    lineChartData.values = values;

    return {
      executionsOverTimeLineChartData: lineChartData
    };
  };
}

export function generateExecutionsByMethodLineChart(executions) {
  return function generateChart(state) {
    const lethalInjectionExecutions = executions.filter(execution => {
      return execution.execution_method === "Lethal Injection";
    });
    const electrocutionExecutions = executions.filter(execution => {
      return execution.execution_method === "Electrocution";
    });
    const gasExecutions = executions.filter(execution => {
      return execution.execution_method === "Gas";
    });
    const firingSquadExecutions = executions.filter(execution => {
      return execution.execution_method === "Firing Squad";
    });
    const hangingExecutions = executions.filter(execution => {
      return execution.execution_method === "Hanging";
    });

    const lethalInjectionExecutionYears = lethalInjectionExecutions.map(
      execution => {
        return execution.execution_date.getFullYear();
      }
    );
    const electrocutionExecutionsYears = electrocutionExecutions.map(
      execution => {
        return execution.execution_date.getFullYear();
      }
    );
    const gasExecutionYears = gasExecutions.map(execution => {
      return execution.execution_date.getFullYear();
    });
    const firingSquadExecutionYears = firingSquadExecutions.map(execution => {
      return execution.execution_date.getFullYear();
    });
    const hangingExecutionYears = hangingExecutions.map(execution => {
      return execution.execution_date.getFullYear();
    });

    const lineChartData = [
      /*       {
        label: "Lethal Injection",
        values: []
      },
      {
        label: "Electrocution",
        values: []
      },
      {
        label: "Gas",
        values: []
      },
      {
        label: "Firing Squad",
        values: []
      },
      {
        label: "Hanging",
        values: []
      } */
    ];

    const distinctLethalInjectionYears = [
      ...new Set(lethalInjectionExecutionYears.map(year => year))
    ];
    const distinctElectrocutionYears = [
      ...new Set(electrocutionExecutionsYears.map(year => year))
    ];
    const distinctGasYears = [...new Set(gasExecutionYears.map(year => year))];
    const distinctFiringSquadYears = [
      ...new Set(firingSquadExecutionYears.map(year => year))
    ];
    const distinctHangingYears = [
      ...new Set(hangingExecutionYears.map(year => year))
    ];

    const lethalInjectionValues = distinctLethalInjectionYears.map(year => ({
      x: year,
      y: 0
    }));
    const electrocutionValues = distinctElectrocutionYears.map(year => ({
      x: year,
      y: 0
    }));
    const gasValues = distinctGasYears.map(year => ({ x: year, y: 0 }));
    const firingSquadValues = distinctFiringSquadYears.map(year => ({
      x: year,
      y: 0
    }));
    const hangingValues = distinctHangingYears.map(year => ({ x: year, y: 0 }));

    lethalInjectionValues.forEach(value => {
      lethalInjectionExecutionYears.forEach(year => {
        value.x === year && value.y++;
      });
    });

    electrocutionValues.forEach(value => {
      electrocutionExecutionsYears.forEach(year => {
        value.x === year && value.y++;
      });
    });

    gasValues.forEach(value => {
      gasExecutionYears.forEach(year => {
        value.x === year && value.y++;
      });
    });

    firingSquadValues.forEach(value => {
      firingSquadExecutionYears.forEach(year => {
        value.x === year && value.y++;
      });
    });

    hangingValues.forEach(value => {
      hangingExecutionYears.forEach(year => {
        value.x === year && value.y++;
      });
    });

    lethalInjectionValues.length > 0 &&
      lineChartData.push({
        label: "Lethal Injection",
        values: [...lethalInjectionValues]
      });
    electrocutionValues.length > 0 &&
      lineChartData.push({
        label: "Electrocution",
        values: [...electrocutionValues]
      });
    gasValues.length > 0 &&
      lineChartData.push({ label: "Gas", values: [...gasValues] });
    firingSquadValues.length > 0 &&
      lineChartData.push({
        label: "Firing Squad",
        values: [...firingSquadValues]
      });
    hangingValues.length > 0 &&
      lineChartData.push({ label: "Hanging", values: [...hangingValues] });

    return {
      executionsByMethodLineChartData: lineChartData
    };
  };
}

export function generateExecutionsOverTimeByStateLineChartData(executions) {
  return function generateChart(state) {
    const executionsByYear = executions.map(execution =>
      Object.assign({}, execution, {
        execution_date: execution.execution_date.getFullYear()
      })
    );

    const grouped = groupByMultiple(
      ["state", "execution_date"],
      executionsByYear
    );

    const states = [...new Set(executions.map(execution => execution.state))];

    const lineChartData = [];

    states.forEach(state => {
      lineChartData.push({ label: state, values: [] });
    });

    const years = [
      ...new Set(
        executions.map(execution => execution.execution_date.getFullYear())
      )
    ];

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      Object.keys(grouped).forEach(key => {
        if (key === data.label) {
          let groupValues = Object.values(grouped[key]);
          groupValues.forEach((groupValue, index) => {
            let year = Number(Object.keys(grouped[key])[index]);
            data.values.forEach(dataValue => {
              if (dataValue.x === year) {
                dataValue.y = groupValue.length;
              }
            });
          });
        }
      });
    });

    return {
      executionsOverTimeByStateLineChartData: lineChartData
    };
  };
}

export function generateRegionBreakdownLineChartData(executions) {
  return function generateChart(state) {
    const years = [
      ...new Set(
        executions.map(execution => execution.execution_date.getFullYear())
      )
    ];

    const distinctRegions = [
      ...new Set(executions.map(execution => execution.region))
    ];

    const lineChartData = [];

    distinctRegions.forEach(region => {
      lineChartData.push({ label: region, values: [] });
    });

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      executions.forEach(execution => {
        if (data.label === execution.region) {
          data.values.forEach(value => {
            if (value.x === execution.execution_date.getFullYear()) {
              value.y = value.y + 1;
            }
          });
        }
      });
    });

    return {
      regionBreakdownLineChartData: lineChartData
    };
  };
}

export function generateVolunteerLineChartData(executions) {
  return function generateChart(state) {
    const years = [
      ...new Set(
        executions.map(execution => execution.execution_date.getFullYear())
      )
    ];

    const lineChartData = [
      { label: "Volunteer", values: [] },
      { label: "Not a Volunteer", values: [] }
    ];

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      executions.forEach(execution => {
        if (data.label === execution.execution_volunteer) {
          data.values.forEach(value => {
            if (value.x === execution.execution_date.getFullYear()) {
              value.y = value.y + 1;
            }
          });
        }
      });
    });

    return {
      volunteerLineChartData: lineChartData
    };
  };
}

export function generateRacialLineChartData(executions) {
  return function generateChart(state) {
    const years = [
      ...new Set(
        executions.map(execution => execution.execution_date.getFullYear())
      )
    ];

    const lineChartData = [
      { label: "White", values: [] },
      { label: "Black", values: [] },

      { label: "Latino", values: [] },
      { label: "Native American", values: [] },

      { label: "Asian", values: [] },
      { label: "Unknown", values: [] }
    ];

    lineChartData.forEach(data => {
      years.forEach(year => {
        data.values.push({ x: year, y: 0 });
      });
    });

    lineChartData.forEach(data => {
      executions.forEach(execution => {
        if (data.label === execution.race) {
          data.values.forEach(value => {
            if (value.x === execution.execution_date.getFullYear()) {
              value.y = value.y + 1;
            }
          });
        }
      });
    });

    return {
      racialLineChartData: lineChartData
    };
  };
}

// this will generate the chart for displaying the number of states that conducted executions by year
export function generateNumberOfStatesWithExecutionsByYearLineChartData(
  executions
) {
  return function generateChart(state) {
    const years = executions.map(execution => {
      return {
        state: execution.state,
        year: execution.execution_date.getFullYear()
      };
    });

    const newYears = groupByMultiple(["year", "state"], years);

    const vals = Object.keys(newYears).map(key => {
      let values = Object.values(newYears[key]);
      return { year: Number(key), number: values.length };
    });

    const lineChartData = [];

    vals.forEach(year => {
      lineChartData.push({ label: "State", values: [] });
    });

    lineChartData.forEach(data => {
      vals.forEach(year => {
        data.values.push({ x: year.year, y: year.number });
      });
    });

    return {
      numberOfStatesWithExecutionsByYearLineChartData: lineChartData
    };
  };
}
