export function generateRaceBreakdownDeathRowPieChartData(inmates) {
  const races = inmates.map(inmate => {
    return inmate.races;
  });

  var sum = {};

  var selRaces = [
    "white",
    "black",
    "asian",
    "latino/a",
    "native american",
    "unknown"
  ];

  races.forEach(item => {
    selRaces.forEach(race => {
      sum[race] = (sum[race] || 0) + item[race];
    });
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const values = Object.entries(sum).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    raceBreakdownDeathRowPieChartData: pieChartData
  };
}
