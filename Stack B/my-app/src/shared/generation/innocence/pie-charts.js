export function generateDNABreakdownPieChartData(innocents) {
  const dna_evidence = innocents.map(innocence => {
    return innocence.dna;
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const dnaTotals = dna_evidence.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(dnaTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    dnaBreakdownPieChartData: pieChartData
  };
}

export function generateRaceBreakdownInnocencePieChartData(innocents) {

  const races = innocents.map(innocence => {
    return innocence.race.toLowerCase();
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const raceTotals = races.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(raceTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    raceBreakdownInnocencePieChartData: pieChartData
  };
}

export function generateExonerationBreakdownPieChartData(innocents) {
  const exonerations = innocents.map(innocence => {
    return innocence.exoneration_procedure.toLowerCase();
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const exonerationTotals = exonerations.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(exonerationTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    exonerationBreakdownPieChartData: pieChartData
  };
}
